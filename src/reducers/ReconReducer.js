import { Map, List, fromJS } from 'immutable'
import _ from 'lodash'

import { clearTime, getDate } from '../utils'
import * as ActionTypes from '../constants/ActionTypes'
import convertToString from './../utils/convertToString'


const initFilters = [
  {order: 1, attr: "legalEntity", label: "Principal Entity"},
  {order: 2, attr: "type",        label: "Deriv Type"},
  {order: 3, attr: "notificationTime",        label: "Time Window", type: "time"},
  {order: 4, attr: "status",      label: "Status"},
  {order: 5, attr: "cptyOrg",     label: "CPTY Organisation"},
  {order: 6, attr: "cptyEntity",  label: "CPTY Entity", type: "multi"},
  {order: 7, attr: "direction",   label:  "Direction",  hide: true}
]

const initState = Map({
  "items": List(),
  "newItems": Map(),
  "filters": fromJS(initFilters)
})

const updateFilters = (filters, newFilter) => (
  _.map(filters, filter => (
    (filter.attr === newFilter.attr)
    ? _.set(filter, 'selected', newFilter.selected)
    : filter
    ))
)

const plusMinusThreeDays = (json) => {

  const today = getDate()
  const thirtySixHrDuration = 36 * 60 * 60 * 1000
  const d = today
  const dPlusOne = new Date(d.getTime() + thirtySixHrDuration)
  const dMinusTwo = new Date(d.getTime() - thirtySixHrDuration)

  return _.filter(json, item => (
    _.inRange((new Date(item.notificationTime)).getTime(), dMinusTwo.getTime(), dPlusOne.getTime())
  ))

}

const updateFirstLevelList = (list, guid, id) => {
  // console.log(_.cloneDeep(list))
  if(!_.isEmpty(list) && !_.isEmpty(list[guid]) && !_.isEmpty(list[guid][id])){
    // console.log(_.cloneDeep(list[guid]))
    _.unset(list, `${guid}.${id}`)
    // console.log(_.cloneDeep(list[guid]))
    return list
  }else {
    let baseLevel = {}, firstLevel = {}
    firstLevel[id] = {
      "GUID": guid,
      "id": id,
      "parties": ["cpty", "client"]
    }

    baseLevel[guid] = firstLevel

    list = _.merge(list, baseLevel)
    // console.log(_.cloneDeep(list))
    return list
  }
}

//backup
// const updateFirstLevelList = (list, guid, id) => (
//   (_.some(list, {"GUID": guid, "id": id}) ?
//     _.filter(list, (x) => !_.isMatch(x, {"GUID": guid, "id": id})) :
//     _.concat([], list, {"GUID": guid, "id": id, 'parties': ['cpty', 'client']}))
// )

const updateSecondLevelListFromFirstLevel = (firstLevelList, list, listOfItems, guid, id) => {
  // console.log(!_.isEmpty(firstLevelList[guid][id]))
  if(!_.isEmpty(firstLevelList[guid][id])){
    // console.log('here')
    const statement = listOfItems[guid]

    const clientAssetFirstLevelList = statement.clientAssets || []
    const counterpartyAssetList = statement.counterpartyAssets || []

    const clientAll = retrieveSecondLevel(clientAssetFirstLevelList, id)
    const cptyAll = retrieveSecondLevel(counterpartyAssetList, id)

    // console.log(clientAll)
    // console.log(cptyAll)
    //
    // console.log(list)

    let newAdditions = {}

    newAdditions = _.merge(newAdditions, _.reduce(Object.keys(clientAll), (sum, key) => {
      let baseLevel = {}, firstLevel = {}, secondLevel = {}

      secondLevel[key] = {"GUID": guid, "id": key, "parentIndex": id}
      firstLevel[id] = secondLevel
      baseLevel[guid] = firstLevel

      // console.log(baseLevel)
      return _.merge(sum, baseLevel)
    }, {}))

    newAdditions = _.merge(newAdditions, _.reduce(Object.keys(cptyAll), (sum, key) => {
      let baseLevel = {}, firstLevel = {}, secondLevel = {}

      secondLevel[key] = {"GUID": guid, "id": key, "parentIndex": id}
      firstLevel[id] = secondLevel
      baseLevel[guid] = firstLevel

      // console.log(baseLevel)
      return _.merge(sum, baseLevel)
    }, {}))

    return _.merge(list, newAdditions)
  }else{
    _.unset(list, `${guid}.${id}`)

    return list
  }
}

