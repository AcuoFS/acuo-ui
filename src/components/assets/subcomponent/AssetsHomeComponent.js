/* ReadMe

*/

import React from 'react'
import styles from './AssetsPanel.css'
import PanelWindow from './deployedViews/PanelWindow.js'
import AssetsHomeTableView from './deployedViews/TableView/AssetsHomeTableView.js'
/*Actions*/
import {AssetsPanel} from '../../../actions/AssetsActions.js'
//Mock Data
import { HomeTableStyle, HomePledgeContent, HomePledgeContentMin, HomePrincipalContent, HomePrincipalContentMin } from '../mockData/mockData.js'


const AssetsHomeComponent = (props)=>{
 let state = props.state
 let actions = props.actions; //console.log(actions);

 let ExpandedVertically = state.ui.HomePanel_ExpandedVertically; //console.log(ExpandedVertically);
 let AssetsDeployedPanelExpandedSideways = state.ui.DeployedPanel_ExpandedSideways;
 let IsPledgeSelected = state.ui.HomePanel_IsPledgeSelected; //console.log(IsPledgeSelected);

 let cellWidth = {
  expanded: [ 12, 11, 9, 14, 7, 11, 6, 6, 11, 10 ],
  minimized: [ 18, 23, 16, 29, 13 ]
 }

 let content = ()=>{ if(IsPledgeSelected) { return (AssetsDeployedPanelExpandedSideways? HomePledgeContentMin : HomePledgeContent) }
                     else { return (AssetsDeployedPanelExpandedSideways? HomePrincipalContentMin : HomePrincipalContent) }  }

   return(
     <div className={ ExpandedVertically? (styles.assetsPanelFrameExpanded) : (styles.assetsPanelFrame) }>
       <div  className={ styles.assetsPanelHeader} >
         <span  className={ styles.assetsPanelTitleText }> At Home </span>
         {
          <img className={styles.assetsPanelHeaderSideExpandBtn}
               src={(AssetsDeployedPanelExpandedSideways? "images/assets_deployed/minimize-sideways.svg" : "images/assets_deployed/expand-sideways.svg")}
               onClick={ ()=>{actions.DeployedPanel_ToggleSideExpand(!AssetsDeployedPanelExpandedSideways)} }/>
         }

       </div>
       <PanelWindow>
          {
             <AssetsHomeTableView state={ state }
                                  actions={ actions }
                                  Content={ content() }
                                  cellWidth = { cellWidth }
                                  TableStyle={ HomeTableStyle } />
           }

       </PanelWindow>
       <div className={styles.panelResizeHandle}
            onClick={ ()=>{actions.HomePanel_ToggleVerticalExpand(!ExpandedVertically)}} >
         &#9650;  &#9660;
       </div>

     </div>
   )
}

export default AssetsHomeComponent
