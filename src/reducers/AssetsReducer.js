import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

const INITIAL_STATE = {
  ui: { 'IsDeployedPanelExpandedSideways': false,
        'IsVarMarginSelected': true,
        'IsRegionSelected': true },
  data: {}
}

const AssetsReducer = (state = INITIAL_STATE , action)=>{
  let newState = {}
  switch (action.type){
    case "@DEPLOYED_PANEL__TOGGLE_SIDE_EXPAND":
      newState = _.set(_.cloneDeep(state), ['ui', 'IsDeployedPanelExpandedSideways'], action.payload)
      return newState
    case "@DEPLOYED__TOGGLE_INIT_VAR_MARGIN":
      newState = _.set(_.cloneDeep(state), ['ui', 'IsVarMarginSelected'], action.payload)
      return newState
    case "@DEPLOYED__TOGGLE_CATEGORY":
      newState = _.set(_.cloneDeep(state), ['ui', 'IsRegionSelected'], action.payload)
      return newState
    default:
      return state
  }
}
// const AssetsReducer = (state = INITIAL_STATE , action)=>{
//  let newState;
//   switch (action.type){
//     case "PANEL_RESIZE_TOGGLE":
//       newState = _.set(_.cloneDeep(state), ['ui', 'deployedPanel', 'resizeHandleActive'], action.payload)
//       return newState
//     case "PANEL_RESIZE_MOUSE_DOWN":
//       newState = _.set(_.cloneDeep(state), ['ui', 'deployedPanel', 'resizeHandleMouseDown'], action.payload)
//       return newState
//     case "CURSOR_Y_POSITION":
//       let newCursorY = action.payload
//        newState = _.set(_.cloneDeep(state), ['ui', 'deployedPanel', 'currentCursorY'], newCursorY)
//       return newState
//     case "UPDATE_PANEL_HEIGHT":
//       let newHeight = action.payload
//       return newState = _.set(_.cloneDeep(state), ['ui', 'deployedPanel', 'panelHeight'], newHeight)
//     default:
//       return state
//   }
// }


export default AssetsReducer