//back up
// const updateSecondLevelListFromFirstLevel = (firstLevelList, list, listOfItems) => (
//   _.reduce(
//     _.filter(listOfItems, (x) => _.some(firstLevelList, {"GUID": x.GUID})), (list, item) =>
//       _.unionWith(
//         _.concat(list, _.reduce(item.clientAssets, (list, group) =>
//             _.concat(list, _.reduce(group.data, (list, first) =>
//                 _.concat(list, _.reduce(first.firstLevel.secondLevel, (list, second) =>
//                     (_.some(firstLevelList, {"GUID": item.GUID, "id": second.parentIndex}) ?
//                       _.concat(list, {"GUID": item.GUID, "parentIndex": second.parentIndex, "id": second.id}) :
//                       [])
//                   , []))
//               , []))
//           , [])),
//         _.concat(list, _.reduce(item.counterpartyAssets, (list, group) =>
//             _.concat(list, _.reduce(group.data, (list, first) =>
//                 _.concat(list, _.reduce(first.firstLevel.secondLevel, (list, second) =>
//                     (_.some(firstLevelList, {"GUID": item.GUID, "id": second.parentIndex}) ?
//                       _.concat(list, {"GUID": item.GUID, "parentIndex": second.parentIndex, "id": second.id}) :
//                       [])
//                   , []))
//               , []))
//           , []))
//         , _.isEqual)
//     , [])
// )


const updateSecondLevelList = (list, guid, parentID, id) => {

  // console.log(list)
  // console.log(guid)
  // console.log(parentID)
  // console.log(id)

  if(!_.isEmpty(list) && !_.isEmpty(list[guid]) && !_.isEmpty(list[guid][parentID]) && !_.isEmpty(list[guid][parentID][id])){
    // console.log(_.cloneDeep(list))

    _.unset(list, `${guid}.${parentID}.${id}`)

    // console.log(`${guid}.${parentID}.${id}`)
    //
    // console.log(_.cloneDeep(list))

    return list
  }else {

    // console.log('rechecking')
    let guidLevel = {}, firstLevel = {}, secondLevel = {}

    secondLevel[id] = {"GUID": guid, "id": id, "parentIndex": parentID}
    firstLevel[parentID] = secondLevel
    guidLevel[guid] = firstLevel

    // console.log(guidLevel)
    // console.log(list)
    // console.log(_.merge(list, guidLevel))

    return _.merge(list, guidLevel)
  }



  // return (_.some(list, {"GUID": guid, "id": id, "parentIndex": parentID}) ?
  //   _.filter(list, (x) => !_.isMatch(x, {"GUID": guid, "id": id, "parentIndex": parentID})) :
  //   _.concat([], list, {"GUID": guid, "id": id, "parentIndex": parentID}))
}

// backup
// const updateSecondLevelList = (list, guid, parentID, id) => (
//   (_.some(list, {"GUID": guid, "id": id, "parentIndex": parentID}) ?
//     _.filter(list, (x) => !_.isMatch(x, {"GUID": guid, "id": id, "parentIndex": parentID})) :
//     _.concat([], list, {"GUID": guid, "id": id, "parentIndex": parentID}))
// )

const retrieveSecondLevel = (list, id) => {

  // console.log(list)

  return list.reduce((sum, group) => {
    // console.log(group.data)
    // console.log(id)
    sum = (_.has(group.data, id) ? group.data[id].firstLevel.secondLevel : sum)

    return sum
  }, {})
}

