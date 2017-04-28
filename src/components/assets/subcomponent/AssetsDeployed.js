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
import { categoryHeader, dataHeader_minView, dataHeader_expandedView, ApiVarMarginResponse, VarMarginTableStyle, InitMarginTableStyle } from "../mockData/mockData.js"

export default class AssetsDeployedContainer extends React.Component {
  constructor(props){
    super(props)
  }

   render(){
    // console.log("@---AssetsDeployedComponent");
    // console.log(this.props);
     let state = this.props.state
     let ExpandedSideways = state.ui.DeployedPanel_ExpandedSideways;
     let ExpandedVertically = state.ui.DeployedPanel_ExpandedVertically;
     let IsRegionSelected = state.ui.IsRegionSelected;
     let IsVarMarginSelected = state.ui.IsVarMarginSelected;
     let dataHeader = (ExpandedSideways?  dataHeader_expandedView :  dataHeader_minView)
     let tableStyle = (IsVarMarginSelected? VarMarginTableStyle :  InitMarginTableStyle)
     let sortedContent = IsRegionSelected?  _.sortBy(ApiVarMarginResponse, ["region"]) :  _.sortBy(ApiVarMarginResponse, ["counterparty"])
     let content = (sortedContent)=>{
       if(!ExpandedSideways){
        return _.map(sortedContent, (row)=>{
                       return{
                        CategoryContent: [ row.region, row.agreement, row.counterparty ],
                        RowContent:  _.map(row.data ,(block)=>{
                          return [ block.asset, block.quantity, block.adjValue, block.value, block.haircut ]
                        }),
                        PledgeContent: ["Pledge", " ", row.pledge.adjValue, row.pledge.value, " "],
                        ExcessContent: ["Excess", " ", row.excess.adjValue, row.excess.value, " "]
                       }
                      })
       }
       else {
        return _.map(sortedContent, (row)=>{
                  return{
                   CategoryContent: [ row.region, row.agreement, row.counterparty ],
                   RowContent:  _.map(row.data ,(block)=>{
                     return [ block.asset, block.quantity, block.adjValue, block.value, block.rating, block.haircut, block.maturityDate, block.isin ]
                   }),
                   PledgeContent: ["Pledge", " ", row.pledge.adjValue, row.pledge.value, " ", " ", " ", " "],
                   ExcessContent: ["Excess", " ", row.excess.adjValue, row.excess.value, " ", " ", " ", " "]
                  }
                 })
       }
     }

     return(
       <div className={ ExpandedVertically? (styles.assetsPanelFrameExpanded) : (styles.assetsPanelFrame) }
            ref={ (node)=> this.deployedFrame = node}  >
          <div className={ styles.assetsPanelHeader} >
             <span className={ styles.assetsPanelTitleText }> Deployed </span>
             <input className={styles.assetsPanelHeaderInput} type={"text"} placeholder={"Dummy Input Field"}/>
             <img className={styles.assetsPanelHeaderSideExpandBtn}
                  src="images/assets_deployed/expand-sideways.svg"
                  onClick={ ()=>{ this.props.actions.DeployedPanel_ToggleSideExpand(!ExpandedSideways) }} />
          </div>
          <PanelWindow>
            <AssetsDeployedTableView state={ state }
                                     categoryHeader={ categoryHeader }
                                     dataHeader={ dataHeader }
                                     tableContent={ content(sortedContent) }
                                     tableStyle={ tableStyle }/>
          </PanelWindow>
          <div className={styles.panelResizeHandle}
               onClick={ ()=>{this.props.actions.DeployedPanel_ToggleVerticalExpand(!ExpandedVertically)}} >
            &#9650;  &#9660;
          </div>
       </div>
     )
   }
}

//--------------------------------------AssetsDeployedContainer------------------------------------------
// const mapStateToProps = (stateProps, ownProps)=>{
//  return{
//   state: stateProps.AssetsReducer
//  }
// }
// const mapDispatchToProps = (dispatch, ownProps)=>{
//  return{
//    DeployedPanel_ToggleSideExpand: (isExpanded)=>{dispatch(AssetsPanel.DeployedPanel_ToggleSideExpand(isExpanded))}
//  }
// }
//
// const AssetsDeployedContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AssetsDeployedComponent)
// export default AssetsDeployedContainer
