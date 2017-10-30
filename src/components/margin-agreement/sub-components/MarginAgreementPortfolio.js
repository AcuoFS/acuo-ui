import React from 'react';
import PropTypes from 'prop-types'
import CounterPartyAssets from './CounterPartyAssets'
import ClientAsset from './ClientAsset'
import MarginAgreementUpload from '../../margin-agreement-upload/MarginAgreementUpload'
import {isEmptyCounterparty} from '../../../utils'
import _ from 'lodash'
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

  isDisableReconButton(actionItem, cptyTotal, clientTotal, firstLevelList) {

    // console.log(cptyTotal, Math.round(parseFloat(clientTotal + parseFloat(this.state.adjAmount)) * 100) / 100)

    //check if first level check length is mismatched
    if(firstLevelList) {
      const firstLevelLength = Math.max.apply(Math,
        [
          actionItem.get('clientAssets').reduce((sum, group) => sum + group.get('data').size, 0),
          actionItem.get('counterpartyAssets').reduce((sum, group) => sum + group.get('data').size, 0)
        ]
      )

      // console.log(clientTotal + parseFloat(this.state.adjAmount))
      // console.log(cptyTotal)

      // console.log(firstLevelList.size)
      // console.log(firstLevelLength)

      // const checkedFirstLevelLength = firstLevelList.filter((x) => x.get('GUID') == actionItem.get('GUID')).size

      if (firstLevelLength > firstLevelList.size)
        return true
    }
    // Math.round(parseFloat(clientTotal + parseFloat(this.state.adjAmount)).toFixed(2))
    // Need adjustment
    if (Math.round(parseFloat(clientTotal + parseFloat(this.state.adjAmount)) * 100) / 100 !== cptyTotal) {
      return true
    }

    // Either client and cpty has no recon details
    if (!cptyTotal || !clientTotal) {
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

      return (this.displayTotalMargin(actionItem,'counterpartyAssets' ) / this.displayTotalMargin(actionItem, 'clientAssets') * 100).toFixed(0)

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

  isDisputed(marginData) {
    return (!_.isEmpty(marginData.get('disputeInfo').toJS()) ? marginData.get('disputeInfo').toJS() : false)
  }

  shouldComponentUpdate(nextProps, nextState){
    return !_.isEqual(this.props.firstLevelList, nextProps.firstLevelList) ||
      !_.isEqual(this.props.secondLevelList, nextProps.secondLevelList) ||
      !_.isEqual(this.props.currencyInfo, nextProps.currencyInfo) ||
      !_.isEqual(this.props.portfolioData, nextProps.portfolioData) ||
      !_.isEqual(this.state, nextState)
  }

  render() {

    const {
      firstLevelList, secondLevelList, currencyInfo, portfolioData,
      onSelectFirstLevelItem, onSelectSecondLevelItem, onReconItem
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
                     onSelectSecondLevelItem={onSelectSecondLevelItem}
                     currencyInfo={currencyInfo}/>

        <div className={styles.actPanel + ' ' + styles.act_C}>
          { !isEmptyCounterparty(portfolioData.get('counterpartyAssets')) &&
            !this.isDisputed(portfolioData) &&
            percentage !== 'Infinity' &&
          <div className={styles.btnWrap}>
            <div className={styles.actFig + ' ' + this.getTextColour(percentage)}>
              {percentage}%
            </div>
            <div className={styles.actBtn + ' ' + (this.isDisableReconButton(portfolioData, this.displayTotalMargin(portfolioData, 'counterpartyAssets'), this.displayTotalMargin(portfolioData, 'clientAssets'), firstLevelList, this.state.adjAmount) ? styles.actBtnDisable : this.getBtnColour(percentage))}
                 onClick={ (e)=>{
                   onReconItem(e)
                  }}
                 data-ref={portfolioData.get('GUID') + "?amount=" + this.state.adjAmount + "&direction=" + portfolioData.get('direction')}>
             OK
            </div>
          </div>}
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
                            onTogglePortfolioPopup={this.onTogglePortfolioPopup}
                            isDisputed={this.isDisputed(portfolioData)}
                            currencyInfo={currencyInfo}/>
      </div>
    )
  }
}
