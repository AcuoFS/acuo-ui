import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

const INITIAL_STATE_JS = {
  ui: { 'DeployedPanel_ExpandedSideways': false,
        'DeployedPanel_ExpandedVertically': false,
        'IsVarMarginSelected': true,
        'IsRegionSelected': true,
        'HomePanel_ExpandedVertically': false,
        'HomePanel_IsPledgeSelected': true },
  data: {}
}

const INITIAL_STATE = fromJS(INITIAL_STATE_JS); //console.log(Map.isMap(INITIAL_STATE));


const AssetsReducer = (state = INITIAL_STATE , action)=>{
  let newState = {}
  switch (action.type){
   //For Deployed Panel
    case "@DEPLOYED__TOGGLE_SIDE_EXPAND":
      return state.setIn(['ui','DeployedPanel_ExpandedSideways'], fromJS(action.payload))

    case "@DEPLOYED__TOGGLE_Y_EXPAND":
      return state.setIn(['ui','DeployedPanel_ExpandedVertically'], fromJS(action.payload))

    case "@DEPLOYED__TOGGLE_INIT_VAR_MARGIN":
      return state.setIn(['ui','IsVarMarginSelected'], fromJS(action.payload))

    case "@DEPLOYED__TOGGLE_CATEGORY":
      return state.setIn(['ui','IsRegionSelected'], fromJS(action.payload))

   //For Deployed Panel
    case "@HOME__TOGGLE_Y_EXPAND":
      return state.setIn(['ui','HomePanel_ExpandedVertically'], fromJS(action.payload))

    case "@HOME__TOGGLE_CATEGORY":
      return state.setIn(['ui','HomePanel_IsPledgeSelected'], fromJS(action.payload))

    default:
      return state
  }
}

export default AssetsReducer
