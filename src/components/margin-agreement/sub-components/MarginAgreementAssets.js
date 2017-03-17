import React, {PropTypes} from 'react'
import {Map, List} from 'immutable'
import MarginAgreementDetail from './MarginAgreementDetail'
import {checkNegative} from '../../../utils'
import styles from '../MarginAgreementList.css'
import CounterPartyUpload from './CounterPartyUpload'
import selfStyles from './MarginAgreementAssets.css'


export const isEmptyCounterparty = (counterpartyData) => {
  return (counterpartyData.isEmpty() || !counterpartyData.first().get('data') ||
  (counterpartyData.first().get('data').isEmpty()))
}

export default class MarginAgreementPortfolio extends React.Component {
  constructor(props) {
    super(props)

    this.onAddAdjAmount = this.onAddAdjAmount.bind(this)
    this.onChangeAdjInput = this.onChangeAdjInput.bind(this)
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

  getDifferencePortfolio(assetsName, marginData) {
    let diff = 0
    if ('clientAssets' == assetsName) {
      diff = this.getTotalAmount(marginData.get('counterpartyAssets')) -
        this.getTotalAmount(marginData.get(assetsName))

    }
    return diff.toFixed(2)
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

  renderItem(marginData, assetsName, handlerSelectedItem, firstLevelList, secondLevelList, onSelectSecondLevelItem, party) {
    if (marginData.get(assetsName))
      return marginData.get(assetsName).sort().map((x) => {
        if (x.get('data') && !x.get('data').isEmpty()) {
          return (<div key={x.get('groupName')}>{x.get('data').sort((a, b) => a.getIn(['firstLevel', 'name']) > b.getIn(['firstLevel', 'name'])).map((groupData) => {
            const secondLevel = groupData.getIn(['firstLevel', 'secondLevel'])

            return <MarginAgreementDetail
              GUID={marginData.get('GUID')}
              topLevel={groupData.getIn(['firstLevel', 'name'])}
              firstLevelAmount={parseFloat(x.get('amount'))}
              key={groupData.getIn(['firstLevel', 'name']) + x.get('groupName')}
              totalAmount={parseFloat(groupData.getIn(['firstLevel', 'amount']))}
              secondLevel={secondLevel}
              handlerSelectedItem={handlerSelectedItem}
              firstLevelID={groupData.getIn(['firstLevel', 'id'])}
              firstLevelList={firstLevelList}
              secondLevelList={secondLevelList}
              id={groupData.getIn(['firstLevel', 'id'])}
              onSelectSecondLevelItem={onSelectSecondLevelItem}
              party={party}
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
      onSelectSecondLevelItem, isUploading, onTogglePortfolioPopup,
      party
    } = this.props

    let diff = this.getDifferencePortfolio(assetsName, marginData)
    // diff = (diff < 0) ? "(" + (diff * -1) + ")" : diff

    let diffCal, adjCal

    if ('clientAssets' == assetsName) {
      diffCal = <div className={styles.sectionRow}>
        <div className={styles.packageLeft}>
          <div>Difference</div>
        </div>
        <div className={styles.packageRight}>
          {checkNegative(diff)}
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

    if ('counterpartyAssets' == assetsName && isEmptyCounterparty(marginData.get(assetsName))) {
      let findDom

      // Display the upload widget when it's displayed on a popup
      if(isUploading){
        findDom =
          <div>
            <CounterPartyUpload/>
            <div className={selfStyles.comment}>or select from the list below</div>
          </div>
      }else{
        findDom =
          <div className={selfStyles.findPortfolio}
               onClick={() => onTogglePortfolioPopup()}>
            Find portfolio
          </div>
      }

      displayAssets =
        <div className={styles.section + ' ' + styles.left}>
          <div className={styles.legalEntityContainer}>
            <div className={styles.legalEntity + ' ' + styles.noMatched}>No matched Portfolio</div>
            {findDom}
          </div>

        </div>
    } else {
      displayAssets =
        <div className={styles.section + ' ' + styles.left}>

          <div className={styles.legalEntityContainer}>
            <div className={styles.legalEntity}>{ marginData.get(orgName) }</div>
            <div className={styles.legalEntityDetails}>
              {/*<div>{ orgName } -</div>*/}
              <div>{ marginData.get('agreementName') }</div>
            </div>
          </div>
          <div className={styles.package}> {/* table outer div*/}
            { this.renderItem(marginData, assetsName, handlerSelectedItem, firstLevelList, secondLevelList, onSelectSecondLevelItem, party) }
          </div>

          <div className={styles.sectionText}> {/* two row div for bold*/}
            {diffCal}
            {adjCal}
            <div className={styles.sectionRow}> {/* one row div*/}
              <div className={styles.packageLeft}>
                <div>Total Amount</div>
              </div>
              <div className={styles.packageRight}>
                {checkNegative(
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
              {checkNegative((handlerTotalMargin(marginData, assetsName)/ 1000000).toFixed(2))}
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
