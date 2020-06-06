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
    .filter(([,val]) => val > 0)
    .map(([key, val]) => [
      config[key] || key,
      key,
      Math.floor((val / totalTime) * 100),
    ])

  const remaining = 100 - result.reduce((acc, [, , value]) => acc + value, 0)

  return [["free", "#ffffff", remaining], ...result]
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
  const totalTime =
    (twelveHourToDate(dayEnd) - twelveHourToDate(dayStart)) * getDays()
  const res = getMeetings(document, { dayStart, dayEnd })

  return summary(totalTime, res, config)
}
