/**
 * Created by panyong on 4/11/16.
 */
import React, {PropTypes} from 'react'
import {List, Map} from 'immutable'
import CounterPartyAssets from './sub-components/CounterPartyAssets'
import ClientAsset from './sub-components/ClientAsset'
import styles from './MarginAgreementList.css'


export default class MarginAgreementList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      adjAmount: 0.0
    }

    const {recon, onLineItemInsertion} = this.props
    this.displayLineItems = this.displayLineItems.bind(this)
    if (!recon.isEmpty()) {
      onLineItemInsertion(recon)
    }
    this.getTotalAmount = this.getTotalAmount.bind(this)
    this.getPercentage = this.getPercentage.bind(this)
    this.getBtnColour = this.getBtnColour.bind(this)
    this.onUpdateAdjAmount = this.onUpdateAdjAmount.bind(this)
    this.isDisableReconButton = this.isDisableReconButton.bind(this)
  }

  displayTotalMargin(i, assetType) {
    if (i.get(assetType)) {
      return i.get(assetType).reduce((asset, x) => {
        return asset + x.get('data').reduce((data, y) => {
            return data + y.get('secondLevel').reduce((amount, z) => {
                return amount + z.get('amount')
              }, 0)
          }, 0)
      }, 0)
    }
  }

  getTotalAmount(asset, checkedOrRecon) {
    if (asset) {
      return asset.reduce((sum, x) => {
        return sum + x.get('data').reduce((sum, y) => {
          return sum + (y.get('firstLevel') - y.get('secondLevel').reduce((sum, z) => {
            return sum + (z.get(checkedOrRecon) ? 0 : z.get('amount'))
          }, 0))
        }, 0)
      }, 0)
    } else {
      return 0
    }
  }

  getPercentage(actionItem) {
    if (actionItem.get('clientAssets') && actionItem.get('counterpartyAssets')) {
      if (this.getTotalAmount(actionItem.get('clientAssets'), 'recon')) {
        return ((this.displayTotalMargin(actionItem, 'clientAssets') - (this.getTotalAmount(actionItem.get('clientAssets'), 'recon'))) /
        (this.displayTotalMargin(actionItem, 'counterpartyAssets') - (this.getTotalAmount(actionItem.get('counterpartyAssets'), 'recon'))) * 100).toFixed(0)
      }
      else if (this.getTotalAmount(actionItem.get('clientAssets'), 'checked')) {
        return (this.getTotalAmount(actionItem.get('clientAssets'), 'checked') /
        this.getTotalAmount(actionItem.get('counterpartyAssets'), 'checked') * 100).toFixed(0)
      }
      else {
        return (this.displayTotalMargin(actionItem, 'clientAssets') / this.displayTotalMargin(actionItem, 'counterpartyAssets') * 100).toFixed(0)
      }
    } else {
      return 0.00
    }
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

  checkSecondLeveIsNotAllChecked(clientOrCpty, actionItem){
    if (actionItem.get(clientOrCpty)) {

      const clientAssets = actionItem.get(clientOrCpty)

      for (let groupAssets of clientAssets) {
        for (let firstLevelRecon of groupAssets.get('data')) {
          for (let secondLevelItem of firstLevelRecon.get('secondLevel')) {
            if (!secondLevelItem.get('checked')) {
              return true
            }
          }
        }
      }
    }
  }

  isDisableReconButton(actionItem, percentage) {

    // Either client and cpty has no recon details
    if(percentage == 0){
      return true
    }

    if(this.checkSecondLeveIsNotAllChecked('clientAssets', actionItem)){
      return true
    }

    if(this.checkSecondLeveIsNotAllChecked('counterpartyAssets', actionItem)){
      return true
    }

    // Need adjustment
    if (percentage != 100 && this.state.adjAmount == 0.0) {
      return true
    }

    return false
  }

  onUpdateAdjAmount(amt){
    // console.log("onUpdateAdjAmount from MarginAgreementList called")
    this.setState({
      adjAmount: amt
    })
  }

  displayLineItems(recon, onReconItem, onSelectedItem) {
    return (recon.map((x) => {
      return x.get('marginStatus').map((y) => {
        return y.get('timeFrames').map((z) => {
          return z.get('actionsList').map((i) => {

            let percentage = this.getPercentage(i)

            return (
              <div className={styles.actionWrap}>

                <ClientAsset marginData={i}
                             actStyle={'act_L'}
                             orgName={'legalEntity'}
                             assetsName={'clientAssets'}
                             handlerTotalMargin={this.displayTotalMargin}
                             handlerSelectedItem={onSelectedItem}
                             handlerUpdateAdj={this.onUpdateAdjAmount}
                             adjAmt={this.state.adjAmount}/>

                <div className={styles.actPanel + ' ' + styles.act_C}>
                  {/*Action button goes here*/}
                  <div className={styles.btnWrap}>
                    <div className={styles.actFig + ' ' + this.getTextColour(percentage)}>
                      {percentage}%
                    </div>
                    <div className={styles.actBtn + ' '
                      + (this.isDisableReconButton(i, percentage) ?
                      styles.actBtnDisable : this.getBtnColour(percentage))}
                         onClick={onReconItem} data-ref={i.get('GUID')}>OK
                    </div>
                  </div>
                </div>

                <CounterPartyAssets marginData={i}
                                    actStyle={'act_R'}
                                    orgName={'cptyOrg'}
                                    assetsName={'counterpartyAssets'}
                                    handlerTotalMargin={this.displayTotalMargin}
                                    handlerSelectedItem={onSelectedItem}/>
              </div>
            )
          })
        })
      })
    }))
  }

  render() {
    const {recon, onReconItem, onSelectedItem} = this.props
    return (
      <div className={styles.actionContainer}>
        {this.displayLineItems(recon, onReconItem, onSelectedItem)}
      </div>
    )
  }
}

MarginAgreementList.PropTypes = {
  recon: PropTypes.instanceOf(List).isRequired,
  onLineItemInsertion: PropTypes.func.isRequired,
  onReconItem: PropTypes.func.isRequired,
  onSelectedItem: PropTypes.func.isRequired
}

MarginAgreementList.defaultProps = {
  recon: List()
}