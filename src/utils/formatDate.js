// DD-MM-YY
export const formatDate = (dateStr) => {
  if(dateStr === '-'){
    return dateStr
  }
  let myDate = new Date(dateStr)
  let dd = myDate.getDate()
  let mm = myDate.getMonth() + 1
  let yyyy = myDate.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return (dd + '-' + mm + '-' + yyyy.toString().substring(2, 5))
}
