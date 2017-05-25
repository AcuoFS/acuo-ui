import React from 'react'
import styles from './popup-allocate.css'


export default class AllocatePopup extends React.Component{

 displayMarginType = ( input )=>{
  switch(input){
   case "variationMargin":
     return "Variation"
   case "initialMargin":
     return "Initial"
   case "credit":
     return 'Credit'
   case "netted":
     return 'Netted'
   default:
     return "Error: No Margin Type Detected"
  }
 }// end displayMarginType()

 render(){
  return(
      <div className={styles.screen}>
       <div className={styles.popup}>
        <div className={styles.closePopup}>
         <span onClick={ ()=>this.props.popupUnmount() }>X</span>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Original Asset</div>
          <div>{(this.props.existingAsset? this.props.existingAsset.assetName : "Unallocated")}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>New Asset</div>
          <div>{this.props.allocatedAsset.propAsset}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Margin Agreement</div>
          <div>{this.props.agreementName}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Margin Type</div>
          <div>{this.displayMarginType(this.props.marginType)} </div>
        </div>

        <div className={styles.row}>
         <div className={styles.label}>Amount</div>
          <input type="text"
                 placeholder="Enter Amount"
                 className={styles.userInput}  />
        </div>

        <div className={styles.lastRow}>
          <div className={styles.allocateBtn} title="Functionality Under Construction...">Allocate</div>
        </div>
       </div>
      </div>
  )
 }

}
