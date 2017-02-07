import React, {PropTypes} from 'react'
import {Map, List} from 'immutable'
import MarginAgreementDetail from './MarginAgreementDetail'
import {numberWithCommas} from '../../../utils/numbersWithCommas'
import styles from '../MarginAgreementList.css'
import selfStyles from './MarginAgreementAssets.css'


export default class MarginAgreementPortfolio extends React.Component {
  constructor(props) {
    super(props)

    this.onAddAdjAmount = this.onAddAdjAmount.bind(this)
    this.onChangeAdjInput = this.onChangeAdjInput.bind(this)
  }

  checkSecondLevel(secondLevel) {
    // if (secondLevel.size <= secondLevel.reduce((count, x) => {
    //     return count + (x.get('recon') ? 1 : 0)
    //   }, 0)) {
    //   return true
    // } else {
    //   return false
    // }
  }

  getTotalAmount(asset) {
    if (asset) {
      return asset.reduce((sum, x) => {
        return sum + x.get('data').reduce((sum, y) => {
            return sum + parseFloat(y.getIn(['firstLevel', 'amount']))
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
            return sum + parseFloat(y.getIn(['firstLevel', 'amount']))
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
              return sum + parseFloat(z.get('amount') || 0)
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

  getDifferencePortfolio(assetsName, marginData) {
    let diff = 0
    if ('clientAssets' == assetsName) {
      diff = this.getTotalAmount(marginData.get('counterpartyAssets')) -
        this.getTotalAmount(marginData.get(assetsName))

    }
    return diff
  }

  onAddAdjAmount() {
    const {assetsName, marginData, handlerUpdateAdj} = this.props
    const differencePortfolio = this.getDifferencePortfolio(assetsName, marginData)

    handlerUpdateAdj(differencePortfolio)
    this.adjInput.value = differencePortfolio
  }

  onChangeAdjInput(){
    // console.log(this.adjInput.value == '')
    this.props.handlerUpdateAdj(this.adjInput.value != '' ? this.adjInput.value : 0.0)
  }

  checkDescrepency(clientAsset, counterpartyAsset) {

    let totalClientAsset = this.getFirstLevelTotal(clientAsset)
    let totalcounterAsset = this.getFirstLevelTotal(counterpartyAsset)

    let highestDifference = totalClientAsset.reduce((highest, x) => {
      let difference = Math.abs(x.get('amount') - totalcounterAsset.filter(y => {
          return y.get('key') == x.get('key')
        }).first().get('amount'))
      return (highest.get('difference') > difference ? highest : Map({'key': x.get('key'), 'difference': difference}))
    }, Map())

    return highestDifference
  }

  secondLevelHighestDiscrepancy(firstLevelName, marginData, discrepancy) {

    if (discrepancy) {
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


      if (clientFirstLevel && cptyFirstLevel) {

        let highestDiscrepancy = clientFirstLevel.get('secondLevel').reduce((highest, x) => {
          let difference = Math.abs(x.get('amount') - cptyFirstLevel.get('secondLevel').filter(y => y.get('assetName') == x.get('assetName')).first().get('amount'))

          return (highest.get('difference') > difference ? highest : Map({
              'assetName': x.get('assetName'),
              'difference': difference
            }))
        }, Map())

        return (highestDiscrepancy.get('assetName'))
      }
      else {
        return null
      }

    }
  }

  renderItem(marginData, assetsName, handlerSelectedItem, firstLevelList, secondLevelList, onSelectSecondLevelItem) {
    if (marginData.get(assetsName))
      return marginData.get(assetsName).map((x) => {
        if (x.get('data')) {
          return (<div key={x.get('groupName')}>{x.get('data').map((groupData) => {
            const secondLevel = groupData.getIn(['firstLevel', 'secondLevel'])
            //const discrepancy = this.checkDescrepency(marginData.get('clientAssets'), marginData.get('counterpartyAssets')).includes(y.get('firstLevel'))

            //let secondLevelDiscrepancy = this.secondLevelHighestDiscrepancy(y.get('firstLevel'), marginData, discrepancy)

            return <MarginAgreementDetail
              GUID={marginData.get('GUID')}
              topLevel={groupData.getIn(['firstLevel', 'name'])}
              firstLevelAmount={parseFloat(x.get('amount'))}
              key={groupData.getIn(['firstLevel', 'name']) + x.get('groupName')}
              totalAmount={parseFloat(groupData.getIn(['firstLevel', 'amount']))}
              secondLevel={secondLevel}
              handlerSelectedItem={handlerSelectedItem}
              firstLevelID={groupData.getIn(['firstLevel', 'id'])}
              isSecondLevel={this.checkSecondLevel(secondLevel)}
              firstLevelList={firstLevelList}
              secondLevelList={secondLevelList}
              id={groupData.getIn(['firstLevel', 'id'])}
              //discrepancy={discrepancy}
              //secondLevelDiscrepancy={secondLevelDiscrepancy}
              onSelectSecondLevelItem={onSelectSecondLevelItem}
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
      handlerTotalMargin, handlerSelectedItem, isHidePanel, adjAmt,
      firstLevelList, secondLevelList,
      onSelectSecondLevelItem
    } = this.props

    let diff = this.getDifferencePortfolio(assetsName, marginData)
    diff = (diff < 0) ? "(" + (diff * -1) + ")" : diff

    let diffCal, adjCal

    if ('clientAssets' == assetsName) {
      diffCal = <div className={styles.sectionRow}>
        <div className={styles.packageLeft}>
          <div>Difference</div>
        </div>
        <div className={styles.packageRight}>
          {numberWithCommas(diff)}
        </div>
      </div>

      adjCal = <div className={styles.sectionRow}>
        <div className={styles.packageLeft}>
          <div>Adjustment Amount</div>
          <button className={selfStyles.btnAddAdj} onClick={this.onAddAdjAmount}
                  disabled={(this.getDifferencePortfolio(assetsName, marginData) == 0)
                  || adjAmt != 0}>
            Add
          </button>
        </div>
        <div className={styles.packageRight}>
          <input className={selfStyles.adjAmtTextbox}
                 type="text"
                 ref={dom => this.adjInput = dom}
                 onChange={this.onChangeAdjInput}/>
        </div>
      </div>
    } else {
      diffCal = <div className={styles.sectionRow + ' ' + styles.greyText}>
        <div className={styles.packageLeft}>
          <div>Difference</div>
        </div>
        <div className={styles.packageRight}>
          NA
        </div>
      </div>

      adjCal = <div className={styles.sectionRow + ' ' + styles.greyText}>
        <div className={styles.packageLeft}>
          <div>Adjustment Amount</div>
        </div>
        <div className={styles.packageRight}>
          NA
        </div>
      </div>
    }

    let displayAssets

    if ('counterpartyAssets' == assetsName && !marginData.get(assetsName)) {
      displayAssets =
        <div className={styles.section + ' ' + styles.left}>
          <div className={styles.legalEntityContainer}>
            <div className={styles.legalEntity + ' ' + styles.noMatched}>No matched Portfolio</div>
            <div className={styles.legalEntity + ' ' + styles.findPortfolio}>Find portfolio</div>
          </div>

        </div>
    } else {
      displayAssets =
        <div className={styles.section + ' ' + styles.left}>

          <div className={styles.legalEntityContainer}>
            <div className={styles.legalEntity}>{ marginData.get(orgName) }</div>
            <div className={styles.legalEntityDetails}>
              <div>{ orgName } -</div>
              <div>Global Mutual Fund</div>
            </div>
          </div>
          <div className={styles.package}> {/* table outer div*/}
            { this.renderItem(marginData, assetsName, handlerSelectedItem, firstLevelList, secondLevelList, onSelectSecondLevelItem) }
          </div>

          <div className={styles.sectionText}> {/* two row div for bold*/}
            {diffCal}
            {adjCal}
            <div className={styles.sectionRow}> {/* one row div*/}
              <div className={styles.packageLeft}>
                <div>Total Amount</div>
              </div>
              <div className={styles.packageRight}>
                {numberWithCommas(
                  this.getTotalAmount(marginData.get(assetsName)) +
                  (adjAmt ? Number.parseInt(adjAmt) : 0.0)
                )}
              </div>
            </div>
            {/*<div className={styles.sectionRow}> /!* one row div*!/*/}
            {/*<div className={styles.packageLeft}>*/}
            {/*<div>Total Reconciled</div>*/}
            {/*</div>*/}
            {/*<div className={styles.packageRight}>*/}
            {/*{numberWithCommas(this.getTotalReconAmount(marginData.get(assetsName)))}*/}
            {/*</div>*/}
            {/*</div>*/}
          </div>
        </div>
    }

    return (
      <div className={styles.panel + " " + (isHidePanel ? styles.hidePanel : "")}>
        {displayAssets}
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
              {(handlerTotalMargin(marginData, assetsName)/ 1000000).toFixed(2)}
            </div>
            <div className={styles.marginUnit}>Millions</div>
          </div>
          <div className={styles.tradeDetails}> </div>
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
  isHidePanel: PropTypes.bool,
  handlerUpdateAdj: PropTypes.func,
  adjAmt: PropTypes.number
}

MarginAgreementPortfolio.defaultProps = {
  isHidePanel: false,
  handlerUpdateAdj: null,
  adjAmt: 0.0
}
