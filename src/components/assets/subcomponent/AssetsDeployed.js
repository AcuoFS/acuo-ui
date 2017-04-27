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

class AssetsDeployedComponent extends React.Component {
  constructor(props){
    super(props)
    this.state={ ExpandVertical: false}
  }

  componentDidMount(){}

  componentDidUpdate(){}

  sortContent = ()=>{console.log("hello")}

   render(){
     let state = this.props.state
     let IsDeployedPanelExpandedSideways = state.ui.IsDeployedPanelExpandedSideways;
     let IsRegionSelected = state.ui.IsRegionSelected;
     let IsVarMarginSelected = this.props.state.ui.IsVarMarginSelected;
     let dataHeader = (IsDeployedPanelExpandedSideways?  dataHeader_expandedView :  dataHeader_minView)
     let tableStyle = (IsVarMarginSelected? VarMarginTableStyle :  InitMarginTableStyle)
     let sortedContent = IsRegionSelected?  _.sortBy(ApiVarMarginResponse, ["region"]) :  _.sortBy(ApiVarMarginResponse, ["counterparty"])
     let content = (sortedContent)=>{
       if(!IsDeployedPanelExpandedSideways){
        return sortedContent.map((row)=>{
                       return{
                        CategoryContent: [ row.region, row.agreement, row.counterparty ],
                        RowContent:  row.data.map((block)=>{
                          return [ block.asset, block.quantity, block.adjValue, block.value, block.haircut ]
                        }),
                        PledgeContent: ["Pledge", " ", row.pledge.adjValue, row.pledge.value, " "],
                        ExcessContent: ["Excess", " ", row.excess.adjValue, row.excess.value, " "]
                       }
                      })
       }
       else {
        return sortedContent.map((row)=>{
                  return{
                   CategoryContent: [ row.region, row.agreement, row.counterparty ],
                   RowContent:  row.data.map((block)=>{
                     return [ block.asset, block.quantity, block.adjValue, block.value, block.rating, block.haircut, block.maturityDate, block.isin ]
                   }),
                   PledgeContent: ["Pledge", " ", row.pledge.adjValue, row.pledge.value, " ", " ", " ", " "],
                   ExcessContent: ["Excess", " ", row.excess.adjValue, row.excess.value, " ", " ", " ", " "]
                  }
                 })
       }
     }

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
           {console.log(content)}
            <AssetsDeployedTableView state={ state }
                                     categoryHeader={ categoryHeader }
                                     dataHeader={ dataHeader }
                                     tableContent={ content(sortedContent) }
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
