import React from 'react';
import styles from './AssetsPanel.css'
import PanelWindow from './deployedViews/PanelWindow.js'
import AssetsHomeTableView from './deployedViews/TableView/AssetsHomeTableView.js'

export default class AssetsHomeComponent extends React.Component {
   componentDidMount(){
   }

   render(){
     return(
       <div className={ styles.assetsPanelFrame } >
         <div  className={ styles.assetsPanelHeader} >
           <span  className={ styles.assetsPanelTitleText }> At Home </span>
           <img className={styles.assetsPanelHeaderSideExpandBtn}
                src="images/assets_deployed/minimize-sideways.svg"
                onClick={ ()=>{ console.log(this.state) }}/>
         </div>
         
         <PanelWindow>
           <AssetsHomeTableView />
         </PanelWindow>

       </div>
     )
   }
}
