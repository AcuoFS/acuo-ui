import React from 'react';
import { connect } from "react-redux"
import styles from './AssetsPanel.css'
import PanelWindow from './deployedViews/PanelWindow.js'
import AssetsHomeTableView from './deployedViews/TableView/AssetsHomeTableView.js'
/*Actions*/
import {AssetsPanel} from '../../../actions/AssetsActions.js'
//Mock Data
import { VarMarginTableStyle, InitMarginTableStyle } from "../mockData/mockData.js"


const AssetsHome = ()=>{

   return(
     <div className={ styles.assetsPanelFrame } >
       <div  className={ styles.assetsPanelHeader} >
         <span  className={ styles.assetsPanelTitleText }> At Home </span>
         <img className={styles.assetsPanelHeaderSideExpandBtn}
              src="images/assets_deployed/minimize-sideways.svg"
              onClick={ ()=>{}}/>
       </div>

       <PanelWindow>
         <AssetsHomeTableView />
       </PanelWindow>

     </div>
   )
}
/*----------------------------------------------------------------------------*/
const AssetsHomeComponent = connect(
 mapDispatchToProps
)(AssetsHome)

export default AssetsHomeComponent
