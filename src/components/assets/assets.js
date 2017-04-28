import React from 'react';
import styles from './Assets.css'
import AssetsDeployedComponent from './subcomponent/AssetsDeployed.js'
import AssetsHomeComponent from './subcomponent/AssetsHome.js'

export default class AssetsComponent extends React.Component {
  constructor(props){
   super(props)
  }
  componentDidMount(){
  }

  render(){
   // console.log("@----AssetsContainer:");
   // console.log(this.props);
   let DeployedPanel_ExpandedSideways = this.props.state.ui.DeployedPanel_ExpandedSideways;
    return(
      <div className={styles.assetsComponent}>

        <div className={DeployedPanel_ExpandedSideways? styles.assetsPanelDeployed : styles.assetsPanels}>
          <AssetsDeployedComponent state={this.props.state} actions={this.props.actions} />
        </div>

        <div className={DeployedPanel_ExpandedSideways? styles.assetsPanelHome : styles.assetsPanels}>
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
