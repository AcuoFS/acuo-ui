import React from 'react';
import styles from './Assets.css'
import AssetsDeployedComponent from './subcomponent/AssetsDeployed.js'
import AssetsHomeComponent from './subcomponent/AssetsHome.js'

export default class AssetsComponent extends React.Component {
  componentDidMount(){
   // console.log("AssetsComponent Mounted");
   // console.log(this.props)
  }

  render(){
    return(
      <div className={styles.assetsComponent}>
        <div className={styles.assetsPanels}>
          <AssetsDeployedComponent ui={this.props.AssetsUi}
                                   data={this.props.AssetsData}
                                   dispatch={this.props.Dispatch}  />
        </div>
        <div className={styles.assetsPanels}> <AssetsHomeComponent/> </div>
      </div>
    )
  }
}
