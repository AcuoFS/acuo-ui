import React from 'react'
import MarginAgreementAssets from './MarginAgreementAssets'
import ReconDisputeContainer from '../../../containers/ReconDisputeContainer'
import {TAB_MARGIN_AGREEMENT_PORTFOLIO, TAB_MARGIN_AGREEMENT_DISPUTE} from '../../../constants/ComponentConstant'
import styles from '../MarginAgreementList.css'


export default class CounterPartyAssets extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: props.isDisputed ? TAB_MARGIN_AGREEMENT_DISPUTE :
        TAB_MARGIN_AGREEMENT_PORTFOLIO,
      tabReconStyle: props.isDisputed ? styles.tabInactive : styles.tabActive,
      tabDisputeStyle: props.isDisputed ? styles.tabActive : styles.tabInactive

    }
    this.handleOnTabSelect = this.handleOnTabSelect.bind(this)
  }

  handleOnTabSelect(e) {
    if (e.currentTarget.dataset.value == TAB_MARGIN_AGREEMENT_PORTFOLIO) {

      this.setState((prevState) => ({
        selectedTab: TAB_MARGIN_AGREEMENT_PORTFOLIO,
        tabReconStyle: styles.tabActive,
        tabDisputeStyle: styles.tabInactive
      }))
    } else {
      this.setState((prevState) => ({
        selectedTab: TAB_MARGIN_AGREEMENT_DISPUTE,
        tabReconStyle: styles.tabInactive,
        tabDisputeStyle: styles.tabActive
      }))
    }
  }

  render() {
    const {
      marginData, actStyle, orgName,
      assetsName, handlerTotalMargin, handlerSelectedItem,
      firstLevelList, secondLevelList,
      onSelectSecondLevelItem, onTogglePortfolioPopup, isUploading,
      isDisputed
    } = this.props

    return (
      <div className={styles.actPanel + ' ' + styles[actStyle] + ' ' + styles.counterPartyCont}>
        <ul className={styles.tabs14}>
          <li onClick={this.handleOnTabSelect} data-value={TAB_MARGIN_AGREEMENT_PORTFOLIO}
              className={styles.tabButton + ' ' + this.state.tabReconStyle}>
            Reconcile
          </li>
          <li onClick={this.handleOnTabSelect} data-value={TAB_MARGIN_AGREEMENT_DISPUTE}
              className={styles.tabButton + ' ' + this.state.tabDisputeStyle}>
            Dispute
          </li>
        </ul>
        <MarginAgreementAssets marginData={marginData}
                               orgName={orgName}
                               assetsName={assetsName}
                               handlerTotalMargin={handlerTotalMargin}
                               handlerSelectedItem={handlerSelectedItem}
                               isHidePanel={this.state.selectedTab == TAB_MARGIN_AGREEMENT_DISPUTE}
                               firstLevelList={firstLevelList}
                               secondLevelList={secondLevelList}
                               onSelectSecondLevelItem={onSelectSecondLevelItem}
                               onTogglePortfolioPopup={onTogglePortfolioPopup}
                               isUploading={isUploading}
                               party={'cpty'}/>
        <ReconDisputeContainer marginData={marginData}
                               actStyle={actStyle}
                               orgName={orgName}
                               assetsName={assetsName}
                               handlerTotalMargin={handlerTotalMargin}
                               handlerSelectedItem={handlerSelectedItem}
                               isHidePanel={this.state.selectedTab == TAB_MARGIN_AGREEMENT_PORTFOLIO}
                               isDisputed={isDisputed}
        />
      </div>

    )
  }
}

