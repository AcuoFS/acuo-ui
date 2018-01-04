import {Map, List, fromJS, toJS} from 'immutable'
import _ from 'lodash'
import {
  HomePledgedContentNew,
  HomePrincipalContentNew,
  ApiInitMargResponse,
  ApiVarMargResponse
} from '../components/assets/mockData/mockData.js'

import { UPDATE_SUBSTITUTED_FLAG } from './../constants/ActionTypes'

/* thread() Caveats!!!!
- Argument:action is the dispatched action object. Its key-names must be identical with the keyname in the state!!!
*/

let thread = (state, action) => _.reduce(action,
  (newState, pathObj, path) => _.reduce(pathObj,
    (pathState, fieldValue, field) => _.update(pathState, `${path}.${field}`, () => fieldValue),
    state),
  state)


const INITIAL_STATE = fromJS({
  ui: {
    'DeployedPanel_ExpandedSideways': false,
    'DeployedPanel_ExpandedVertically': false,
    'DeployedPanel_SearchText': "",
    'IsVarMarginSelected': true,
    'IsRegionSelected': true,
    'HomePanel_ExpandedVertically': false,
    'HomePanel_IsPledgeSelected': true,
    'showPopup': false,
    'Popup_Amount': undefined,
    substituted: false
  },
  data: {
    'Popup_DragDirectionTo': null,
    'Popup_DraggingHomeAssetID': null,
    'Popup_DraggingDeployedAssetID': null,
    'Popup_OriginAgreement': null,
    'Popup_DroppedAsset': null,
    'Popup_AssetToBeReplaced': null,
    'Home_PledgedContent': HomePledgedContentNew,
    'Home_PrincipalContent': HomePrincipalContentNew,
    'Deployed_InitMarginContent': ApiInitMargResponse,
    'Deployed_VarMarginContent': ApiVarMargResponse,
  }
})

const AssetsReducer = (state = INITIAL_STATE, action) => {
  let newState = {}
  let actionFoo = {data: {showPopup: true}}
  thread(state, actionFoo)

  switch (action.type) {
    //For Deployed Panel
    case "@DEPLOYED__TOGGLE_SIDE_EXPAND":
      return state.setIn(['ui', 'DeployedPanel_ExpandedSideways'], fromJS(action.payload))

    case "@DEPLOYED__TOGGLE_Y_EXPAND":
      return state.setIn(['ui', 'DeployedPanel_ExpandedVertically'], fromJS(action.payload))

    case "@DEPLOYED__TOGGLE_INIT_VAR_MARGIN":
      return state.setIn(['ui', 'IsVarMarginSelected'], fromJS(action.payload))

    case "@DEPLOYED__TOGGLE_CATEGORY":
      return state.setIn(['ui', 'IsRegionSelected'], fromJS(action.payload))

    case "@DEPLOYED__SEARCHTEXT":
      return state.setIn(['ui', 'DeployedPanel_SearchText'], fromJS(action.payload))

    //For Home Panel
    case "@HOME__TOGGLE_Y_EXPAND":
      return state.setIn(['ui', 'HomePanel_ExpandedVertically'], fromJS(action.payload))

    case "@HOME__TOGGLE_CATEGORY":
      return state.setIn(['ui', 'HomePanel_IsPledgeSelected'], fromJS(action.payload))

    //For Popup
    case "@SHOW_POPUP":
      return state.setIn(['ui', 'showPopup'], fromJS(action.payload))

    case "@POPUP_AMOUNT":
      return state.setIn(['ui', 'Popup_Amount'], fromJS(action.payload))

    case "@POPUP__DROPPED_ASSET":
      return state.setIn(['data', 'Popup_DroppedAsset'], fromJS(action.payload))

    case "@POPUP__ASSET_TO_BE_REPLACED":
      return state.setIn(['data', 'Popup_AssetToBeReplaced'], fromJS(action.payload))

    case "@POPUP_ON_DRAG_START":
      newState = thread(state.toJS(), action.payload)
      return fromJS(newState)

    case "@POPUP_ON_DRAG_END":
      newState = thread(state.toJS(), action.payload)
      return fromJS(newState)

    case "@POPUP_ON_DROP":
      newState = thread(state.toJS(), action.payload)
      return fromJS(newState)

    case "@POPUP_ON_CLICK_CANCEL":
      newState = thread(state.toJS(), action.payload)
      return fromJS(newState)

    case UPDATE_SUBSTITUTED_FLAG:
      return state.setIn(['ui', 'substituted'], fromJS(action.flag))

    default:
      return state
  }
}

export default AssetsReducer
