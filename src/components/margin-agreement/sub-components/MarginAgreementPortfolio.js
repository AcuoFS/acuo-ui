import React, {PropTypes} from 'react'
import CounterPartyAssets from './CounterPartyAssets'
import ClientAsset from './ClientAsset'
import MarginAgreementUpload from '../../margin-agreement-upload/MarginAgreementUpload'
import styles from '../MarginAgreementList.css'


export default class MarginAgreementPortfolio extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      adjAmount: 0.0,
      isUploading: false
    }

    this.onUpdateAdjAmount = this.onUpdateAdjAmount.bind(this)
    this.isDisableReconButton = this.isDisableReconButton.bind(this)
    this.onTogglePortfolioPopup = this.onTogglePortfolioPopup.bind(this)
  }

  displayTotalMargin(i, assetType) {
    if (i.get(assetType)) {
      return i.get(assetType).reduce((asset, x) => {
        return asset + x.get('data').reduce((data, y) => {
            return data + parseFloat(y.getIn(['firstLevel', 'amount']))
          }, 0)
      }, 0)
    }else
      return 0
  }

  onUpdateAdjAmount(amt) {
    this.setState({
      adjAmount: amt
    })
  }

  getTextColour(percentage) {
    switch (true) {
      case (percentage < 90.00 || percentage > 110):
        return styles.actTextRed
      case (percentage < 95.00 || percentage > 105):
        return styles.actTextOrange
      default:
        return styles.actTextGreen
    }
  }

  checkSecondLeveIsNotAllChecked(clientOrCpty, actionItem) {
    if (actionItem.get(clientOrCpty)) {

      const clientAssets = actionItem.get(clientOrCpty)

      // for (let groupAssets of clientAssets) {
      //   for (let firstLevelRecon of groupAssets.get('data')) {
      //     for (let secondLevelItem of firstLevelRecon.get('secondLevel')) {
      //       if (!secondLevelItem.get('checked')) {
      //         return true
      //       }
      //     }
      //   }
      // }
    }
  }

  isDisableReconButton(actionItem, percentage) {

    if (this.checkSecondLeveIsNotAllChecked('clientAssets', actionItem)) {
      return true
    }

    if (this.checkSecondLeveIsNotAllChecked('counterpartyAssets', actionItem)) {
      return true
    }

    // Need adjustment
    if (percentage != 100.00 && this.state.adjAmount == 0.0) {
      return true
    }

    // Either client and cpty has no recon details
    if (percentage === 0.00) {
      return true
    }

    return false
  }

  getBtnColour(percentage) {
    switch (true) {
      case (percentage < 90.00 || percentage > 110):
        return styles.actBtnRed
      case (percentage < 95.00 || percentage > 105):
        return styles.actBtnOrange
      default:
        return styles.actBtnGreen
    }
  }

  getPercentage(actionItem) {
    if (actionItem.get('clientAssets') && actionItem.get('counterpartyAssets')) {

        return (this.displayTotalMargin(actionItem, 'clientAssets') /
        this.displayTotalMargin(actionItem, 'counterpartyAssets') * 100).toFixed(0)

    } else {
      return 0.00
    }
  }

  getTotalAmount(asset, checkedOrRecon) {
    if (asset) {
      return asset.reduce((sum, x) => {
        return sum + x.get('data').reduce((sum, y) => {
            return sum + parseFloat(y.get('amount'))
          }, 0)
      }, 0)
    } else {
      return 0
    }
  }

  onTogglePortfolioPopup(){
    this.setState({
      isUploading: !this.state.isUploading
    })
  }

  render() {

    const {onSelectFirstLevelItem, portfolioData, onReconItem, firstLevelList, secondLevelList,
      onSelectSecondLevelItem, unmatchedPortfolios} = this.props

    let percentage = this.getPercentage(portfolioData)

    return (
      (<div className={styles.actionWrap}>

        <MarginAgreementUpload
          propPortfolioData={portfolioData}
          propHandlerTotalMargin={this.displayTotalMargin}
          propHandlerSelectedItem={onSelectFirstLevelItem}
          propHandlerUpdateAdj={this.onUpdateAdjAmount}
          propAdjAmt={this.state.adjAmount}
          propFirstLevelList={firstLevelList}
          propSecondLevelList={secondLevelList}
          propOnSelectSecondLevelItem={onSelectSecondLevelItem}
          propIsUploading={this.state.isUploading}
          propOnTogglePortfolioPopup={this.onTogglePortfolioPopup}
          unmatchedPortfolios={unmatchedPortfolios}/>

        <ClientAsset marginData={portfolioData}
                     actStyle={'act_L'}
                     orgName={'legalEntity'}
                     assetsName={'clientAssets'}
                     handlerTotalMargin={this.displayTotalMargin}
                     handlerSelectedItem={onSelectFirstLevelItem}
                     handlerUpdateAdj={this.onUpdateAdjAmount}
                     adjAmt={this.state.adjAmount}
                     firstLevelList={firstLevelList}
                     secondLevelList={secondLevelList}
                     onSelectSecondLevelItem={onSelectSecondLevelItem}/>

        <div className={styles.actPanel + ' ' + styles.act_C}>
          <div className={styles.btnWrap}>
            <div className={styles.actFig + ' ' + this.getTextColour(percentage)}>
              {percentage}%
            </div>
            <div className={styles.actBtn + ' '
            + (this.isDisableReconButton(portfolioData, percentage) ?
              styles.actBtnDisable : this.getBtnColour(percentage))}
                 onClick={onReconItem} data-ref={portfolioData.get('GUID') + "?amount=" + this.state.adjAmount}>OK
            </div>
          </div>
        </div>

        <CounterPartyAssets marginData={portfolioData}
                            actStyle={'act_R'}
                            orgName={'cptyOrg'}
                            assetsName={'counterpartyAssets'}
                            handlerTotalMargin={this.displayTotalMargin}
                            handlerSelectedItem={onSelectFirstLevelItem}
                            firstLevelList={firstLevelList}
                            secondLevelList={secondLevelList}
                            onSelectSecondLevelItem={onSelectSecondLevelItem}
                            onTogglePortfolioPopup={this.onTogglePortfolioPopup}/>
      </div>)

    )
  }
}