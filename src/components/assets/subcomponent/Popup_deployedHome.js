import React from 'react'
import styles from './Popup_DeployedHome.css'

const Popup_DeployedHome = (props)=>{
 let { show , actions } = props
 return(
  <div className={ ( show? styles.screen : styles.screen + ' ' + styles.hide) }>
   <div className={styles.popup}>
    <div className={styles.contentHolder}>
     <div className={styles.row}>Agreement</div>
     <div className={styles.row}>Counterparty</div>
     <div className={styles.row}>Selected</div>
     <div className={styles.row}>Orginal</div>
     <div className={styles.row}>Amount</div>
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
