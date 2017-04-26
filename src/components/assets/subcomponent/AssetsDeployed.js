import React from 'react'
import { connect } from "react-redux"
import styles from './AssetsPanel.css'
import _ from 'lodash'
/*Components*/
import PanelWindow from './deployedViews/PanelWindow.js'
import AssetsDeployedTableView from './deployedViews/TableView/AssetsDeployedTableView.js'
/*Actions*/
import {AssetsPanel} from '../../../actions/AssetsActions.js'
//Mock Data
import { categoryHeader, dataHeader_minView, dataHeader_expandedView, VarMarginApiResponse, VarMarginApiResponse_Expanded, InitMarginApiResponse, InitMarginApiResponse_Expanded, VarMarginTableStyle, InitMarginTableStyle } from "../mockData/mockData.js"

class AssetsDeployedComponent extends React.Component {
  constructor(props){
    super(props)
    this.state={ ExpandVertical: false}
  }

  componentDidMount(){}

  componentDidUpdate(){}

   render(){
     let state = this.props.state
     let IsDeployedPanelExpandedSideways = state.ui.IsDeployedPanelExpandedSideways;
     let IsVarMarginSelected = this.props.state.ui.IsVarMarginSelected;
     let dataHeader = (IsDeployedPanelExpandedSideways?  dataHeader_expandedView :  dataHeader_minView)
     let tableStyle = (IsVarMarginSelected? VarMarginTableStyle :  InitMarginTableStyle)
     let content = ()=>{
      if (IsVarMarginSelected){
        if (IsDeployedPanelExpandedSideways){return VarMarginApiResponse_Expanded}
        else {return VarMarginApiResponse}
      }
      else{
       if(IsDeployedPanelExpandedSideways) {return InitMarginApiResponse_Expanded}
       else {return InitMarginApiResponse}
      }
     }
     // console.log( "IsDeployedPanelExpandedSideways : " + IsDeployedPanelExpandedSideways );
     // console.log( "IsVarMarginSelected : " + IsVarMarginSelected );


     return(
       <div className={ this.state.ExpandVertical? (styles.assetsPanelFrameExpanded) : (styles.assetsPanelFrame) }
            ref={ (node)=> this.deployedFrame = node}  >
          <div className={ styles.assetsPanelHeader} >
             <span className={ styles.assetsPanelTitleText }> Deployed </span>
             <input className={styles.assetsPanelHeaderInput} type={"text"} placeholder={"Dummy Input Field"}/>
             <img className={styles.assetsPanelHeaderSideExpandBtn}
                  src="images/assets_deployed/expand-sideways.svg"
                  onClick={ ()=>{ this.props.DeployedViewToggleSideExpand(!state.ui.IsDeployedPanelExpandedSideways) }} />
          </div>
          <PanelWindow>
            <AssetsDeployedTableView state={ state }
                                     categoryHeader={ categoryHeader }
                                     dataHeader={ dataHeader }
                                     tableContent={ content() }
                                     tableStyle={ tableStyle }/>
          </PanelWindow>
          <div className={styles.panelResizeHandle}
               onClick={ ()=>{ this.setState( (prevState)=> ({ExpandVertical: !this.state.ExpandVertical}) ) }} >
            &#9650;  &#9660;
          </div>
       </div>
     )
   }
}

//--------------------------------------AssetsDeployedContainer------------------------------------------
const mapStateToProps = (stateProps, ownProps)=>{
 return{
  state: stateProps.AssetsReducer
 }
}
const mapDispatchToProps = (dispatch, ownProps)=>{
 return{
   DeployedViewToggleSideExpand: (isExpanded)=>{dispatch(AssetsPanel.DeployedViewToggleSideExpand(isExpanded))}
 }
}

const AssetsDeployedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetsDeployedComponent)
export default AssetsDeployedContainer






//----- Older Code

// Render() Code for resizable panels using mouse drag (buggy!!!)
//
// render(){
//  let resizeHandleActive = this.props.ui.deployedPanel.resizeHandleActive
//  let isMouseDown = this.props.ui.deployedPanel.resizeHandleMouseDown
//   return(
//   <div className={ styles.assetsPanelFrame }
//        ref={ (node)=> this.deployedFrame = node}
//        onMouseUp={ (e)=>{e.stopPropagation(); if(isMouseDown){ this.props.dispatch.MouseDownOnResize(false) } }}
//        onMouseMove={ (e)=>{e.stopPropagation(); if(resizeHandleActive || isMouseDown) { this.props.dispatch.GetNewPanelHeight(e.clientY) }}}
//         >
//      <div  className={ styles.assetsPanelTitle} > <span className={ styles.assetsPanelTitleText }> Deployed </span> </div>
//      <PanelWindow />
//      <div className={styles.panelResizeHandle}
//           onMouseDown={ (e)=>{ if(!resizeHandleActive) {
//                                  this.props.dispatch.ResizeToggle(true)
//                                  this.props.dispatch.MouseDownOnResize(true)
//                                  this.props.dispatch.NewCursorY(e.clientY) } }}
//           onMouseUp={ (e)=>{e.stopPropagation(); if(resizeHandleActive) { this.props.dispatch.MouseDownOnResize(false) } }}
//           onMouseLeave={ ()=>{ if(resizeHandleActive) { this.props.dispatch.ResizeToggle(false) } } }
//           onMouseMove={ (e)=>{e.stopPropagation(); if(resizeHandleActive || isMouseDown) { this.props.dispatch.GetNewPanelHeight(e.clientY) }}}
//            >
//        ooo
//      </div>
//   </div>
//   )
// }
