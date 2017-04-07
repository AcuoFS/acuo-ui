import { Map, List, fromJS } from 'immutable'
import _ from 'lodash'

import { clearTime, getDate } from '../utils'
import * as ActionTypes from '../constants/ActionTypes'

const initFilters = [
  {order: 1, attr: "legalEntity", label: "Legal Entity"},
  {order: 2, attr: "type",        label: "Deriv Type"},
  {order: 3, attr: "notificationTime",        label: "Time Window", type: "time"},
  {order: 4, attr: "status",      label: "Status"},
  {order: 5, attr: "cptyOrg",     label: "CPTY Organisation"},
  {order: 6, attr: "cptyEntity",  label: "CPTY Entity", type: "multi"},
]

const initState = Map({"items":   List(),
  "filters": fromJS(initFilters)})

const updateFilters = (filters, newFilter) => (
  _.map(filters, filter => (
    (filter.attr === newFilter.attr)
    ? _.set(filter, 'selected', newFilter.selected)
    : filter
    ))
)

const plusMinusThreeDays = (json) => {

  const today = getDate()
  const oneDayDuration = 24 * 60 * 60 * 1000
  const d = clearTime(today)
  const dPlusOne = new Date(d.getTime() + oneDayDuration)
  const dMinusTwo = new Date(d.getTime() - (oneDayDuration * 2))

  return _.filter(json, item => (
    _.inRange((new Date(item.notificationTime)).getTime(), dMinusTwo.getTime(), dPlusOne.getTime())
  ))

}

const updateFirstLevelList = (list, guid, id) => (
  (_.some(list, {"GUID": guid, "id": id}) ?
    _.filter(list, (x) => !_.isMatch(x, {"GUID": guid, "id": id})) :
    _.concat([], list, {"GUID": guid, "id": id, 'parties': ['cpty', 'client']}))
)

const updateSecondLevelListFromFirstLevel = (firstLevelList, list, listOfItems) => (
  _.reduce(
    _.filter(listOfItems, (x) => _.find(firstLevelList, {"GUID": x.GUID})), (list, item) =>
      _.unionWith(
        _.concat(list, _.reduce(item.clientAssets, (list, group) =>
            _.concat(list, _.reduce(group.data, (list, first) =>
                _.concat(list, _.reduce(first.firstLevel.secondLevel, (list, second) =>
                    (_.find(firstLevelList, {"GUID": item.GUID, "id": second.parentIndex}) ?
                      _.concat(list, {"GUID": item.GUID, "parentIndex": second.parentIndex, "id": second.id}) :
                      [])
                  , []))
              , []))
          , [])),
        _.concat(list, _.reduce(item.counterpartyAssets, (list, group) =>
            _.concat(list, _.reduce(group.data, (list, first) =>
                _.concat(list, _.reduce(first.firstLevel.secondLevel, (list, second) =>
                    (_.find(firstLevelList, {"GUID": item.GUID, "id": second.parentIndex}) ?
                      _.concat(list, {"GUID": item.GUID, "parentIndex": second.parentIndex, "id": second.id}) :
                      [])
                  , []))
              , []))
          , []))
        , _.isEqual)
    , [])
)

const updateSecondLevelList = (list, guid, parentID, id) => (
  (_.some(list, {"GUID": guid, "id": id, "parentIndex": parentID}) ?
    _.filter(list, (x) => !_.isMatch(x, {"GUID": guid, "id": id, "parentIndex": parentID})) :
    _.concat([], list, {"GUID": guid, "id": id, "parentIndex": parentID}))
)

const retrieveSecondLevel = (list, guid, id) => (
  list.reduce((sum, group) => sum = (_.find(group.data, {"firstLevel": {"id": id, "GUID": guid}}) ? _.find(group.data, {"firstLevel": {"id": id, "GUID": guid}}).firstLevel.secondLevel : sum), [])
)

const updateFirstlevelListFromSecondLevel = (secondLevelList, firstLevelList, items) => {
  const test = _.reduce(secondLevelList, (set, item) => (
    _.unionWith(set, [{"GUID": item.GUID, "id": item.parentIndex}], _.isEqual)
  ), [])

  const newFirstLevel = test.map((x) => {
    const statement = _.find(items, {"GUID": x.GUID})
    const clientAssetFirstLevelList = statement.clientAssets || []
    const counterpartyAssetList = statement.counterpartyAssets  || []

    //number of second level items in this first lvl obj in the list
    const presentInList = _.filter(secondLevelList, (y) => _.isMatch(y, {"GUID": x.GUID, "parentIndex": x.id}))

    const clientAll = retrieveSecondLevel(clientAssetFirstLevelList, x.GUID, x.id)

    const cptyAll = retrieveSecondLevel(counterpartyAssetList, x.GUID, x.id)

    let parties = []

    parties = (_.remove(clientAll, (n) => _.some(presentInList, {"id": n.id, "parentIndex": n.parentIndex})).length >= clientAll ? _.concat(parties, 'client') : parties)
    parties = (_.remove(cptyAll, (n) => _.some(presentInList, {"id": n.id, "parentIndex": n.parentIndex})).length >= cptyAll ? _.concat(parties, 'cpty') : parties)

    return {"GUID": x.GUID, "id": x.id, "parties": parties}
  })

  return newFirstLevel
}

export default function reconReducer(state = initState, action) {
  let items, filters, newFilter, updatedFilters

  switch(action.type) {
    case ActionTypes.RECON_INIT_STATE:
      items = action.items
      return state.set('items', fromJS(plusMinusThreeDays(items)))

    case ActionTypes.RECON_FILTER_SET:
      newFilter = action.value
      filters = state.get('filters').toJS()
      updatedFilters = updateFilters(filters, newFilter)
      return state.set('filters', fromJS(updatedFilters))

    case ActionTypes.FIRSTLEVEL_SELECT:
      const selectedFirstLevelList = state.get('firstLevelList') || List()
      const updatedFirstLevelList = updateFirstLevelList(selectedFirstLevelList.toJS(), action.GUID, action.firstLevelID)

      const selectedSecondLevel = state.get('secondLevelList') || List()
      const updatedSecondLevelList = updateSecondLevelListFromFirstLevel(updatedFirstLevelList, selectedSecondLevel.toJS(), state.get('items').toJS())

      return state.set('firstLevelList', fromJS(updatedFirstLevelList)).set('secondLevelList', fromJS(updatedSecondLevelList))

    case ActionTypes.SECONDLEVEL_SELECT:

      const secondLevelList = state.get('secondLevelList') || List()
      const updatedSecondLevelList2 = updateSecondLevelList(secondLevelList.toJS(), action.GUID, action.parentID, action.secondLevelID)

      const firstLevelList = state.get('firstLevelList') || List()
      const updatedFirstLevelList2 = updateFirstlevelListFromSecondLevel(updatedSecondLevelList2, firstLevelList.toJS(), state.get('items').toJS())

      return state.set('secondLevelList', fromJS(updatedSecondLevelList2)).set('firstLevelList', fromJS(updatedFirstLevelList2))

    default:
      return state
  }
}
