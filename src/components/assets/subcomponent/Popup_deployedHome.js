import React from 'react'
import styles from './Popup_DeployedHome.css'

const Popup_DeployedHome = (props)=>{
 let { show , actions , state } = props
 let droppedAsset = JSON.parse(state.data.Popup_DroppedHomeAssetDetails)
 let fromWho = function(show){if(show){ return ( droppedAsset.counterparty ? droppedAsset.counterparty : droppedAsset.legalEntity) }}(show)
 let fromAsset = function(show){if(show){ return droppedAsset.asset }}(show)
 let originalAgreement = function(show){if(show){return state.data.Popup_DeployedAssetToBeReplaced}}(show)
 let selectedCounterparty = function(show , originalAgreement){ if(show){ return originalAgreement.agreementObjectSelected.counterparty } }(show, originalAgreement)
 let agreementName = function(show){if(show){return originalAgreement.agreementObjectSelected.agreement} }(show)
 let originalAssetName = function(show, originalAgreement){if(show){
   let agreementObj = _.clone(originalAgreement)
   let originalAsset = _.find(agreementObj.agreementObjectSelected.data, (a)=>{return a.id===agreementObj.assetID})
   return originalAsset.asset
 }}(show, originalAgreement)

 return(
  <div className={ ( show? styles.screen : styles.screen + ' ' + styles.hide) }>
   <div className={styles.popup}>
    <div className={styles.contentHolder}>
     <div className={styles.row}>
      <div><div>Agreement:</div></div>
      <div><div>{ agreementName }</div></div>
     </div>
     <div className={styles.row}>
      <div><div>From:</div></div>
      <div><div>{ fromWho  }</div></div>
     </div>
     <div className={styles.row}>
      <div><div>Selected:</div></div>
      <div><div>{ fromAsset }</div></div>
     </div>
     <div className={styles.row}>
      <div><div>To:</div></div>
      <div><div>{ selectedCounterparty }</div></div>
     </div>
     <div className={styles.row}>
      <div><div>Original:</div></div>
      <div><div>{ originalAssetName }</div></div>
     </div>
     <div className={styles.row}>
      <div><div>Amount:</div></div>
      <div><div><input type="number" placeholder="Enter amount"></input></div></div>
     </div>
     <div className={ styles.buttonHolder }>
      <div className={ styles.cancelBtn }
           onClick={(show)=>{ actions.ShowPopup(!show)
                              actions.Popup_DroppedHomeAssetInfo(JSON.stringify(null))
                              actions.Popup_DeployedAssetToBeReplaced(null)
                              actions.Popup_DraggingHomeAssetID(null)
           }}
       >Cancel</div>
      <div className={ styles.confirmBtn }>Confirm</div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Popup_DeployedHome
