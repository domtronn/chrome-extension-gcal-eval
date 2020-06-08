import { twelveHourToDate } from "../utils/date"
import { getDays } from "../utils/selectors"
import { getMeetings, getMeetingsForDays } from "./analysis"

var summary = (totalTime, res, config = {}) => {
  const sum = res.reduce(
    (acc, it) => ({
      ...acc,
      [it.id]: (acc[it.id] || 0) + Math.max(0, it.time.end - it.time.start),
    }),
    {}
  )

  const result = Object.entries(sum)
    .filter(([key]) => key !== "null")
    .filter(([key, val]) => {
      console.log(key, val)
      return val > 0
    })
    .map(([key, val]) => [
      config[key] || key,
      key,
      Math.ceil((val / totalTime) * 100),
      { h: new Date(val).getHours() - 1, m: new Date(val).getMinutes() },
    ])

  const remaining = 100 - result.reduce((acc, [, , value]) => acc + value, 0)

  return [
    [
      config["#fff"] || config["#ffffff"] || "Free time",
      "#ffffff",
      remaining,
      {
        h: new Date((remaining / 100) * totalTime).getHours() - 1,
        m: new Date((remaining / 100) * totalTime).getMinutes(),
      },
    ],
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
    day: "Weekly",
    total: `${totalEvents} events`,
    summary: summary(totalTime, res, config),
  }
}
