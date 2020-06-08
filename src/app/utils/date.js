export const twelveHourToDate = (s) => {
  const [time, ampm] = /[ap]m$/.test(s) ? [s.slice(0, -2), s.slice(-2)] : [s]
  const [hr, min = 0] = time.split(":")
  const date = new Date()

  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(+min)

  console.log("hr", +hr)

  !ampm
    ? date.setHours(+hr)
    : +hr === 12
    ? date.setHours(ampm === "am" ? +hr + 12 : +hr)
    : date.setHours(ampm === "am" ? +hr : +hr + 12)

  return date
}
