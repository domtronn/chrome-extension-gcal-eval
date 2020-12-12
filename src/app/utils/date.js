export const closestFiveMins = (hrs, mins) => {
  const cfm = Math.ceil(mins / 5) * 5
  return cfm === 60 ? [hrs + 1, 0] : [hrs, cfm]
}

export const calcHours = (ms = 0) => Math.floor(ms / 1000 / 60 / 60)
export const calcMins = (ms) =>
  Math.round((ms / 1000 / 60 / 60 - calcHours(ms)) * 60)

export const twelveHourToDate = (s, day = 0) => {
  const [time, ampm] = /[ap]m$/.test(s) ? [s.slice(0, -2), s.slice(-2)] : [s]
  const [hr, min = 0] = time.split(":")
  const date = new Date(day)

  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(+min)

  !ampm
    ? date.setHours(+hr)
    : +hr === 12
    ? date.setHours(ampm === "am" ? +hr + 12 : +hr)
    : date.setHours(ampm === "am" ? +hr : +hr + 12)

  return date
}
