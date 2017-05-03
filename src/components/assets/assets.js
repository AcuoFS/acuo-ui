import React from 'react'
import styles from './Assets.css'
import AssetsDeployedComponent from './subcomponent/AssetsDeployed.js'
import AssetsHomeComponent from './subcomponent/AssetsHome.js'

const AssetsComponent = (props)=>{
   let DeployedPanel_ExpandedSideways = props.state.ui.DeployedPanel_ExpandedSideways;

    return(
      <div className={styles.assetsComponent}>

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
