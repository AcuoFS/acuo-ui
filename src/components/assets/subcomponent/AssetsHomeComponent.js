/* ReadMe

*/

import React from 'react'
import styles from './AssetsPanel.css'
import PanelWindow from './deployedViews/PanelWindow.js'
import AssetsHomeTableView from './deployedViews/TableView/AssetsHomeTableView.js'
/*Actions*/
import {AssetsPanel} from '../../../actions/AssetsActions.js'
//Mock Data
import { HomeTableStyle, HomeContent, HomeContentMin } from '../mockData/mockData.js'


const AssetsHomeComponent = (props)=>{
 let state = props.state
 let actions = props.actions
 let AssetsDeployedPanelExpandedSideways = state.ui.DeployedPanel_ExpandedSideways;
 console.log(AssetsDeployedPanelExpandedSideways);

   return(
     <div className={ styles.assetsPanelFrame } >
       <div  className={ styles.assetsPanelHeader} >
         <span  className={ styles.assetsPanelTitleText }> At Home </span>
         <img className={styles.assetsPanelHeaderSideExpandBtn}
              src="images/assets_deployed/minimize-sideways.svg"
              onClick={ ()=>{actions.DeployedPanel_ToggleSideExpand(!ExpandedSideways)} }/>
       </div>
       <PanelWindow>
          {
             <AssetsHomeTableView state={ state }
                                  actions = { actions }
                                  Content = { (AssetsDeployedPanelExpandedSideways? HomeContentMin : HomeContent ) }
                                  TableStyle={ HomeTableStyle } />
           }

       </PanelWindow>
       <div className={styles.panelResizeHandle}
            onClick={ ()=>{actions.DeployedPanel_ToggleVerticalExpand(!ExpandedVertically)}} >
         &#9650;  &#9660;
       </div>

     </div>
   )
}

export default AssetsHomeComponent
