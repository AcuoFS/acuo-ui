import React from 'react'
import styles from './Assets.css'
import AssetsDeployedComponent from './subcomponent/AssetsDeployedComponent.js'
import AssetsHomeComponent from './subcomponent/AssetsHomeComponent.js'
import Popup_DeployedHome from './subcomponent/Popup_deployedHome.js'

const AssetsComponent = (props)=>{
   let DeployedPanel_ExpandedSideways = props.state.ui.DeployedPanel_ExpandedSideways;

    return(
      <div className={styles.assetsComponent}>

       <Popup_DeployedHome show={props.state.ui.showPopup} state={ props.state } actions={props.actions}/>

        <div className={DeployedPanel_ExpandedSideways? styles.assetsPanelDeployed : styles.assetsPanels}>
          <AssetsDeployedComponent state={props.state} actions={props.actions} />
        </div>

        <div className={DeployedPanel_ExpandedSideways? styles.assetsPanelHome : styles.assetsPanels}>
          <AssetsHomeComponent state={props.state} actions={props.actions} />
        </div>

      </div>
    )
}

export default AssetsComponent
