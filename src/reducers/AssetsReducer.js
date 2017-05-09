import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

const INITIAL_STATE = {
  ui: { 'DeployedPanel_ExpandedSideways': false,
        'DeployedPanel_ExpandedVertically': false,
        'IsVarMarginSelected': true,
        'IsRegionSelected': true,
        'HomePanel_ExpandedVertically': false,
        'HomePanel_IsPledgeSelected': true },
  data: {}
}

const AssetsReducer = (state = INITIAL_STATE , action)=>{
  let newState = {}
  switch (action.type){
   //For Deployed Panel
    case "@DEPLOYED__TOGGLE_SIDE_EXPAND":
      newState = _.set(_.cloneDeep(state), ['ui', 'DeployedPanel_ExpandedSideways'], action.payload)
      return newState
    case "@DEPLOYED__TOGGLE_Y_EXPAND":
      newState = _.set(_.cloneDeep(state), ['ui', 'DeployedPanel_ExpandedVertically'], action.payload)
      return newState
    case "@DEPLOYED__TOGGLE_INIT_VAR_MARGIN":
      newState = _.set(_.cloneDeep(state), ['ui', 'IsVarMarginSelected'], action.payload)
      return newState
    case "@DEPLOYED__TOGGLE_CATEGORY":
      newState = _.set(_.cloneDeep(state), ['ui', 'IsRegionSelected'], action.payload)
      return newState

   //For Deployed Panel
    case "@HOME__TOGGLE_Y_EXPAND":
      newState = _.set(_.cloneDeep(state), ['ui', 'HomePanel_ExpandedVertically'], action.payload)
      return newState
    case "@HOME__TOGGLE_CATEGORY":
      newState = _.set(_.cloneDeep(state), ['ui', 'HomePanel_IsPledgeSelected'], action.payload)
      return newState




    default:
      return state
  }
}

export default AssetsReducer
