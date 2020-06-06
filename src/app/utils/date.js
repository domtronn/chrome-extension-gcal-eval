export const twelveHourToDate = (s) => {
  var [time, ampm] = [s.slice(0, -2), s.slice(-2)]
  var [hr, min = 0] = time.split(":")
  var date = new Date()

  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(+min)
  ;+hr === 12
    ? date.setHours(ampm === "am" ? +hr + 12 : +hr)
    : date.setHours(ampm === "am" ? +hr : +hr + 12)

  return date
}
