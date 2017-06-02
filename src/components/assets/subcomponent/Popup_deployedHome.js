import React from 'react'
import styles from './Popup_DeployedHome.css'

const Popup_DeployedHome = (props)=>{
 let { show , actions , state } = props
 let droppedAsset = JSON.parse(state.data.Popup_DroppedHomeAssetDetails)
 console.log(droppedAsset);
 return(
  <div className={ ( show? styles.screen : styles.screen + ' ' + styles.hide) }>
   <div className={styles.popup}>
    <div className={styles.contentHolder}>
     <div className={styles.row}>
      <div><div>Agreement:</div></div>
      <div><div>Agreement</div></div>
     </div>
     <div className={styles.row}>
      <div><div>From:</div></div>
      <div><div>Legal Entity / Counterparty</div></div>
     </div>
     <div className={styles.row}>
      <div><div>Selected:</div></div>
      <div><div>Replacing Asset</div></div>
     </div>
     <div className={styles.row}>
      <div><div>To:</div></div>
      <div><div>Counterparty</div></div>
     </div>
     <div className={styles.row}>
      <div><div>Original:</div></div>
      <div><div>Asset To Be Replaced</div></div>
     </div>
     <div className={styles.row}>
      <div><div>Amount:</div></div>
      <div><div><input type="number" placeholder="Enter amount"></input></div></div>
     </div>
     <div className={ styles.buttonHolder }>
      <div className={ styles.cancelBtn }
           onClick={(show)=>{ actions.DeployedPanel_ShowPopup(!show) }}
       >Cancel</div>
      <div className={ styles.confirmBtn }>Confirm</div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Popup_DeployedHome
