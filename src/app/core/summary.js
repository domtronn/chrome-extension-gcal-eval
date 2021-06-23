import {
  twelveHourToDate,
  calcHours,
  calcMins,
  closestFiveMins,
} from "../utils/date"
import { getDays } from "../utils/selectors"
import { getMeetings, getMeetingsForDays } from "./analysis"

const summary = (totalTime, res, config = {}) => {
  console.log(res)
  const filteredRes = res.filter(
    ({ id, time }) => id !== null && time.end - time.start > 0
  )

  const sum = filteredRes.reduce(
    (acc, it) => ({
      ...acc,
      [it.id]: (acc[it.id] || 0) + Math.max(0, it.time.end - it.time.start),
    }),
    {}
  )

  const result = Object.entries(sum).map(([key, val]) => {
    const h = calcHours(val)
    const m = calcMins(val)
    const [cH, cM] = closestFiveMins(h, m)

    return {
      name: config[key] || key,
      color: key,
      usage: Math.ceil((val / totalTime) * 100),
      time: { h, cH, m, cM },
    }
  })

  const toSeconds = (i) => i / 1000
  const fromSeconds = (i) => i * 1000

  const secondsUsed = filteredRes.reduce((acc, { time }) => {
    const timeDiff = Math.max(toSeconds(time.end - time.start), 0)
    const minsArr = Array(timeDiff)
      .fill()
      .map((_, i) => toSeconds(time.start) + i)

    return new Set([...acc, ...minsArr])
  }, []).size

  const remaining = (1 - fromSeconds(secondsUsed) / totalTime) * 100

  const h = calcHours(totalTime * (remaining / 100))
  const m = calcMins(totalTime * (remaining / 100))
  const [cH, cM] = closestFiveMins(h, m)

  return [
    {
      name: config["#fff"] || config["#ffffff"] || "Free time",
      color: "#ffffff",
      usage: remaining,
      time: {
        h,
        m,
        cH,
        cM,
      },
    },
    ...result,
  ]
}

/**
 * I/O summaries
 */
export const daily = (dayStart, dayEnd, config) => {
  const totalTime = twelveHourToDate(dayEnd) - twelveHourToDate(dayStart)

  return getMeetingsForDays({ dayStart, dayEnd }).map(
    ({ events, ...rest }) => ({
      ...rest,
      summary: summary(totalTime, events, config),
    })
  )
}

export const weekly = (dayStart, dayEnd, config) => {
  const [totalEvents, acceptedEvents] = getMeetingsForDays({
    dayStart,
    dayEnd,
  }).reduce(
    ([t, a], { total, accepted }) => [
      t + (parseInt(total) || 0),
      a + (parseInt(accepted) || 0),
    ],
    [0, 0]
  )

  const totalTime =
    (twelveHourToDate(dayEnd) - twelveHourToDate(dayStart)) * getDays()

  const res = getMeetings(document, { dayStart, dayEnd })

  return {
    day: "All days",
    total: totalEvents,
    accepted: acceptedEvents,
    summary: summary(totalTime, res, config),
  }
}
