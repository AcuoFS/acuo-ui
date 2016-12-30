import React, {PropTypes} from 'react'
import {Map, List} from 'immutable'
import MarginAgreementDetail from './MarginAgreementDetail'
import {numberWithCommas} from '../../../utils/numbersWithCommas'
import styles from '../MarginAgreementList.css'


export default class MarginAgreementPortfolio extends React.Component {

  checkSecondLevel(secondLevel) {
    if (secondLevel.size <= secondLevel.reduce((count, x) => {
        return count + (x.get('recon') ? 1 : 0)
      }, 0)) {
      return true
    } else {
      return false
    }
  }

  getCheckboxImageUrl(secondLevel) {
    const temp = secondLevel.reduce((count, x) => {
      return count + (x.get('checked') || x.get('recon') ? 1 : 0)
    }, 0)
    if (secondLevel.size <= temp) {
      return "./images/reconcile/checkboxwithtick.png"
    } else {
      return "./images/reconcile/checkbox.png"
    }
  }

  getTotalAmount(asset) {
    if (asset) {
      return asset.reduce((sum, x) => {
        return sum + x.get('data').reduce((sum, y) => {
            return sum + y.get('secondLevel').reduce((sum, z) => {
                return sum + (z.get('checked') ? z.get('amount') : 0)
              }, 0)
          }, 0)
      }, 0)
    } else {
      return 0
    }
  }

  getTotalReconAmount(asset) {
    if (asset) {
      return asset.reduce((sum, x) => {
        return sum + x.get('data').reduce((sum, y) => {
            return sum + y.get('secondLevel').reduce((sum, z) => {
                return sum + (z.get('recon') ? z.get('amount') : 0)
              }, 0)
          }, 0)
      }, 0)
    } else {
      return 0
    }
  }

  getCurrencyInfo(ccy, baseCCY) {
    if (ccy)
      return ccy.map((x) => {
        return (
          <div key={Math.random()}>{x.get('ccy') + '/' + baseCCY + "=" + x.get('exchangeRate')}</div>
        )
      })
    else
      return
  }

  getFirstLevelTotal(asset) {
    if (asset) {
      return asset.reduce((listX, x) => {
        let list = x.get('data').reduce((listY, y) => {

          let list = Map({
            'key': y.get('firstLevel'), 'amount': y.get('secondLevel').reduce((sum, z) => {
              return sum + z.get('amount')
            }, 0)
          })
          //return (list > 0 ? listY.push(y.set('secondLevel', list)) : listY)
          return (list.size > 0 ? listY.push(list) : listY)
        }, List())
        return (list.size > 0 ? listX.concat(list) : listX)
      }, List())
    }
    else return List()
  }

  checkDescrepency(clientAsset, counterpartyAsset) {

    let totalClientAsset = this.getFirstLevelTotal(clientAsset)
    let totalcounterAsset = this.getFirstLevelTotal(counterpartyAsset)

    let highestDifference = totalClientAsset.reduce((highest, x) => {
      let difference = Math.abs(x.get('amount') - totalcounterAsset.filter(y => { console.log(y.toJS()); return y.get('key') == x.get('key')}).first().get('amount'))
      return (highest.get('difference') > difference ? highest : Map({'key': x.get('key'), 'difference': difference}))
    }, Map())

    return highestDifference
  }

  secondLevelHighestDiscrepancy(firstLevelName, marginData, discrepancy){

    if(discrepancy){
      let clientFirstLevel = marginData.get('clientAssets').reduce((highestValue, x) => {
        let current = x.get('data').filter(x => {
          return x.get('firstLevel') == firstLevelName
        })
        return (current.size > 0 ? current : highestValue)
      }, '').first()

      let cptyFirstLevel = marginData.get('counterpartyAssets').reduce((highestValue, x) => {
        let current = x.get('data').filter(x => {
          return x.get('firstLevel') == firstLevelName
        })
        return (current.size > 0 ? current : highestValue)
      }, '').first()


      if(clientFirstLevel && cptyFirstLevel){

        let highestDiscrepancy = clientFirstLevel.get('secondLevel').reduce((highest, x) => {
          let difference = Math.abs(x.get('amount') - cptyFirstLevel.get('secondLevel').filter(y => y.get('assetName') == x.get('assetName')).first().get('amount'))

          return (highest.get('difference') > difference ? highest : Map({'assetName': x.get('assetName'), 'difference': difference}))
        }, Map())

        return (highestDiscrepancy.get('assetName'))
      }
      else{
        return null
      }

    }
  }

