import React from 'react';
import styles from './AssetsPanel.css'

export default class AssetsHomeComponent extends React.Component {
   componentDidMount(){
   }

   render(){
     return(
       <div className={ styles.assetsPanelFrame } >
         <div  className={ styles.assetsPanelHeader} >
          <span  className={ styles.assetsPanelTitleText }> At Home </span>
         </div>
       </div>
     )
   }
}
