import React from 'react'
import { connect } from 'react-redux'
import {
  NavigationBarContainer,
  FlightContainer,
  AssetsContainer
} from '../../containers'
import Copyright from '../../components/copyright/Copyright.js'
import { AssetsPanel } from '../../actions/AssetsActions.js'


class DeployedPageComponent extends React.Component {
  componentDidMount () {
   console.log(this.props)
    window.scrollTo(0, 0)
  }
  render() {
   let isMouseDown = this.props.AssetsUi.deployedPanel.resizeHandleMouseDown
   let resizeHandleActive = this.props.AssetsUi.deployedPanel.resizeHandleActive
    return (
     <div onMouseUp={ ()=>{ if(isMouseDown){ this.props.MouseDownOnResize(false) } }}
          onMouseMove={ (e)=>{ if(isMouseDown) { this.props.GetNewPanelHeight(e.clientY) }}}  >
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <FlightContainer/>
        <AssetsContainer/>
        <Copyright/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
 return{
  AssetsUi: state.AssetsReducer.ui,
  AssetsData: state.AssetsReducer.data
 }
}

const mapDispatchToProps = (dispatch, ownProps) => {
 return {
  MouseDownOnResize: (downOrNot)=>{ dispatch(AssetsPanel.MouseDownOnResize(downOrNot)) },
  NewCursorY: (cursorY)=>{ dispatch( AssetsPanel.NewCursorY(cursorY) ) },
  ApplyNewPanelHeight: (newHeight)=>{ dispatch( AssetsPanel.NewPanelHeight(newHeight) ) }
 }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
 let _higherOrderActions = {
  GetNewPanelHeight: (newCursorY)=>{ let currentHeight = stateProps.AssetsUi.deployedPanel.panelHeight;
                                     let currentCursorY = stateProps.AssetsUi.deployedPanel.currentCursorY;
                                     let newHeight = currentHeight + (newCursorY - currentCursorY)
                                     if(newHeight > 400) { dispatchProps.ApplyNewPanelHeight(newHeight) }
                                     else { dispatchProps.ApplyNewPanelHeight(400) }
                                     dispatchProps.NewCursorY(newCursorY)
                                    }
 }

 return{
  ...stateProps,
  ...dispatchProps,
  ..._higherOrderActions,
  ...ownProps
 }

}

const DeployedPage = connect(
 mapStateToProps,
 mapDispatchToProps,
 mergeProps
)(DeployedPageComponent)

export {DeployedPage}