  renderItem(marginData, assetsName, handlerSelectedItem) {
    if (marginData.get(assetsName))
      return marginData.get(assetsName).map((x) => {
        if (x.get('data')) {
          return (<div key={x.get('groupName')}>{x.get('data').map((y) => {
            const secondLevel = y.get('secondLevel')
            //const discrepancy = this.checkDescrepency(marginData.get('clientAssets'), marginData.get('counterpartyAssets')).includes(y.get('firstLevel'))

            //let secondLevelDiscrepancy = this.secondLevelHighestDiscrepancy(y.get('firstLevel'), marginData, discrepancy)

            return <MarginAgreementDetail
              GUID={marginData.get('GUID')}
              topLevel={x.get('groupName')}
              key={y.get('firstLevel') + x.get('groupName')}
              totalAmount={secondLevel.reduce((amount, j) => {
                return amount + j.get('amount')
              }, 0)}
              secondLevel={secondLevel}
              handlerSelectedItem={handlerSelectedItem}
              isSecondLevel={this.checkSecondLevel(secondLevel)}
              checkboxImageUrl={this.getCheckboxImageUrl(secondLevel)}
              //discrepancy={discrepancy}
              //secondLevelDiscrepancy={secondLevelDiscrepancy}
            />
          })}
            <hr/>
          </div>)
        }
      })
  }

  render() {
    const {
      marginData, orgName, assetsName,
      handlerTotalMargin, handlerSelectedItem, isHidePanel
    } = this.props
    return (
      <div className={styles.panel + " " + (isHidePanel ? styles.hidePanel : "")}>
        <div className={styles.section + ' ' + styles.left}>

          <div className={styles.legalEntityContainer}>
            <div className={styles.legalEntity}>{ marginData.get(orgName) }</div>
            <div className={styles.legalEntityDetails}>
              <div>{ orgName } -</div>
              <div>Global Mutual Fund</div>
            </div>
          </div>
          <div className={styles.package}> {/* table outer div*/}
            { this.renderItem(marginData, assetsName, handlerSelectedItem) }
          </div>

          <div className={styles.sectionText}> {/* two row div for bold*/}
            <div className={styles.sectionRow}> {/* one row div*/}
              <div className={styles.packageLeft}>
                <div>Total Amount Selected</div>
              </div>
              <div className={styles.packageRight}>
                {numberWithCommas(this.getTotalAmount(
                  marginData.get(assetsName)))}
              </div>
            </div>
            <div className={styles.sectionRow}> {/* one row div*/}
              <div className={styles.packageLeft}>
                <div>Total Reconciled</div>
              </div>
              <div className={styles.packageRight}>
                {numberWithCommas(this.getTotalReconAmount(marginData.get(assetsName)))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section + ' ' + styles.right}>
          <div className={styles.currency}>
            <div>CCY:{marginData.get('ccy')}</div>
            <div className={styles.viewFxRate}> View FX rate
              <div className={styles.viewFxRateImage}>
                <div>
                  {this.getCurrencyInfo(marginData.get('currencyInfo'), marginData.get('ccy'))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.totalMargin}>
            <div className={styles.marginTitle}>Total Margin</div>
            <div className={styles.marginValue}>
              {((handlerTotalMargin(marginData, assetsName) -
              this.getTotalReconAmount(marginData.get(assetsName))) / 1000000).toFixed(2)}
            </div>
            <div className={styles.marginUnit}>Millions</div>
          </div>
          <div className={styles.tradeDetails}> View Trade Details</div>
        </div>
      </div>
    )

  }
}

MarginAgreementPortfolio.PropTypes = {
  marginData: PropTypes.instanceOf(Map).isRequired,
  actStyle: PropTypes.string.isRequired,
  orgName: PropTypes.string.isRequired,
  assetsName: PropTypes.string.isRequired,
  handlerTotalMargin: PropTypes.func.isRequired,
  handlerSelectedItem: PropTypes.func.isRequired,
  isHidePanel: PropTypes.bool
}

MarginAgreementPortfolio.defaultProps = {
  isHidePanel: false
}