import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

const INITIAL_STATE = {
  ui: { deployedPanel: { resizeHandleActive: false,
                         panelHeight: "400px",
                         onClickY: null }, },
  data: {}
}

const AssetsReducer = (state = INITIAL_STATE , action)=>{
 let newState;
  switch (action.type){
    case "PANEL_RESIZE_TOGGLE":
      console.log(action.payload);
      newState = _.set(_.cloneDeep(state), ['ui', 'deployedPanel', 'resizeHandleActive'], action.payload)
      return newState
    case "CURSOR_Y_POSITION":
      let cursorY = action.payload.toString() + "px"
       newState = _.set(_.cloneDeep(state), ['ui', 'deployedPanel', 'onClickY'], cursorY)
      return newState
    default:
      return state
  }
}


export default AssetsReducer
