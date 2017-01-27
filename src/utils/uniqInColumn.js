import _ from 'lodash'

export default (items, column) => _.uniq(_.map(items, column))
