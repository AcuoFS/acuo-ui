import _ from 'lodash'

export const filterByAllPropertiesOfObj = (objList, filterText) => {
  return _.filter(objList,
    o => {
      console.log(o);
      let isAnyPropertyMatches = false

      // Check for all properties
      _.forOwn(o, (value) => {
        isAnyPropertyMatches = _.toUpper(String(value)).match(
          new RegExp(_.toUpper(filterText.trim()))
        )

        // Stop iteration if matches; return false to stop
        return !isAnyPropertyMatches
      })

      // Include into filteredList when any property matches
      return isAnyPropertyMatches
    })
}
