import React from 'react'
import { connect } from 'react-redux'
import styles from './AssetsPanel.css'
import _ from 'lodash'
/*Components*/
import PanelWindow from './deployedViews/PanelWindow.js'
import AssetsDeployedTableView from './deployedViews/TableView/AssetsDeployedTableView.js'
/*Actions*/
import {AssetsPanel} from './../../../actions/AssetsActions.js'
//Mock Data
import { categoryHeader, dataHeader_minView, dataHeader_expandedView, ApiInitMargResponse, ApiVarMargResponse, VarMarginTableStyle, VarMarginTableStyleExpanded, InitMarginTableStyle, InitMarginTableStyleExpanded } from "./../mockData/mockData.js"


//Helper Functions
const SearchContent = (rawAPI, testCase)=>{
 let toArray = obj => _.map( obj, ( val )=>{ return val } )

 let filteredList = _.reduce(rawAPI, ( acc, agreementObj )=>{
   /* Filtering through rest of the agreementObj's properties */

   let regionAgreementCounterparty = _.omit(_.clone(agreementObj), ['data', 'pledge', 'excess'])
   let otherAgreementProps = _.concat(toArray(regionAgreementCounterparty), toArray(agreementObj.pledge), toArray(agreementObj.excess))
   let matchingProps =  _.filter(otherAgreementProps, (prop)=>{
     let isAnyPropertyMatches = _.toUpper(String(prop)).match( new RegExp(_.toUpper(testCase.trim())))
     return (isAnyPropertyMatches? true : false)
   })

   /* Filtering out statements in agreementObj.data array. */
   let assetsArray = agreementObj.data;
   let filteredAgreementObject = _.filter(assetsArray, (assetsObj)=>{
     let isAnyPropertyMatches = false

       _.forOwn(assetsObj, (candidate)=>{
        isAnyPropertyMatches = _.toUpper(String(candidate)).match( new RegExp(_.toUpper(testCase.trim())))
        return !isAnyPropertyMatches

       })
     return isAnyPropertyMatches
   })

   /*
      IF match is found witin in statement data, return newly cloned agreeementObj only with statement arrays with matches
      Else, check if match is found in other properties
        IF found, return entire agreement object
        ELSE, return the existing accumulator array
   */

   if ( _.isEmpty(filteredAgreementObject) ) { return (_.isEmpty(matchingProps)? acc : _.concat( acc, agreementObj)) }
   else { let clone = _.clone(agreementObj)
          _.update( clone, 'data', ()=>filteredAgreementObject )
          return _.concat( acc, clone )   }

 }, [])

 return filteredList

}

const AssetsDeployedComponent = (props)=>{

   let state = props.state
   let actions = props.actions

   let ExpandedSideways = state.ui.DeployedPanel_ExpandedSideways;
   let ExpandedVertically = state.ui.DeployedPanel_ExpandedVertically;
   let IsRegionSelected = state.ui.IsRegionSelected;
   let IsVarMarginSelected = state.ui.IsVarMarginSelected;

   let dataHeader = (ExpandedSideways?  dataHeader_expandedView :  dataHeader_minView)
   let tableStyle = (IsVarMarginSelected? (ExpandedSideways? VarMarginTableStyleExpanded : VarMarginTableStyle) :  (ExpandedSideways? InitMarginTableStyleExpanded: InitMarginTableStyle))
   let cellWidth = (ExpandedSideways? { category: [26, 37, 37], data: [ 17, 10, 18, 18, 7, 7, 10, 13] } : { category: [26, 37, 37], data: [ 20, 16, 27, 27, 10] } )

   let rightContent = (IsVarMarginSelected? ApiVarMargResponse : ApiInitMargResponse)
   let sortedContent = (IsRegionSelected?  _.sortBy(rightContent, ["region"]) :  _.sortBy(rightContent, ["counterparty"]))

   let filteredContent = SearchContent(sortedContent, "")

   let tableContent = (rightContent)=>{
        if(ExpandedSideways){
          return _.map(rightContent, (row)=>{ return{ CategoryContent: [ row.region, row.agreement, row.counterparty ],
                                                       RowContent:  _.map( row.data , (block)=>{ return [ block.asset, block.quantity, block.adjValue, block.value, block.rating, block.haircut, block.maturityDate, block.isin ]}),
                                                       PledgeContent: ["Pledge", " ", row.pledge.adjValue, row.pledge.value, " ", " ", " ", " "],
                                                       ExcessContent: ["Excess", " ", row.excess.adjValue, row.excess.value, " ", " ", " ", " "]  }})
          }
         else {
           return _.map(rightContent, (row)=>{ return{ CategoryContent: [ row.region, row.agreement, row.counterparty ],
                                                        RowContent:  _.map( row.data , (block)=>{ return [ block.asset, block.quantity, block.adjValue, block.value, block.haircut ]}),
                                                        PledgeContent: ["Pledge", " ", row.pledge.adjValue, row.pledge.value, " "],
                                                        ExcessContent: ["Excess", " ", row.excess.adjValue, row.excess.value, " "] }})
         }
     }

   return(
     <div className={ ExpandedVertically? (styles.assetsPanelFrameExpandedVertically) : (styles.assetsPanelFrame) } >
        <div className={ styles.assetsPanelHeader} >
           <span className={ styles.assetsPanelTitleText }> Deployed </span>
           <input className={styles.assetsPanelHeaderInput}
                  type={"text"}
                  placeholder={"Search"}
                  onChange={(e)=>{console.log(e.target.value)}}/>
           <img className={styles.assetsPanelHeaderSideExpandBtn}
                src={(ExpandedSideways? "images/assets_deployed/expand-sideways.svg" : "images/assets_deployed/minimize-sideways.svg")}
                onClick={ ()=>{ actions.DeployedPanel_ToggleSideExpand(!ExpandedSideways) }} />
        </div>
        <PanelWindow>
          <AssetsDeployedTableView state={ state }
                                   actions = { actions }
                                   categoryHeader={ categoryHeader }
                                   dataHeader={ dataHeader }
                                   tableContent={ tableContent(filteredContent) }
                                   cellWidth = { cellWidth }
                                   tableStyle={ tableStyle }/>
        </PanelWindow>
        <div className={styles.panelResizeHandle}
             onClick={ ()=>{actions.DeployedPanel_ToggleVerticalExpand(!ExpandedVertically)}} >
          &#9650;  &#9660;
        </div>
     </div>
   )

}

export default AssetsDeployedComponent
