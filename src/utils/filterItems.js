import _ from 'lodash'
import clearTime from './clearTime'

/*
 * this function will filter items based on 2nd arg - filterArray
 *
 * items: array of item, which should be a plain JS object (i.e. a map)
 * filterArray: array of filter, which should be a plain JS object with min schema below
               // the attribute which the filter should apply
               {attr:  'legalEntity',
               // values to filter, it is an object with following attributes
                selected: {label, value, type}
 */
export default (items, filterArray) => {
  // remove those with empty selected value: "" or []
  // console.log(items)
  const filters = _.filter(filterArray, filter => {
    const selectedValue = _.get(filter, 'selected.value', '')

    return _.isArray(selectedValue)
           // array
           ? !_.isEmpty(selectedValue)
           // primitive
           : (selectedValue !== '')
  })

  // apply filters
  return _.reduce(filters, (items, filter) => {
    const attr = _.get(filter, 'attr')
    const type = _.get(filter, 'type', 'single') // [time/multi/single]

    const selectedValue = _.get(filter, 'selected.value')
    const selectedType  = _.get(filter, 'selected.type', 'exact') // [sameDay]

    // 'time' filter
    if(type === 'time') {
      // 'time' filter selected value should be unixtimestamp
      const selectedDatetime = new Date(selectedValue)

      if(selectedType === 'sameDay'){
        // with selected type of 'sameDay': sameDay inRange match
        const oneDayDuration = 24 * 60 * 60 * 1000
        const d = clearTime(selectedDatetime)
        const dPlusOne = new Date(d.getTime() + oneDayDuration)

        return _.filter(items, item => {
          const itemDay = new Date(item.notificationTime)
          return _.inRange(itemDay.getTime(), d.getTime(), dPlusOne.getTime())
        })

      } else {
      // otherwise: exact datetime match
        return _.filter(items, item => {
          const itemDatetime = new Date(item.notificationTime)
          return (itemDatetime.getTime() === selectedDatetime.getTime())
        })
      }
    }

    // other cases: either exact-match or includes-match
    return _.isArray(selectedValue)
           // is array
           ? _.filter(items, item => selectedValue.includes(_.get(item, attr)))
           // primitive
           : _.filter(items, [attr, selectedValue])
  }, items)
}
