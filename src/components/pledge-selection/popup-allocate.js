import React from 'react'
import styles from './popup-allocate.css'


export default class AllocatePopup extends React.Component{

 render(){
  console.log("existingAsset", this.props.existingAsset)
  console.log("allocatedAsset", this.props.allocatedAsset)
  return(
      <div className={styles.screen}>
       <div className={styles.popup}>
        <div className={styles.closePopup}>
         <span onClick={ ()=>this.props.popupUnmount() }>X</span>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Original Asset</div>
          <div className={styles.systemPopulated}>{(this.props.existingAsset? this.props.existingAsset.assetName : "N.A.")}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>New Asset</div>
          <div className={styles.systemPopulated}>{this.props.allocatedAsset.propAsset}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Margin Agreement</div>
          <div className={styles.systemPopulated}>{this.props.agreementName}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Margin Type</div>
          <div className={styles.systemPopulated}>{this.props.marginType} </div>
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