const updateFirstlevelListFromSecondLevel = (secondLevelList, firstLevelList, items, sourceGUID, sourceParentID) => { // GUID and parentID is only used if it's an update
  // const test = _.reduce(secondLevelList, (set, item) => (
  //   _.unionWith(set, [{"GUID": item.GUID, "id": item.parentIndex}], _.isEqual)
  // ), [])

  // const test = secondLevelList

  // console.log(secondLevelList)

  let newFirstLevel = {}

  // if firstLevelList is empty AKA on initial load
  if(_.isEmpty(firstLevelList)) {

    newFirstLevel = _.keyBy(Object.keys(secondLevelList).map((GUID) => {

      // console.log(testing)
      // if(GUID === "970129e4")
      //
      // if(GUID === "ee5f01e5")
      //   console.log(test[GUID])
      //
      //   console.log('*********')
      // console.log('GUID: ')
      //   console.log(GUID)

      // console.log(secondLevelList[GUID])

      const testing = _.keyBy(Object.keys(secondLevelList[GUID]).map(firstLevelID => {
          // console.log('first level: ')
          //   console.log(firstLevelID)
          // console.log('**********')

          const statement = items[GUID]
          // console.log(statement)
          const clientAssetFirstLevelList = statement.clientAssets || []
          const counterpartyAssetList = statement.counterpartyAssets || []

          //number of second level items in this first lvl obj in the list
          const presentInList = secondLevelList[GUID][firstLevelID]
          // console.log(presentInList)
          //
          const clientAll = retrieveSecondLevel(clientAssetFirstLevelList, firstLevelID)
          const cptyAll = retrieveSecondLevel(counterpartyAssetList, firstLevelID)
          //
          let parties = []
          // console.log(presentInList)
          // console.log(clientAll)
          // console.log(cptyAll)


          // if(GUID==="ee5f01e5")
          //     console.log('here')

          parties = (JSON.stringify(Object.keys(presentInList).sort()) === JSON.stringify(Object.keys(clientAll).sort()) ? _.concat(parties, 'client') : parties)
          parties = (JSON.stringify(Object.keys(presentInList).sort()) === JSON.stringify(Object.keys(cptyAll).sort()) ? _.concat(parties, 'cpty') : parties)

          // console.log({"GUID": GUID, "id": firstLevelID, "parties": parties})
          // if(GUID === "970129e4")
          //   console.log({"GUID": GUID, "id": firstLevelID, "parties": parties})

          return {"GUID": GUID, "id": firstLevelID, "parties": parties}
        }
      ), o => String(o.id))

      // console.log(testing)

      return testing
    }), o => {
      // console.log(o)
      return String(o[Object.keys(o)[0]].GUID)
    })

  }// end if firstLevelList is empty AKA on initial load

    //if it's not empty
  else {
    const statement = items[sourceGUID]
    // console.log(statement)
    const clientAssetFirstLevelList = statement.clientAssets || []
    const counterpartyAssetList = statement.counterpartyAssets || []

    const presentInList = secondLevelList[sourceGUID][sourceParentID]
    // console.log(presentInList)
    //
    const clientAll = retrieveSecondLevel(clientAssetFirstLevelList, sourceParentID)
    const cptyAll = retrieveSecondLevel(counterpartyAssetList, sourceParentID)
    //
    let parties = []

    parties = (JSON.stringify(Object.keys(presentInList).sort()) === JSON.stringify(Object.keys(clientAll).sort()) ? _.concat(parties, 'client') : parties)
    parties = (JSON.stringify(Object.keys(presentInList).sort()) === JSON.stringify(Object.keys(cptyAll).sort()) ? _.concat(parties, 'cpty') : parties)

    // let baseLevel = {}, firstLevel = {}
    // firstLevel[sourceParentID] = {"GUID": sourceGUID, "id": sourceParentID, "parties": parties}
    // baseLevel[sourceGUID] = firstLevel

    _.set(firstLevelList, `${sourceGUID}.${sourceParentID}`, {"GUID": sourceGUID, "id": sourceParentID, "parties": parties})

    newFirstLevel = _.cloneDeep(firstLevelList)
    // console.log(_.cloneDeep(newFirstLevel))
  }

  // console.log(_.cloneDeep(newFirstLevel12))

  return newFirstLevel
}

