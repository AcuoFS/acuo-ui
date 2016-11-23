import React, {PropTypes} from 'react'
import {Map} from 'immutable'
import MarginAgreementDetail from './MarginAgreementDetail'
import styles from './MarginAgreementList.css'


export default class MarginAgreementPortfolio extends React.Component {
  numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
    return x;
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

  renderItem(marginData, assetsName, handlerSelectedItem) {
    if (marginData.get(assetsName))
      return marginData.get(assetsName).map((x) => {
        if (x.get('data'))
          return (<div key={x.get('groupName')}>{x.get('data').map((y) => {
            return <MarginAgreementDetail
              GUID={marginData.get('GUID')}
              topLevel={y.get('firstLevel')}
              key={y.get('firstLevel') + x.get('groupName')}
              totalAmount={y.get('secondLevel').reduce((amount, j) => {
                return amount + j.get('amount')
              }, 0)}
              secondLevel={y.get('secondLevel')}
              handlerSelectedItem={handlerSelectedItem}
            />
          })}
            <hr/>
          </div>)
      })
  }

  render() {
    const {
      marginData, actStyle, orgName,
      assetsName, handlerTotalMargin, handlerSelectedItem
    } = this.props
    return (
      <div className={styles.actPanel + ' ' + styles[actStyle]}>
        <div className={styles.panel}>
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
                  {this.numberWithCommas(this.getTotalAmount(
                    marginData.get(assetsName)))}
                </div>
              </div>
              <div className={styles.sectionRow}> {/* one row div*/}
                <div className={styles.packageLeft}>
                  <div>Total Reconciled</div>
                </div>
                <div className={styles.packageRight}>
                  {this.numberWithCommas(this.getTotalReconAmount(marginData.get(assetsName)))}
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

}