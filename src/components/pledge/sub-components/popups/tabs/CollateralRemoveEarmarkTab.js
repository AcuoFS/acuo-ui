import React from 'react'
import {POPUP_TAB_REMOVE_EARMARK} from'../../../../../constants/CollateralTypes'
import styles from '../../../Pledge.css'


export default class CollateralRemoveEarmarkTab extends React.Component{
  render(){
    return (
      <div className={styles.tabbedContent + ' ' + this.props.checkContent(POPUP_TAB_REMOVE_EARMARK)}>
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