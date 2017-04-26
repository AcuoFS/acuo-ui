import { connect } from 'react-redux';
import { AssetsComponent } from '../components'
import { AssetsReducer } from '../reducers'
// import { assetPanelResizeToggle } from '../actions/AssetsActions.js'
import { AssetsPanel } from '../actions/AssetsActions.js'

const mapStateToProps = (stateProps, ownProps) => {
  return {
   state: stateProps.AssetsReducer
  }
 }

const AssetsContainer =  connect(
  mapStateToProps
)( AssetsComponent )

export default AssetsContainer;

// const mapDispatchToProps = (dispatch, ownProps) => {
//
//   return {
//    ResizeToggle: (handleStatus)=>{ dispatch( AssetsPanel.ResizeToggle(handleStatus) ) },
//    MouseDownOnResize: (downOrNot)=>{ dispatch(AssetsPanel.MouseDownOnResize(downOrNot)) },
//    NewCursorY: (cursorY)=>{ dispatch( AssetsPanel.NewCursorY(cursorY) ) },
//    ApplyNewPanelHeight: (newHeight)=>{ dispatch( AssetsPanel.NewPanelHeight(newHeight) ) }
//   }
// }
//
// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//  let _higherOrderActions = {
//   GetNewPanelHeight: (newCursorY)=>{ let currentHeight = stateProps.state.AssetsReducer.ui.deployedPanel.panelHeight;
//                                      let currentCursorY = stateProps.state.AssetsReducer.ui.deployedPanel.currentCursorY;
//                                      let newHeight = currentHeight + (newCursorY - currentCursorY)
//                                      if(newHeight >= 400) { dispatchProps.ApplyNewPanelHeight(newHeight)
//                                                             dispatchProps.NewCursorY(newCursorY) }
//                                      else { dispatchProps.ApplyNewPanelHeight(400)
//                                             dispatchProps.ResizeToggle(false)
//                                             dispatchProps.MouseDownOnResize(false) }
//
//                                     },
//  }
//
//  return {
//   AssetsUi: stateProps.state.AssetsReducer.ui,
//   AssetsData: stateProps.state.AssetsReducer.data,
//   Dispatch: { ...dispatchProps, ..._higherOrderActions},
//   ownProps
//  }
// }
