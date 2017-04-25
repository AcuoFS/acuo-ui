import React from 'react';
import styles from './Assets.css'
import AssetsDeployedContainer from './subcomponent/AssetsDeployed.js'
import AssetsHomeComponent from './subcomponent/AssetsHome.js'

export default class AssetsComponent extends React.Component {
  constructor(props){
   super(props)
  }
  componentDidMount(){
  }

  render(){
   let IsDeployedPanelExpandedSideways = this.props.state.ui.IsDeployedPanelExpandedSideways
    return(
      <div className={styles.assetsComponent}>

        <div className={IsDeployedPanelExpandedSideways? styles.assetsPanelDeployed : styles.assetsPanels}>
          <AssetsDeployedContainer />
        </div>

        <div className={IsDeployedPanelExpandedSideways? styles.assetsPanelHome : styles.assetsPanels}>
          <AssetsHomeComponent/>
        </div>

      </div>
    )
  }
}




//   render(){
//     return(
//       <div className={styles.assetsComponent}>
//
//         <div className={styles.assetsPanels + " " + styles.assetsPanelDeployed}>
//           <AssetsDeployedComponent ui={this.props.AssetsUi} data={this.props.AssetsData} dispatch={this.props.Dispatch}  />
//         </div>
//
//         <div className={styles.assetsPanels + " " + styles.assetsPanelHome}>
//           <AssetsHomeComponent/>
//         </div>
//
//       </div>
//     )
//   }
// }
