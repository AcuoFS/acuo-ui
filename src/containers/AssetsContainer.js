import { connect } from 'react-redux';
import { AssetsComponent } from '../components'
import { AssetsReducer } from '../reducers'
// import { assetPanelResizeToggle } from '../actions/AssetsActions.js'
import { AssetsPanel } from '../actions/AssetsActions.js'

const mapStateToProps = (state, ownProps) => {
  return {
   state
  }
 }

const mapDispatchToProps = (dispatch, ownProps) => {

  let _ = {
   test: ()=>{ console.log("test123") }
  }

  return {
   ResizeToggle: (handleStatus)=>{ dispatch( AssetsPanel.ResizeToggle(handleStatus) ) },
   OnClickY: (cursorY)=>{ dispatch( AssetsPanel.onClickY(cursorY) ) },
   ApplyNewPanelHeight: (newHeight)=>{ dispatch( AssetsPanel.newPanelHeight(newHeight) ) }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
 // console.log(stateProps)
 // console.log(dispatchProps)
 // console.log(ownProps)

 let _higherOrderActions = {
  GetNewPanelHeight: (newCursorY)=>{ let currentHeight = stateProps.state.AssetsReducer.ui.deployedPanel.panelHeight;
                                     let onClickY = stateProps.state.AssetsReducer.ui.deployedPanel.onClickY;
                                     let newHeight = currentHeight + (onClickY - newCursorY)
                                     return dispatchProps.ApplyNewPanelHeight(newHeight) },
 }

 return {
  AssetsUi: stateProps.state.AssetsReducer.ui,
  AssetsData: stateProps.state.AssetsReducer.data,
  Dispatch: { ...dispatchProps, ..._higherOrderActions},
  ownProps
 }
}


const AssetsContainer =  connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)( AssetsComponent )

export default AssetsContainer;
