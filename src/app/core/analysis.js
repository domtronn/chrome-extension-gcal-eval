import { rgbToHex } from "../utils/col"
import { twelveHourToDate } from "../utils/date"

import { selectDays, selectMeetings } from "../utils/selectors"

export const getMeetingsForDays = ({ dayStart, dayEnd }) =>
  selectDays().map((column) => {
    const [total, day, date] = column.innerText.split(", ")
    const events = getMeetings(column, { dayStart, dayEnd })
    return {
      total: parseInt(total),
      accepted: events.length,
      day,
      date,
      events,
    }
  })

const isDate = (d) => {
  const date = new Date(d)
  return date instanceof Date && !isNaN(date)
}

export const getMeetings = (el = document, { dayStart, dayEnd }) =>
  selectMeetings(el)
    .map((node) => {
      var [time, name, calendar, status, _, ...days] = node.innerText
        .replace(/\n/g, ", ")
        .split(", ")

      var day = new Date(days.find(isDate))
      var [start, end] = time.split(" to ")

      return {
        id: rgbToHex(node.style["background-color"].substring()),
        calendar,
        name,
        status,
        time: {
          start: Math.max(
            twelveHourToDate(dayStart, day),
            twelveHourToDate(start, day)
          ),
          end: Math.min(
            twelveHourToDate(dayEnd, day),
            twelveHourToDate(end, day)
          ),
        },
      }
    })
    .filter(({ status }) => status !== "Declined")
