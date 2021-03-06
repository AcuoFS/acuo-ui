import React from 'react';
import PropTypes from 'prop-types'
import styles from '../MarginAgreementList.css'
// import Dropdown from '../../Dropdown/Dropdown'
import {reconDisputeReasonCodes}from '../../../mappings'
import {Map} from 'immutable'
import _ from 'lodash'
import Select from 'react-select'// react-select using styles from src/static/react-select/react-select.css


export default class Dispute extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      formDisputeAmt: this.getDifferencePortfolio(this.props.marginData),
      formAgreedAmt: this.getTotalAmount(this.props.marginData.get('clientAssets')),
      formReasonCodes: [],
      formComments: _.reduce(this.disputeComments(this.props.marginData), (sum, x) => (x + '; ' + sum), ''),
      formMtm: '',
      formBalance: ''
    }

    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.onDropdownItemChange = this.onDropdownItemChange.bind(this)
    this.isValidForm = this.isValidForm.bind(this)
    this.submitDisputeForm = this.submitDisputeForm.bind(this)
    this.isUpdatedForm = this.isUpdatedForm.bind(this)
    this.logChange = this.logChange.bind(this)
  }

  logChange(val) {
    this.setState({
      formReasonCodes: val
    })
  }

  componentDidUpdate() {
    if (!this.props.isHidePanel && !this.isUpdatedForm()) {
      // this.disAmtInput.focus()
    }
  }

  toggleDropDown(e) {
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

  onDropdownItemChange(e, optionCode) {
    this.setState({formReasonCodes: optionCode})

    e.stopPropagation()
  }

  isNotBlankText(str) {
    return String(str).trim() !== ''
  }

  isUpdatedText(str) {
    return str !== ''
  }

  isUpdatedForm() {
    return this.isUpdatedText(this.state.formDisputeAmt) || this.isUpdatedText(this.state.formAgreedAmt) ||
      this.isUpdatedText(this.state.formReasonCodes) || this.isUpdatedText(this.state.formMtm) ||
      this.isUpdatedText(this.state.formBalance)
  }

  isValidForm() {
    return this.isNotBlankText(this.state.formDisputeAmt) && this.isNotBlankText(this.state.formAgreedAmt) &&
      this.isNotBlankText(this.state.formReasonCodes) && this.isNotBlankText(this.state.formMtm) &&
      this.isNotBlankText(this.state.formBalance)
  }

  getReasonCodesAsDropdown(reasonCodes) {
    let dd = []

    _.forOwn(reasonCodes, (value, key) => {
      let ddItem = {}
      _.set(ddItem, 'label', value)
      _.set(ddItem, 'value', key)

      dd = [...dd, ddItem]
    })

    return dd
  }

  submitDisputeForm() {
    const disputeObjToSend = {
      msId: this.props.marginData.get('GUID'),
      disputedAmount: this.state.formDisputeAmt,
      agreedAmount: this.state.formAgreedAmt,
      reasonCodes: this.state.formReasonCodes,
      comments: this.state.formComments,
      mtm: this.state.formMtm,
      balance: this.state.formBalance
    }

    this.props.sendDisputeToBack(disputeObjToSend)
  }

  disputeComments(marginData) {
    const data = marginData.toJS()

    return _.unionWith(
      _.reduce(data.clientAssets, (sum, x) =>
        _.concat(sum,
          _.reduce(x.data, (sum, y) =>
            _.concat(sum, (y.firstLevel.secondLevelCount ?
              _.reduce(y.firstLevel.secondLevel, (sum, z) =>
                _.concat(sum, (z.tolerance ? z.name : [])), []) :
              (y.firstLevel.tolerance ? y.firstLevel.name : []))), [])), []),
      _.reduce(data.counterpartyAssets, (sum, x) =>
        _.concat(
          _.reduce(x.data, (sum, y) =>
            _.concat(sum, (y.firstLevel.secondLevelCount ?
              _.reduce(y.firstLevel.secondLevel, (sum, z) =>
                _.concat(sum, (z.tolerance ? z.name : [])), []) :
              (y.firstLevel.tolerance ? y.firstLevel.name : []))), [])), [])
      , _.isEqual)

  }

  getTotalAmount(asset) {
    if (asset) {
      return asset.reduce((sum, x) => {
        return parseFloat(sum) + parseFloat(x.get('data').reduce((sum, y) => {
            return parseFloat(sum) + parseFloat(y.getIn(['firstLevel', 'amount']))
          }, 0))
      }, 0).toFixed(2)
    } else {
      return 0
    }
  }

  getDifferencePortfolio(marginData, assetsName = 'clientAssets') {
    let diff = 0
    if ('clientAssets' === assetsName) {
      diff = this.getTotalAmount(marginData.get('counterpartyAssets')) -
        this.getTotalAmount(marginData.get(assetsName))

    }
    return Math.abs(diff).toFixed(2)
  }

  render() {
    const {
      marginData, orgName, isHidePanel, isDisputed
    } = this.props

    return (
      <div className={styles.panelDispute + " " + (isHidePanel ? styles.hidePanel : "")}>
        <div className={styles.firstRow}>
          <div className={styles.legalEntityContainerDispute}>
            <div className={styles.legalEntityContainer}>
              <div className={styles.legalEntity}>{ marginData.get(orgName) }</div>
              <div className={styles.legalEntityDetails}>
                <div>{ orgName } -</div>
                <div>Global Mutual Fund</div>
              </div>
            </div>
          </div>

          <div className={styles.currencyDispute}>
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
          </div>
        </div>


        <form>
          <div className={styles.secondRow}> {/* two row div for bold*/}
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Dispute Amount
              </div>
              <input type="number"
                     className={isDisputed ? styles.inputBoxDisabled : styles.inputBox}
                     onChange={(e) => this.setState({formDisputeAmt: e.target.value})}
                     ref={dom => this.disAmtInput = dom}
                     disabled={isDisputed}
                     value={isDisputed
                       ? marginData.getIn(['disputeInfo', 'disputedAmount']) : this.state.formDisputeAmt}/>
              <div className={styles.usd}>USD</div>

            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Agreed Amount
              </div>
              <input type="number"
                     className={isDisputed ? styles.inputBoxDisabled : styles.inputBox}
                     onChange={(e) => this.setState({formAgreedAmt: e.target.value})}
                     disabled={isDisputed}
                     value={isDisputed
                       ? marginData.getIn(['disputeInfo', 'agreedAmount']) : this.state.formAgreedAmt}/>

              <div className={styles.usd}>USD</div>
            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Reason Codes
              </div>
              {isDisputed
                ? <input type="text" className={styles.inputBoxDisabled}
                         defaultValue={reconDisputeReasonCodes[marginData.getIn(['disputeInfo', 'reasonCodes'])]}
                         disabled/>
                : <div className={styles.dropdownCont}>
                  {/*<Dropdown*/}
                  {/*handlerOnClick={this.toggleDropDown}*/}
                  {/*handleOnSelectedItemChange={this.onDropdownItemChange}*/}
                  {/*selectedOption=''*/}
                  {/*options={this.getReasonCodesAsDropdown(reconDisputeReasonCodes)}*/}
                  {/*nextTabIndex={this.generateNextTabIndex()}/>*/}
                  <Select
                    value={this.state.formReasonCodes}
                    options={this.getReasonCodesAsDropdown(reconDisputeReasonCodes)}
                    onChange={this.logChange}
                    multi={true}/>
                </div>}
            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Comments
              </div>

              <textarea type="text"
                     className={isDisputed ? styles.inputBoxDisabled : styles.inputBox}
                     onChange={(e) => this.setState({formComments: e.target.value})}
                     disabled={isDisputed}
                     value={isDisputed
                       ? marginData.getIn(['disputeInfo', 'comments']) : this.state.formComments}>
              </textarea>

            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> MTM
              </div>
              <input type="number"
                     className={isDisputed ? styles.inputBoxDisabled : styles.inputBox}
                     onChange={(e) => this.setState({formMtm: e.target.value})}
                     disabled={isDisputed}
                     value={isDisputed
                       ? marginData.getIn(['disputeInfo', 'mtm']) : this.state.formMtm}/>

              <div className={styles.usd}>USD</div>
            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Collateral Balance
              </div>
              <input type="number"
                     className={isDisputed ? styles.inputBoxDisabled : styles.inputBox}
                     onChange={(e) => this.setState({formBalance: e.target.value})}
                     disabled={isDisputed}
                     value={isDisputed
                       ? marginData.getIn(['disputeInfo', 'balance']) : this.state.formBalance}/>

              <div className={styles.usd}>USD</div>
            </div>
          </div>

          <div className={(!this.isValidForm() || isDisputed)
            ? styles.buttonContainerDisabled : styles.buttonContainerEnabled}>
            <button type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      this.submitDisputeForm()
                    }}
                    disabled={!this.isValidForm() || isDisputed}>Dispute
            </button>
          </div>

        </form>

      </div>
    )
  }
}

Dispute.propTypes = {
  marginData: PropTypes.instanceOf(Map).isRequired,
  orgName: PropTypes.string.isRequired,
  isHidePanel: PropTypes.bool,
  sendDisputeToBack: PropTypes.func.isRequired
}

Dispute.defaultProps = {
  isHidePanel: false
}
