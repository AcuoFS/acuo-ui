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
    } else
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

  isDisableReconButton(actionItem, percentage, firstLevelList) {

    const firstLevelLength = Math.max.apply(Math,
      [
        actionItem.get('clientAssets').reduce((sum, group) => sum + group.get('data').size, 0),
        actionItem.get('counterpartyAssets').reduce((sum, group) => sum + group.get('data').size, 0)
      ]
    )

    const checkedFirstLevelLength = firstLevelList.filter((x) => x.get('GUID') == actionItem.get('GUID')).size

    if (firstLevelLength > checkedFirstLevelLength)
      return true

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

  onTogglePortfolioPopup() {
    this.setState({
      isUploading: !this.state.isUploading
    })
  }

  render() {

    const {
      onSelectFirstLevelItem, portfolioData, onReconItem, firstLevelList, secondLevelList,
      onSelectSecondLevelItem
    } = this.props

    let percentage = this.getPercentage(portfolioData)

    return (
      <div className={styles.actionWrap}>

        {this.state.isUploading && <MarginAgreementUpload
          propPortfolioData={portfolioData}
          propHandlerTotalMargin={this.displayTotalMargin}
          propHandlerSelectedItem={onSelectFirstLevelItem}
          propHandlerUpdateAdj={this.onUpdateAdjAmount}
          propAdjAmt={this.state.adjAmount}
          propFirstLevelList={firstLevelList}
          propSecondLevelList={secondLevelList}
          propOnSelectSecondLevelItem={onSelectSecondLevelItem}
          propIsUploading={this.state.isUploading}
          propOnTogglePortfolioPopup={this.onTogglePortfolioPopup}/>}

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
            + (this.isDisableReconButton(portfolioData, percentage, firstLevelList) ?
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
      </div>
    )
  }
}