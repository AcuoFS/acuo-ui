import React from 'react'
import styles from './Popup_deployedHome.css'

const Popup_DeployedHome = (props)=>{
 let { show , actions , state } = props

 let droppedLoad = JSON.parse(state.data.Popup_DroppedAsset)
 let fromWidget = droppedLoad.widget
 let formPopupObject = (state, droppedLoad)=>{
  let buildFor ={
    HomeToDeployed: (state, droppedLoad)=>{
       let selectedDeployedAgreement = state.data.Popup_AssetToBeReplaced;
       let selectedDeployedAsset = ((show, selectedDeployedAgreement)=>{if(show){ let agreementObj = _.clone(selectedDeployedAgreement)
                                                                         let selectedAsset = _.find(agreementObj.SelectedDeployedAgreement.data, (a)=>{return a.id===agreementObj.assetID})
                                                                         return selectedAsset
                                                                       }})(show, selectedDeployedAgreement)

       return { fromWho: ( droppedLoad.asset ? droppedLoad.asset.counterparty : droppedLoad.asset.legalEntity),
                fromAsset: droppedLoad.asset.asset,
                toCounterparty: selectedDeployedAgreement.SelectedDeployedAgreement.counterparty,
                toAgreement: selectedDeployedAgreement.SelectedDeployedAgreement.agreement,
                toAsset: selectedDeployedAsset.asset,
                haircut: selectedDeployedAsset.haircut,
               }}, //end-HomeToDeployed()
    DeployedToHome: (state, droppedLoad)=>{
       let { agreement , asset } = droppedLoad
       let { assetCategory, SelectedHomeAsset } = state.data.Popup_AssetToBeReplaced

       return { fromAgreement: agreement.agreement,
                fromCounterparty: agreement.counterparty,
                fromAsset: asset.asset,
                fromAdjAmount: asset.adjValue,
                fromHaircut: asset.haircut,
                toCounterparty: ( assetCategory==="pledged" ? SelectedHomeAsset.counterparty : SelectedHomeAsset.legalEntity ),
                toAsset: SelectedHomeAsset.asset,
               }
     }, //end-DeployedToHome()
   }//{ buildFor }

  switch(droppedLoad.widget){
    case 'home':
      return buildFor.HomeToDeployed(state, droppedLoad)
    case 'deployed':
      return buildFor.DeployedToHome(state, droppedLoad)
    default:
      console.error(`Application Error! Source widget is unspecified!`)
      alert(`Application Error! Source widget is unspecified!`)
      break
   }

 }//end-formPopupObject()

 let PopupObject = formPopupObject(state, droppedLoad)
 let Render_HomeToDepoyedPopup = (PopupObject)=>{
  return(
   <div className={ ( show? styles.screen : styles.screen + ' ' + styles.hide) }>
    <div className={styles.popup}>
     <div className={styles.contentHolder}>
      <div className={styles.agreement} >
       Agreement: { PopupObject.toAgreement }
      </div>

      <div className={ styles.col_2 }>
       <div><div>From:</div></div>
       <div><div>{ PopupObject.fromWho }</div></div>
       <div><div>To:</div></div>
       <div><div>{ PopupObject.toCounterparty }</div></div>
      </div>
      <div className={ styles.col_2 }>
       <div><div>Selected:</div></div>
       <div><div>{ PopupObject.fromAsset }</div></div>
       <div><div>Original:</div></div>
       <div><div>{ PopupObject.toAsset }</div></div>
      </div>
      <div className={styles.col_2}>
       <div><div>Haircut:</div></div>
       <div><div>{PopupObject.haircut}</div></div>
       <div><div>FX:</div></div>
       <div><div>1.00</div></div>
      </div>

      <div className={styles.row + ' ' + styles.topRow}>
       <div>Amount (USD):</div>
       <input className={styles.amtInput}
        type="number"
        placeholder="Enter Amount"
        onChange={  (e)=>{actions.Popup_Amount(e.currentTarget.value)} }
        value={ (typeof state.ui.Popup_Amount=="number")? parseFloat(state.ui.Popup_Amount) : undefined }
        />
      </div>
      <div className={styles.row}>
       <div>Adj. Amount (USD):</div>
       <input className={styles.amtInput}
        type="number"
        placeholder="Enter Adj. Amount"
        />
      </div>
      <div className={ styles.buttonHolder }>
       <div className={ styles.cancelBtn }
            onClick={(show)=>{ actions.ShowPopup(!show)
                               actions.Popup_Update_DroppedAsset(undefined)
                               actions.Popup_Update_AssetToBeReplaced(undefined)
                               actions.Popup_Amount(undefined)
            }} >
         Cancel
       </div>
       <div className={ styles.confirmBtn }>Confirm</div>
      </div>
     </div>
    </div>
   </div>
   )
 }
 let Render_DeployedToHomePopup = (PopupObject)=>{
  return(
   <div className={ ( show? styles.screen : styles.screen + ' ' + styles.hide) }>
    <div className={styles.popup}>
     <div className={styles.contentHolder}>
      <div className={styles.agreement} >
       Agreement: { PopupObject.fromAgreement }
      </div>

      <div className={ styles.col_2 }>
       <div><div>From:</div></div>
       <div><div>{ PopupObject.fromCounterparty  }</div></div>
       <div><div>To:</div></div>
       <div><div>{ PopupObject.toCounterparty }</div></div>
      </div>
      <div className={ styles.col_2 }>
       <div><div>Selected:</div></div>
       <div><div>{ PopupObject.fromAsset }</div></div>
       <div><div>Original:</div></div>
       <div><div>{ PopupObject.toAsset }</div></div>
      </div>
      <div className={styles.col_2}>
       <div><div>Haircut:</div></div>
       <div><div>{PopupObject.fromHaircut}</div></div>
       <div><div>FX:</div></div>
       <div><div>1.00</div></div>
      </div>

      <div className={styles.row + ' ' + styles.topRow}>
       <div>Amount (USD):</div>
       <input className={styles.amtInput}
        type="number"
        placeholder="Enter Amount"
        onChange={  (e)=>{actions.Popup_Amount(e.currentTarget.value)} }
        value={ (typeof state.ui.Popup_Amount=="number")? parseFloat(state.ui.Popup_Amount) : undefined }
        />
      </div>
      <div className={styles.row}>
       <div>Adj. Amount (USD):</div>
       <input className={styles.amtInput}
        type="number"
        placeholder="Enter Adj. Amount"
        />
      </div>
      <div className={ styles.buttonHolder }>
       <div className={ styles.cancelBtn }
            onClick={(show)=>{ actions.ShowPopup(!show)
                               actions.Popup_Update_DroppedAsset(undefined)
                               actions.Popup_Update_AssetToBeReplaced(undefined)
                               actions.Popup_Amount(undefined)
            }} >
         Cancel
       </div>
       <div className={ styles.confirmBtn }>Confirm</div>
      </div>
     </div>
    </div>
   </div>
   )
 }

 return ( fromWidget==="home" ?
          Render_HomeToDepoyedPopup(PopupObject) :
          Render_DeployedToHomePopup(PopupObject)   )

}//end of Component: Popup_DeployedHome()

export default Popup_DeployedHome


/*
#Possible Improvements

* Render functions for popup are seperated for the time being for easy debugging.
  Refactoring can be done (eg combining render function into one) once there's
  more clarity to the responsibility of each popup.

* The block of fields (className={styles.col_2}) are now nested in divs. It is possible to
  reduce the nested-ness.

*/
