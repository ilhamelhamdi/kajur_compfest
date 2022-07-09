const parseDate = (isoDate) => {
  const date = new Date(isoDate)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  let hour = date.getHours()
  let minute = date.getMinutes()
  const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  if (minute < 10) minute = '0' + minute
  if (hour < 10) hour = '0' + hour
  return { day, year, hour, minute, month: monthList[month] }
}

const EtcUtils = { parseDate }

export default EtcUtils