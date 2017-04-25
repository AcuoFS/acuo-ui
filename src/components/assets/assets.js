import React from 'react';
import styles from './Assets.css'
import AssetsDeployedContainer from './subcomponent/AssetsDeployed.js'
import AssetsHomeComponent from './subcomponent/AssetsHome.js'

export default class AssetsComponent extends React.Component {
  componentDidMount(){
  }

  render(){
    return(
      <div className={styles.assetsComponent}>

        <div className={styles.assetsPanels}>
          <AssetsDeployedContainer ui={this.props.AssetsUi} data={this.props.AssetsData} dispatch={this.props.Dispatch}  />
        </div>

        <div className={styles.assetsPanels}>
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
