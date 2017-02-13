import React from 'react'
import CollateralAssetGroup from './CollateralAssetGroup'
import styles from '../Pledge.css'
import selfStyles from './CollateralWidget.css'


export default class Collateral extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      filterText: ''
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleFilterChange(value) {
    this.setState({
      filterText: value
    })
  }

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
            <input type="text" placeholder="Search" className={selfStyles.searchInput}
                   value={this.state.filterText}
                   onChange={(e) => this.handleFilterChange(e.target.value)}/>
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