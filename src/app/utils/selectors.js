const days = (el = document) => [...el.querySelectorAll('div[role="gridcell"')]

export const getDays = (el = document) => days(el).length / 2
export const selectDays = (el = document) => {
  const d = days(el)
  return d.slice(d.length / 2)
}

export const selectMeetings = (el = document) =>
  selectAllMeetings(el).filter((i) => {
    const [, , cal] = i.innerText.split(", ")
    return !cal.startsWith("Calendar: ")
  })

export const selectAllMeetings = (el = document) =>
  [...el.querySelectorAll('div[data-opens-details="true"]')].filter((i) =>
    /([0-9]{1,2}:[0-9]{2}|[0-9]{1,2})([ap]m|) to /.test(i.innerText)
  )