//back up
// const updateFirstlevelListFromSecondLevel = (secondLevelList, firstLevelList, items) => {
//   const test = _.reduce(secondLevelList, (set, item) => (
//     _.unionWith(set, [{"GUID": item.GUID, "id": item.parentIndex}], _.isEqual)
//   ), [])
//
//   const newFirstLevel = test.map((x) => { // look thru second level list
//     const statement = _.find(items, {"GUID": x.GUID}) //get the margin statement
//     const clientAssetFirstLevelList = statement.clientAssets || [] //client assets if exists
//     const counterpartyAssetList = statement.counterpartyAssets  || [] //cpty assets if exists
//
//     //number of second level items in this first lvl obj in the list
//     const presentInList = _.filter(secondLevelList, (y) => _.isMatch(y, {"GUID": x.GUID, "parentIndex": x.id})) //check if second level item
//
//     const clientAll = retrieveSecondLevel(clientAssetFirstLevelList, x.GUID, x.id) //get all second level from client based on first level
//
//     const cptyAll = retrieveSecondLevel(counterpartyAssetList, x.GUID, x.id) //get all second level from cpty based on first level
//
//     let parties = []
//
//      //count if second level checks match total number of second level items in the store
//     parties = (_.remove(clientAll, (n) => _.some(presentInList, {"id": n.id, "parentIndex": n.parentIndex})).length >= clientAll ? _.concat(parties, 'client') : parties)
//     parties = (_.remove(cptyAll, (n) => _.some(presentInList, {"id": n.id, "parentIndex": n.parentIndex})).length >= cptyAll ? _.concat(parties, 'cpty') : parties)
//
//     return {"GUID": x.GUID, "id": x.id, "parties": parties}
//   })
//
//   return newFirstLevel
// }


const secondLevelChecks = (items) => {

  //filter out empty mismatched MS & different sized assets
  // console.log(items)
  const dataSet = _.filter(items,
    item => (item.counterpartyAssets.length && item.clientAssets.length) && (item.counterpartyAssets.length === item.clientAssets.length))

  //console.log(dataSet)

  let lol = _.reduce(dataSet, (sum, item) => {
    // console.log(item)
    // if(item.GUID == "3e5e748d")
    //   console.log(item)
    return _.assign(sum, _.reduce(item.clientAssets, (sum, group) => {
       //console.log(group)
      return _.assign(sum, _.reduce(group.data, (sum, firstLevel) => {
         // console.log(_.cloneDeep(sum))

        let firstlevel = _.reduce(firstLevel.firstLevel.secondLevel, (sum, secondLevel) => {
          // console.log("---------- 2nd level ---------")

          //
          // console.log(convertToString)
          // console.log(secondLevel.tolerance)
          //console.log('break')

          if(!secondLevel.tolerance){
            // let composite = {}
            // composite[convertToString(item.GUID, firstLevel.firstLevel.id, secondLevel.id)] = {
            //   "GUID": item.GUID,
            //   "id": secondLevel.id,
            //   "parentIndex": firstLevel.firstLevel.id
            // }

            // console.log(item.GUID)
            // console.log(secondLevel)
            // console.log(sum)
            // console.log(convertToString(firstLevel.firstLevel.id))
            // console.log(convertToString(item.GUID))
            // console.log('here')

            let asd = {}

            asd[secondLevel.id] = {
              "GUID": item.GUID,
              "id": secondLevel.id,
              "parentIndex": firstLevel.firstLevel.id
            }

            let def = {}
            def[convertToString(firstLevel.firstLevel.id)] = asd

            let ghi = {}
            ghi[convertToString(item.GUID)] = def

            // console.log('========================')
            // console.log('guid');
            // console.log(item.GUID)
            // console.log('sum');
            // console.log(_.isEmpty(sum))
            // console.log(_.cloneDeep(sum))
            // console.log('ghi');
            // console.log(_.cloneDeep(ghi))
            // console.log('merge');
            // console.log(_.cloneDeep(_.merge(sum, ghi)))
            // console.log('========================')

            return _.merge(sum, ghi)

            // if(!_.isEmpty(sum))
            //   return _.set(sum, [convertToString(item.GUID)][convertToString(firstLevel.firstLevel.id)], _.concat(sum[convertToString(item.GUID)][convertToString(firstLevel.firstLevel.id)], asd))
            // else
            //   return ghi
          }

          return sum
        }, {})

        // console.log('break')
        // console.log(firstlevel)
        // console.log(!_.isEmpty(firstlevel))
        // console.log(sum)
        //console.log(_.set(firstlevel, [convertToString(item.GUID)][convertToString(firstLevel.firstLevel.id)], firstlevel[convertToString(item.GUID)][convertToString(firstLevel.firstLevel.id)].filter(n => !_.isEmpty(n))))

        //console.log(firstlevel)

        // console.log(firstLevel)

        // if(!_.isEmpty(firstlevel))
        //   _.set(firstlevel, //object
        //     [convertToString(item.GUID)][convertToString(firstLevel.firstLevel.id)], //path of object
        //     firstlevel[convertToString(item.GUID)][convertToString(firstLevel.firstLevel.id)].filter(n => !_.isEmpty(n))) //filter out empty items

        // if(!_.isEmpty(firstlevel))
        //   _.set(firstlevel, //object
        //     [convertToString(item.GUID)][convertToString(firstLevel.firstLevel.id)], //path of object
        //     firstlevel[convertToString(item.GUID)][convertToString(firstLevel.firstLevel.id)].filter(n => !_.isEmpty(n))) //filter out empty items

        // if(!_.isEmpty(firstlevel)) //check if firstlevel is empty, if empty, no need to clean array
          return _.assign(sum, firstlevel)
        // else
        //   return sum

      }, {}))
    }, {}))
  }, {})

  if(!_.isEmpty(lol.undefined))
    _.unset(lol, undefined)

  // console.log(lol)

  return lol
}

