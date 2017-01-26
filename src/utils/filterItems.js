import _ from 'lodash'

/*
 * this function will filter items based on 2nd arg - filterArray
 *
 * items: array of item, which should be a plain JS object (i.e. a map)
 * filterArray: array of filter, which should be a plain JS object with min schema below
               // the attribute which the filter should apply
               {attr:  'legalEntity',
               // values to filter, it could be a string (=) or an array (some)
                selected: 'ACUO SG' or ['ACUO SG', 'ACUO UK']}
 */
export default (items, filterArray) => {
  const filters = _.filter(filterArray, ({selected}) => (
    _.isString(selected)
    ? selected.length
    : !_.isEmpty(selected)
  ))

  return _.reduce(filters, (items, {attr, selected}) => (
    _.isString(selected)
    ? _.filter(items, [attr, selected])
    : _.filter(items, item => selected.includes(_.get(item, attr)))
  ), items)
}
