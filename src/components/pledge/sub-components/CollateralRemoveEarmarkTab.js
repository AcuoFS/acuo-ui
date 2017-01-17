import React from 'react'
import styles from '../Pledge.css'


export default class CollateralRemoveEarmarkTab extends React.Component{
  render(){
    return (
      <div className={styles.tabbedContent + ' ' + this.props.checkContent('remove')}>
        <div className={styles.removeAsset}>
          Unearmark Asset
        </div>
        <div className={styles.buttonContainer + ' ' + styles.removeAsset}>
          <button type="submit" className={styles.btnEnabled}>
            Remove
          </button>
        </div>
      </div>

    )
  }
}