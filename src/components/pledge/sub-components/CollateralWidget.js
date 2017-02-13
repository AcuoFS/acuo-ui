import React from 'react'
import CollateralAssetGroup from './CollateralAssetGroup'
import styles from '../Pledge.css'


export default class Collateral extends React.Component {
  render() {
    const {
      toggleColwidthR,
      sideways,
      open,
      collateral,
      changeSideways,
      onRemoveFromEarmarked
    } = this.props

    let collateralHeader = (
      <div className={styles.collateralRow + ' ' + styles.collateralHeader + ' ' + styles.collateralTableExpanded}>
        <div className={styles.collateralCell}>Asset</div>
        <div className={styles.collateralCell}>Total Value</div>
        <div className={styles.collateralCell}>CCY</div>
        <div className={styles.collateralCell}>Delivery Time</div>
        <div className={styles.collateralCell}>Status</div>
        <div className={styles.collateralCell}>Rating</div>
        <div className={styles.collateralCell}>Maturity Date</div>
      </div>
    )

    if (open) {
      collateralHeader = (
        <div className={styles.collateralRow + ' ' + styles.collateralHeader + ' ' + styles.collateralTableExpanded}>
          <div className={styles.collateralCell}>Asset</div>
          <div className={styles.collateralCell}>Total Value</div>
          <div className={styles.collateralCell}>CCY</div>
          <div className={styles.collateralCell}>Delivery Time</div>
          <div className={styles.collateralCell}>Status</div>
          <div className={styles.collateralCell}>Rating</div>
          <div className={styles.collateralCell}>Maturity Date</div>
          <div className={styles.collateralCell}>Internal Cost (bps)</div>
          <div className={styles.collateralCell}>Opportunity Cost (bps)</div>
          <div className={styles.collateralCell}>ISIN</div>
          <div className={styles.collateralCell}>Venue</div>
          <div className={styles.collateralCell}>Acc ID</div>
        </div>
      )
    }

    let collateralAssetGroupList = []

    if (collateral) {
      const collateralJSList = collateral.toJS()
      for (const key of Object.keys(collateralJSList)) {
        collateralAssetGroupList = [...collateralAssetGroupList,
          <CollateralAssetGroup key={key}
                                propCollateralType={key}
                                propCollateralAssetList={collateralJSList[key]}
                                propIsExpanded={true}
                                propIsDisplayAll={open}
                                propHandleOnRemoveFromEarmarked={onRemoveFromEarmarked}/>
        ]
      }
    }

    return (
      <div className={styles.col_R + ' ' + toggleColwidthR}>
        <div className={styles.panel}>
          <div className={styles.panelTitle}>Collateral
            <img src={sideways} className={styles.imageRight} onClick={changeSideways}/>
          </div>

          <div className={styles.collateralTable}>

            {collateralHeader}

            {collateralAssetGroupList}

          </div>

        </div>
      </div>

    )
  }
}