//back up
// const secondLevelChecks = (items) => (
//   _.reduce(
//     _.filter(items, //filter out empty mismatched MS & different sized assets
//       item => (item.counterpartyAssets.length && item.clientAssets.length) && (item.counterpartyAssets.length === item.clientAssets.length) ),
//     (sum, item) =>
//       (_.concat(sum, _.reduce(item.clientAssets, (sum, group) =>
//         _.concat(sum, _.reduce(group.data, (sum, firstLevel) =>
//           _.concat(sum, _.reduce(firstLevel.firstLevel.secondLevel, (sum, secondLevel) =>
//             !secondLevel.tolerance ? _.concat(sum, [{"GUID": item.GUID, "id": secondLevel.id, "parentIndex": firstLevel.firstLevel.id}]) : sum, [])), [])), []))), [])
//
// )


// autocheck those with only first level and no second level
const autoCheckFirstLevelOnly = (items) => {

  const dataSet = _.filter(items,
    item => (item.counterpartyAssets.length && item.clientAssets.length) && (item.counterpartyAssets.length === item.clientAssets.length) )

  const lol = _.reduce(
    dataSet,
    (sum, item) =>
      (_.assign(sum, _.reduce(item.clientAssets, (sum, group) =>
        _.assign(sum, _.reduce(group.data, (sum, firstLevel) => {

          if(!firstLevel.firstLevel.secondLevelCount && !firstLevel.firstLevel.tolerance){
            let second = {}, composite = {}

            second[firstLevel.firstLevel.id] = {
              "GUID": item.GUID,
              "id": firstLevel.firstLevel.id,
              'parties': ['cpty', 'client']
            }

            composite[item.GUID] = second

            return _.assign(sum, composite)
          }

          return sum

        }, {})), {}))), {})

  return lol
}

//back up
// const autoCheckFirstLevelOnly = (items) => {
//
//   return _.reduce(
//     _.filter(items,
//       item => (item.counterpartyAssets.length && item.clientAssets.length) && (item.counterpartyAssets.length === item.clientAssets.length) ),
//     (sum, item) =>
//       (_.concat(sum, _.reduce(item.clientAssets, (sum, group) =>
//         _.concat(sum, _.reduce(group.data, (sum, firstLevel) =>
//           !firstLevel.firstLevel.secondLevelCount && !firstLevel.firstLevel.tolerance ? _.concat(sum, [{"GUID": item.GUID, "id": firstLevel.firstLevel.id, 'parties': ['cpty', 'client']}]) : sum
//           , [])), []))), [])
// }

