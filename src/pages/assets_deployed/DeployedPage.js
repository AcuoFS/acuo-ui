import React from 'react'
import {connect} from 'react-redux'
import {
  NavigationBarContainer,
  FlightContainer,
  AssetsContainer
} from '../../containers'
import {DeployedOptimisationContainer} from './../../containers'

// import { fetchDepartures } from './../../actions/DeployedActions'
// import Copyright from '../../components/copyright/Copyright.js'
// import { AssetsPanel } from '../../actions/AssetsActions.js'
import Styles from "./DeployedPage.css"
// import { initDepartures } from '../../actions/DeployedActions'
// import { FETCH_DEPLOYED_DEPARTURES } from './../../constants/APIcalls'
import {hashHistory} from 'react-router'

class DeployedPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filterBarShow: true,
      filterBar: Styles.open,
      filterItems: Styles.show,
    }

    this.toggleFilter = this.toggleFilter.bind(this)
  }

  componentWillMount() {
    if (localStorage.loginAt == undefined || localStorage.loginAt < Date.now()) {
      hashHistory.push('/')
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    if (localStorage.loginAt < Date.now()) {
      hashHistory.push("/")
    }
  }

  toggleFilter() {
    if (!this.state.filterBarShow) {
      this.setState({
        filterBarShow: !this.state.filterBarShow,
        filterBar: Styles.open,
        filterItems: Styles.show
      })
    } else {
      this.setState({
        filterBarShow: !this.state.filterBarShow,
        filterBar: Styles.close,
        filterItems: Styles.hide
      })
    }
  }

  render() {
    return (
      <div className={Styles.page}>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <div className={Styles.filterBarName + ' ' + this.state.filterBar} onClick={this.toggleFilter}>
          <span>Optimisation Setting</span>
          <div className={Styles.switchArrow}>
            <div className={Styles.arrowLine} id={Styles.line1}></div>
            <div className={Styles.arrowLine} id={Styles.line2}></div>
          </div>
        </div>
        <div className={Styles.optContainer + ' ' + this.state.filterItems}>
          <DeployedOptimisationContainer/>
        </div>
        <FlightContainer/>
        <AssetsContainer/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {test: 0}
}

const mapDispatchToProps = dispatch => {
  return {}
}

const DeployedPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeployedPage)

export {DeployedPageContainer}


// class DeployedPageComponent extends React.Component {
//   componentDidMount () {
//    // console.log(this.props)
//     window.scrollTo(0, 0)
//   }
//   render() {
//    let isMouseDown = this.props.AssetsUi.deployedPanel.resizeHandleMouseDown
//    let resizeHandleActive = this.props.AssetsUi.deployedPanel.resizeHandleActive
//     return (
//      <div onMouseUp={ ()=>{ if(isMouseDown){ this.props.MouseDownOnResize(false) } }}
//           onMouseMove={ (e)=>{ if(isMouseDown) { this.props.GetNewPanelHeight(e.clientY) }}}  >
//         <NavigationBarContainer curPage={this.props.location.pathname}/>
//         <FlightContainer/>
//         <AssetsContainer/>
//         <Copyright/>
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = (state, ownProps) => {
//  return{
//   AssetsUi: state.AssetsReducer.ui,
//   AssetsData: state.AssetsReducer.data
//  }
// }
//
// const mapDispatchToProps = (dispatch, ownProps) => {
//  return {
//   MouseDownOnResize: (downOrNot)=>{ dispatch(AssetsPanel.MouseDownOnResize(downOrNot)) },
//   NewCursorY: (cursorY)=>{ dispatch( AssetsPanel.NewCursorY(cursorY) ) },
//   ApplyNewPanelHeight: (newHeight)=>{ dispatch( AssetsPanel.NewPanelHeight(newHeight) ) }
//  }
// }
//
// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//  let _higherOrderActions = {
//   GetNewPanelHeight: (newCursorY)=>{ let currentHeight = stateProps.AssetsUi.deployedPanel.panelHeight;
//                                      let currentCursorY = stateProps.AssetsUi.deployedPanel.currentCursorY;
//                                      let newHeight = currentHeight + (newCursorY - currentCursorY)
//                                      if(newHeight > 400) { dispatchProps.ApplyNewPanelHeight(newHeight) }
//                                      else { dispatchProps.ApplyNewPanelHeight(400) }
//                                      dispatchProps.NewCursorY(newCursorY)
//                                     }
//  }
//
//  return{
//   ...stateProps,
//   ...dispatchProps,
//   ..._higherOrderActions,
//   ...ownProps
//  }
//
// }
//
// const DeployedPage = connect(
//  mapStateToProps,
//  mapDispatchToProps,
//  mergeProps
// )(DeployedPageComponent)
//
// export {DeployedPage}
