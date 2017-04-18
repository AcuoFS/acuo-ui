import React from 'react';
import styles from './Assets.css'



export default class AssetsComponent extends React.Component {
  componentDidMount(){
   console.log("AssetsComponent Mounted!")
  }

  render(){
    return(
      <div className={styles.assetsComponent}>
        <div className={styles.assetsPanels}>Deployed</div>
        <div className={styles.assetsPanels}>At Home</div>
      </div>
    )
  }
}
