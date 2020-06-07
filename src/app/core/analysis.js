import { rgbToHex } from "../utils/col"
import { twelveHourToDate } from "../utils/date"

import { selectDays, selectMeetings } from "../utils/selectors"

export const getMeetingsForDays = ({ dayStart, dayEnd }) =>
  selectDays().map((column) => {
    const [total, day, date] = column.innerText.split(", ")
    return {
      total,
      day,
      date,
      events: getMeetings(column, { dayStart, dayEnd }),
    }
  })

export const getMeetings = (el = document, { dayStart, dayEnd }) =>
  selectMeetings(el)
    .map((node) => {
      var [time, name, calendar, status] = node.innerText.split(", ")
      var [start, end] = time.split(" to ")

      return {
        id: rgbToHex(node.style["background-color"].substring()),
        calendar,
        name,
        status,
        time: {
          start: Math.max(twelveHourToDate(dayStart), twelveHourToDate(start)),
          end: Math.min(twelveHourToDate(dayEnd), twelveHourToDate(end)),
        },
      }
    })
    .filter(({ status }) => status !== "Declined")
