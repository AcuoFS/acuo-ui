// it will return a new date obj with time = 0:0:0.0
export default (date) => {
  const dateWithoutTime = new Date(date.getTime())
  dateWithoutTime.setHours(0)
  dateWithoutTime.setMinutes(0)
  dateWithoutTime.setSeconds(0)
  dateWithoutTime.setMilliseconds(0)

  return dateWithoutTime
}
