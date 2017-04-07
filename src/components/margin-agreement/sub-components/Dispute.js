import React, {PropTypes} from 'react'
import styles from '../MarginAgreementList.css'
import Dropdown from '../../Dropdown/Dropdown'
import {reconDisputeReasonCodes}from '../../../mappings'
import {Map} from 'immutable'
import _ from 'lodash'


export default class Dispute extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      formDisputeAmt: '',
      formAgreedAmt: '',
      formReasonCode: '',
      formComments: '',
      formMtm: '',
      formBalance: ''
    }

    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.onDropdownItemChange = this.onDropdownItemChange.bind(this)
    this.isValidForm = this.isValidForm.bind(this)
    this.submitDisputeForm = this.submitDisputeForm.bind(this)
    this.isUpdatedForm = this.isUpdatedForm.bind(this)
  }

  componentDidUpdate() {
    if (!this.props.isHidePanel && !this.isUpdatedForm()) {
      this.disAmtInput.focus()
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
    this.setState({formReasonCode: optionCode})

    e.stopPropagation()
  }

  isNotBlankText(str) {
    return str.trim() !== ''
  }

  isUpdatedText(str) {
    return str !== ''
  }

  isUpdatedForm() {
    return this.isUpdatedText(this.state.formDisputeAmt) || this.isUpdatedText(this.state.formAgreedAmt) ||
      this.isUpdatedText(this.state.formReasonCode) || this.isUpdatedText(this.state.formMtm) ||
      this.isUpdatedText(this.state.formBalance)
  }

  isValidForm() {
    return this.isNotBlankText(this.state.formDisputeAmt) && this.isNotBlankText(this.state.formAgreedAmt) &&
      this.isNotBlankText(this.state.formReasonCode) && this.isNotBlankText(this.state.formMtm) &&
      this.isNotBlankText(this.state.formBalance)
  }

  getReasonCodesAsDropdown(reasonCodes) {
    let dd = []

    _.forOwn(reasonCodes, (value, key) => {
      let ddItem = {}
      _.set(ddItem, 'display', value)
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
      reasonCode: this.state.formReasonCode,
      comments: this.state.formComments,
      mtm: this.state.formMtm,
      balance: this.state.formBalance
    }

    this.props.sendDisputeToBack(disputeObjToSend)
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
              <input type="number" className={isDisputed ? styles.inputBoxDisabled : styles.inputBox}
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
              <input type="number" className={isDisputed ? styles.inputBoxDisabled : styles.inputBox}
                     onChange={(e) => this.setState({formAgreedAmt: e.target.value})}
                     disabled={isDisputed}
                     value={isDisputed
                       ? marginData.getIn(['disputeInfo', 'agreedAmount']) : this.state.formAgreedAmt}/>

              <div className={styles.usd}>USD</div>
            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Reason Code
              </div>
              {isDisputed
                ? <input type="text" className={styles.inputBoxDisabled}
                         defaultValue={reconDisputeReasonCodes[marginData.getIn(['disputeInfo', 'reasonCode'])]}
                         disabled/>
                : <div className={styles.dropdownCont}>
                  <Dropdown
                    handlerOnClick={this.toggleDropDown}
                    handleOnSelectedItemChange={this.onDropdownItemChange}
                    selectedOption=''
                    options={this.getReasonCodesAsDropdown(reconDisputeReasonCodes)}/>
                </div>}
            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Comments
              </div>
              <input type="text" className={isDisputed ? styles.inputBoxDisabled : styles.inputBox}
                     onChange={(e) => this.setState({formComments: e.target.value})}
                     disabled={isDisputed}
                     value={isDisputed
                       ? marginData.getIn(['disputeInfo', 'comments']) : this.state.formComments}/>

            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> MTM
              </div>
              <input type="number" className={isDisputed ? styles.inputBoxDisabled : styles.inputBox}
                     onChange={(e) => this.setState({formMtm: e.target.value})}
                     disabled={isDisputed}
                     value={isDisputed
                       ? marginData.getIn(['disputeInfo', 'mtm']) : this.state.formMtm}/>

              <div className={styles.usd}>USD</div>
            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Collateral Balance
              </div>
              <input type="number" className={isDisputed ? styles.inputBoxDisabled : styles.inputBox}
                     onChange={(e) => this.setState({formBalance: e.target.value})}
                     disabled={isDisputed}
                     value={isDisputed
                       ? marginData.getIn(['disputeInfo', 'balance']) : this.state.formBalance}/>

              <div className={styles.usd}>USD</div>
            </div>
          </div>

          <div className={(!this.isValidForm() || isDisputed)
            ? styles.buttonContainerDisabled : styles.buttonContainerEnabled}>
            <button type="submit" onClick={this.submitDisputeForm}
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
