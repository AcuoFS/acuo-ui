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

/* Search Functions */
let SearchContent =(rawAPI, searchedText) => {
  /************** Helper Functions **************/
  let pipe = (thread, init)=> _.reduce( thread , (acc, fn)=>(fn(acc)), init)
  let toArray = (obj) => _.map( obj , val => val  )
  let util = {
    checkAssets: ( agreementObj )=>{

      let assetsWithMatches = _.reduce( agreementObj.data, ( results, assetObj )=>{
        let findMatch = _.find( toArray(assetObj) , (prop)=>{
          let testMatch = (_.toUpper(prop).trim()).match( new RegExp(_.toUpper(searchedText).trim()) ); // console.log(_.toUpper(prop).trim(), " | " , new RegExp( _.toUpper(searchedText).trim()) , " == " , testMatch);
          return (testMatch ? true : false)
        })// end _.find()
       return ( findMatch? _.concat(results, assetObj) : results )
      }, [] )

      return { agreementObj, assetsWithMatches }
    },

    rebuildAgreementWithMatchResults:  ( currentAgreement )=>{
      if(!_.isEmpty(currentAgreement.assetsWithMatches)){
       let clone = _.omit(_.clone(currentAgreement.agreementObj), ['data'])
       clone.data = currentAgreement.assetsWithMatches
       return clone
      }
      else {
       return false
      }
    },

    checkRegAgrCpty: (agreementObj)=>{
      let RegAgrCpty = toArray(_.omit(_.clone(agreementObj), ['data', 'pledge', 'excess']))
      let findIn_RegAgrCpty = _.find( RegAgrCpty, ( cat )=>{
       let testMatch = (_.toUpper(cat).trim()).match( new RegExp(_.toUpper(searchedText).trim()) );  //console.log(_.toUpper(cat).trim(), " | " , new RegExp( _.toUpper(searchedText).trim()) , " == " , testMatch);
       return (testMatch ?  true : false)
      })
      return (findIn_RegAgrCpty? agreementObj : false );
    }
  }
  /*********************************************/
  if (searchedText.length > 0){
    return _.reduce( rawAPI,
                     (accumulatedResults, agreementObj , id)=>{

                      /* (1) In each agreement object, search within the {data} and return assetsObj that contains matching assetsProp */
                      let sequence = [ util.checkAssets, util.rebuildAgreementWithMatchResults ]
                      let searchInAssets = pipe(sequence, agreementObj)

                      /* (2) Search within Region, Agreement */
                      let searchRegAgrCpty = util.checkRegAgrCpty(agreementObj)

                      /* (3) Conditional Returns
                               if (1) return,
                               else
                               if (2) return,
                               else return original */
                      if(searchInAssets) return _.concat(accumulatedResults, searchInAssets)
                      else { if(searchRegAgrCpty) return _.concat(accumulatedResults, searchRegAgrCpty)
                             else return accumulatedResults  }

                     },
                     [] )
  }
  else return rawAPI
}
/***************************************************************/

const AssetsDeployedComponent = (props)=>{

   let state = props.state
   let actions = props.actions;

   let ExpandedSideways = state.ui.DeployedPanel_ExpandedSideways;
   let ExpandedVertically = state.ui.DeployedPanel_ExpandedVertically;
   let IsRegionSelected = state.ui.IsRegionSelected;
   let IsVarMarginSelected = state.ui.IsVarMarginSelected;
   let SearchText = (state.ui.DeployedPanel_SearchText.length >= 2 ? state.ui.DeployedPanel_SearchText : "") ;
     // console.log( "SearchText|-> " ,SearchText);

   let dataHeader = (ExpandedSideways?  dataHeader_expandedView :  dataHeader_minView)
   let tableStyle = (IsVarMarginSelected? (ExpandedSideways? VarMarginTableStyleExpanded : VarMarginTableStyle) :  (ExpandedSideways? InitMarginTableStyleExpanded: InitMarginTableStyle))
   let cellWidth = (ExpandedSideways? { category: [26, 37, 37], data: [ 17, 10, 18, 18, 7, 7, 10, 13] } : { category: [26, 37, 37], data: [ 20, 16, 27, 27, 10] } )

   let rightContent = (IsVarMarginSelected? ApiVarMargResponse : ApiInitMargResponse)
   let sortedContent = (IsRegionSelected?  _.sortBy(rightContent, ["region"]) :  _.sortBy(rightContent, ["counterparty"]))

   let filteredContent = SearchContent(sortedContent, SearchText)

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
                  onChange={(e)=>{actions.DeployedPanel_SearchText(e.target.value)}}/>
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
