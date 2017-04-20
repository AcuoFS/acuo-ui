import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

const INITIAL_STATE = {
  ui: { deployedPanel: { resizeHandleActive: false,
                         resizeHandleMouseDown: false,
                         panelHeight: 400,
                         currentCursorY: null }, },
  data: {}
}

const AssetsReducer = (state = INITIAL_STATE , action)=>{
 let newState;
  switch (action.type){
    case "PANEL_RESIZE_TOGGLE":
      newState = _.set(_.cloneDeep(state), ['ui', 'deployedPanel', 'resizeHandleActive'], action.payload)
      return newState
    case "PANEL_RESIZE_MOUSE_DOWN":
      newState = _.set(_.cloneDeep(state), ['ui', 'deployedPanel', 'resizeHandleMouseDown'], action.payload)
      return newState
    case "CURSOR_Y_POSITION":
      let newCursorY = action.payload
       newState = _.set(_.cloneDeep(state), ['ui', 'deployedPanel', 'currentCursorY'], newCursorY)
      return newState
    case "UPDATE_PANEL_HEIGHT":
      let newHeight = action.payload
      return newState = _.set(_.cloneDeep(state), ['ui', 'deployedPanel', 'panelHeight'], newHeight)
    default:
      return state
  }
}


export default AssetsReducer
