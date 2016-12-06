import React from 'react'
import styles from '../MarginAgreementList.css'
import Dropdown from '../../Dropdown/Dropdown'


export default class Dispute extends React.Component {

  constructor(props){
    super(props)
    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.state = {
      isDropDownSelected: false,
      isValidForm : false
    }

    this.onDropdownItemChange = this.onDropdownItemChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  toggleDropDown(e){
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

  onDropdownItemChange(e){
    this.setState({
      isDropDownSelected: true
    }, this.validateForm)

    e.stopPropagation();
  }

  validateForm(){
    const isAllInputFilled =
      !(this.disAmtInput.value.trim() == "") &&
      !(this.agreeAmtInput.value.trim() == "") &&
      this.state.isDropDownSelected &&
      !(this.mtmInput.value.trim() == "") &&
      !(this.collatBalInput.value.trim() == "")

    this.setState({
      isValidForm: isAllInputFilled
    })
  }


  render() {
    const {
      marginData, actStyle, orgName,
      assetsName, handlerTotalMargin, handlerSelectedItem
    } = this.props

    return (
      <div className={styles.panelDispute}>
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
              <input type="text" className={styles.inputBox} onChange={this.validateForm}
              ref={dom => this.disAmtInput = dom}/>
              <div className={styles.usd}>USD</div>

            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Agreed Amount
              </div>
              <input type="text" className={styles.inputBox} onChange={this.validateForm}
                     ref={dom => this.agreeAmtInput = dom}/>
              <div className={styles.usd}>USD</div>
            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Reason Code
              </div>
              <div className={styles.inputBox}>
                <Dropdown
                  handlerOnClick={this.toggleDropDown}
                  handleOnSelectedItemChange={this.onDropdownItemChange}
                  selectedOption='Select One'
                  options={['Portfolio Discrepancy', 'Initial Margin/ Independent Amount Discrepancy', 'Collateral Discrepancy'
                    ,'Agreement Discrepancy', 'Notification Time','Call Amount Discrepancy','MTM Discrepancy','Below Threshold Limit'
                    ,'Two Way Call','UnKnown Business Error','Other']} />
              </div>
            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Comments
              </div>
              <input type="text" className={styles.inputBox}/>
            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> MTM
              </div>
              <input type="text" className={styles.inputBox} onChange={this.validateForm}
                     ref={dom => this.mtmInput = dom}/>
              <div className={styles.usd}>USD</div>
            </div>
            <div className={styles.sectionRowDispute}> {/* one row div*/}
              <div className={styles.columnleft}> Collateral Balance
              </div>
              <input type="text" className={styles.inputBox} onChange={this.validateForm}
                     ref={dom => this.collatBalInput = dom}/>
              <div className={styles.usd}>USD</div>
            </div>
          </div>

          <div className={this.state.isValidForm ? styles.buttonContainerEnabled : styles.buttonContainerDisabled}>
            <button type="submit" disabled={true}>Dispute</button>
          </div>

        </form>


      </div>
    )
  }
}