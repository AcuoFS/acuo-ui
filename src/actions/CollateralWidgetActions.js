import { SELECTION_WIDGET__COLUMN_SORT } from '../constants/ActionTypes.js'

const CollWidgetActions = {
  sortColumnBy: ( sortBy )=>({ type: SELECTION_WIDGET__COLUMN_SORT,
                               payload: sortBy })
}

export default CollWidgetActions
