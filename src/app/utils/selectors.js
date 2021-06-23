const days = (el = document) => [...el.querySelectorAll('div[role="gridcell"')]

/**
 * Divide by two since there `days` selector returns 2n the number of
 * days
 */
export const getDays = (el = document) => days(el).length / 2
export const selectDays = (el = document) => {
  const d = days(el)
  return d.slice(d.length / 2)
}

export const selectMeetings = (el = document) =>
  selectAllMeetings(el).filter((i) => {
    const [time, , cal] = i.innerText.split(", ")
    return !cal.startsWith("Calendar: ")
  })

export const selectAllMeetings = (el = document) =>
  [...el.querySelectorAll('div[data-opens-details="true"]')].filter((i) =>
    /^([0-9]{1,2}:[0-9]{2}|[0-9]{1,2})([ap]m|) to /.test(i.innerText)
  )

export const selectHeaders = (el = document) => [
  ...el.querySelectorAll('div[role="columnheader"'),
]
