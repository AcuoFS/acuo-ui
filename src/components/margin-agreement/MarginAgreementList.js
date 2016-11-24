/**
 * Created by panyong on 4/11/16.
 */
import React, {PropTypes} from 'react'
import {List} from 'immutable'
import MarginAgreementPortfolio from './sub-components/MarginAgreementPortfolio'
import styles from './MarginAgreementList.css'


export default class MarginAgreementList extends React.Component {
  constructor(props) {
    super(props)
    const {recon, onLineItemInsertion} = this.props
    this.displayLineItems = this.displayLineItems.bind(this)
    if (!recon.isEmpty()) {
      onLineItemInsertion(recon)
    }
    this.getTotalAmount = this.getTotalAmount.bind(this)
    this.getPercentage = this.getPercentage.bind(this)
    this.getBtnColour = this.getBtnColour.bind(this)
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
            return sum + y.get('secondLevel').reduce((sum, z) => {
                return sum + (z.get(checkedOrRecon) ? z.get('amount') : 0)
              }, 0)
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

  displayLineItems(recon, onReconItem, onSelectedItem) {
    return ( recon.map((x) => {
      return x.get('marginStatus').map((y) => {
        return y.get('timeFrames').map((z) => {
          return z.get('actionsList').map((i) => {
            return (
              <div className={styles.actionWrap}>

                <MarginAgreementPortfolio marginData={i}
                                          actStyle={'act_L'}
                                          orgName={'legalEntity'}
                                          assetsName={'clientAssets'}
                                          handlerTotalMargin={this.displayTotalMargin}
                                          handlerSelectedItem={onSelectedItem}/>

                <div className={styles.actPanel + ' ' + styles.act_C}>
                  {/*Action button goes here*/}
                  <div className={styles.btnWrap}>
                    <div
                      className={styles.actFig + ' ' + this.getTextColour(this.getPercentage(i))}>{this.getPercentage(i)}%
                    </div>
                    <div className={styles.actBtn + ' ' + this.getBtnColour(this.getPercentage(i))}
                         onClick={onReconItem}>OK
                    </div>
                  </div>
                </div>

                <MarginAgreementPortfolio marginData={i}
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