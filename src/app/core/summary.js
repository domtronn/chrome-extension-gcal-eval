import { twelveHourToDate } from "../utils/date"
import { getDays } from "../utils/selectors"
import { getMeetings, getMeetingsForDays } from "./analysis"

const summary = (totalTime, res, config = {}) => {
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

  const result = Object.entries(sum).map(([key, val]) => ({
    name: config[key] || key,
    color: key,
    usage: Math.ceil((val / totalTime) * 100),
    time: { h: new Date(val).getHours() - 1, m: new Date(val).getMinutes() },
  }))

  const toMinutes = (i) => i / 100000
  const fromMinutes = (i) => i * 100000
  const minutesUsed = filteredRes.reduce((acc, { time }) => {
    const timeDiff = Math.max(toMinutes(time.end - time.start), 0)
    const minsArr = Array(timeDiff)
      .fill()
      .map((_, i) => toMinutes(time.start) + i)

    return new Set([...acc, ...minsArr])
  }, []).size

  const remaining = (1 - fromMinutes(minutesUsed) / totalTime) * 100
  const roundedTime = fromMinutes(
    5 * Math.ceil(toMinutes((remaining / 100) * totalTime) / 5)
  )

  return [
    {
      name: config["#fff"] || config["#ffffff"] || "Free time",
      color: "#ffffff",
      usage: remaining,
      time: {
        h: new Date((remaining / 100) * totalTime).getHours() - 1,
        m: new Date((remaining / 100) * totalTime).getMinutes(),
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
  const totalEvents = getMeetingsForDays({ dayStart, dayEnd }).reduce(
    (acc, { total }) => acc + (parseInt(total) || 0),
    0
  )

  const totalTime =
    (twelveHourToDate(dayEnd) - twelveHourToDate(dayStart)) * getDays()

  const res = getMeetings(document, { dayStart, dayEnd })

  return {
    day: "All days",
    total: `${totalEvents} events`,
    summary: summary(totalTime, res, config),
  }
}