export default function reconReducer(state = initState, action) {
  let items, filters, newFilter, updatedFilters

  switch(action.type) {
    case ActionTypes.RECON_INIT_STATE:

      /*****
      * const does not mean variable is immutable, only the binding between the obj and variable is immutable
      * obj can still be mutated
       *
      * hence the deep cloning
      * ****/

      const items = plusMinusThreeDays(action.items)

      //const newItems = _.keyBy(items, (o) => o.GUID)

      // console.log(newItems)

      // console.log(_.map(group, group => _.set(group, 'data', _.map(group.data, first => _.set(first, 'firstLevel.secondLevel', _.keyBy(first.firstLevel.secondLevel, second => second.id))))))
      const newItems = _.keyBy( //guid keyby

        _.map(items, item => {

          _.set(item.clientAssets, _.map(item.clientAssets, group => {

            _.set(group, 'data', _.map(group.data, first => _.set(first, 'firstLevel.secondLevel', _.keyBy(first.firstLevel.secondLevel, second => second.id))))

            return _.set(
              group, //second level keyby
              'data', _.keyBy(group.data, data => data.firstLevel.id)) //first level keyby
          }))

          _.set(item.counterpartyAssets, _.map(item.counterpartyAssets, group => {

            _.set(group, 'data', _.map(group.data, first => _.set(first, 'firstLevel.secondLevel', _.keyBy(first.firstLevel.secondLevel, second => second.id))))

            return _.set(
              group, //second level keyby
              'data', _.keyBy(group.data, data => data.firstLevel.id)) //first level keyby
          }))

          // console.log(item)
          return item
        })

      , (o) => o.GUID) //end guid keyby


      const secondLevelList1 = secondLevelChecks(_.cloneDeep(items))

      // console.log(secondLevelList1)

      const firstLevelList1 = updateFirstlevelListFromSecondLevel(secondLevelList1, {}, _.cloneDeep(newItems))

      // console.log(_.merge(firstLevelList1, autoCheckFirstLevelOnly(_.cloneDeep(newItems))))

      // console.log(_.keyBy(items, (o) => o.GUID))
      return state.withMutations(state => state.set('items', fromJS(items)).set('newItems', fromJS(newItems)).set('secondLevelList', fromJS(secondLevelList1)).set('firstLevelList', fromJS(_.merge(firstLevelList1, autoCheckFirstLevelOnly(_.cloneDeep(newItems))))))

      // return state.withMutations(state => state.set('items', fromJS(items)).set('newItems', fromJS(newItems)))

    case ActionTypes.INIT_CURRENCY_INFO:
      return state.set('currencyInfo', fromJS(action.currencyInfo))

    case ActionTypes.RECON_FILTER_SET:
      newFilter = action.value
      filters = state.get('filters').toJS()
      updatedFilters = updateFilters(filters, newFilter)
      return state.set('filters', fromJS(updatedFilters))

    case ActionTypes.FIRSTLEVEL_SELECT:
      const selectedFirstLevelList = state.get('firstLevelList') || List()
      const updatedFirstLevelList = updateFirstLevelList(selectedFirstLevelList.toJS(), action.GUID, action.firstLevelID)

      const selectedSecondLevel = state.get('secondLevelList') || List()
      const updatedSecondLevelList = updateSecondLevelListFromFirstLevel(updatedFirstLevelList, selectedSecondLevel.toJS(), state.get('newItems').toJS(), action.GUID, action.firstLevelID)
      //
      // return state.set('firstLevelList', fromJS(updatedFirstLevelList)).set('secondLevelList', fromJS(updatedSecondLevelList))

      return state.withMutations(state => state.set('firstLevelList', fromJS(updatedFirstLevelList)).set('secondLevelList', fromJS(updatedSecondLevelList)))

    case ActionTypes.SECONDLEVEL_SELECT:

      const secondLevelList = state.get('secondLevelList') || List()
      const updatedSecondLevelList2 = updateSecondLevelList(secondLevelList.toJS(), action.GUID, action.parentID, action.secondLevelID)

      //
      // console.log(secondLevelList.toJS())
      // console.log(updatedSecondLevelList2)
      // const test = _.difference(secondLevelList.toJS(), updatedSecondLevelList2)
      // console.log(test)

      const firstLevelList = state.get('firstLevelList') || List()

      // console.log(firstLevelList.toJS())

      const updatedFirstLevelList2 = updateFirstlevelListFromSecondLevel(updatedSecondLevelList2, firstLevelList.toJS(), state.get('newItems').toJS(), action.GUID, action.parentID)

      // console.log(updatedFirstLevelList2)

      return state.set('secondLevelList', fromJS(updatedSecondLevelList2)).set('firstLevelList', fromJS(updatedFirstLevelList2))

    default:
      return state
  }
}
