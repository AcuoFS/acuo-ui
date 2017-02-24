import React from 'react'
import {POPUP_TAB_EARMARK} from'../../../../../constants/CollateralTypes'
import styles from '../../../Pledge.css'


export default class CollateralEarmarkCollateralTab extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isAssetValidToEarmark: false,
      earmarkAmount: '0.00'
    }

    this.earmarkAmount = null
    this.validateEarmarkForm = this.validateEarmarkForm.bind(this)
    this.changeEarmarkAmount = this.changeEarmarkAmount.bind(this)
  }

  changeEarmarkAmount(e) {
    this.setState({
      earmarkAmount: e.target.value
    }, this.validateEarmarkForm)
  }

  validateEarmarkForm() {
    const isAllInputFilled =
      !(this.earmarkAmount.value == "0" || this.earmarkAmount.value.trim() == "")

    this.setState({
      isAssetValidToEarmark: isAllInputFilled
    })
  }

  render(){
    const {
      checkContent,
      checkAmountExceeding,
      rawPrice
    } = this.props

    return (
      <div className={styles.tabbedContent + ' ' + checkContent(POPUP_TAB_EARMARK)}>
        <div className={styles.popupRow}>
          <div className={styles.popupText}> Amount
          </div>
          <div className={styles.popupInputBox}>
            <input type="number" className={styles.popupInputBox}
                   ref={dom => this.earmarkAmount = dom} value={this.state.earmarkAmount}
                   onChange={(e) => {this.changeEarmarkAmount(e)}}/>
          </div>
        </div>

        <div className={styles.popupRow}>
          <div className={styles.popupText}>
          </div>
          <div className={styles.popupInputBox}>
            <div className={styles.helperText}>Amount rounded down to nearest unit value</div>
            {checkAmountExceeding(rawPrice, this.state.earmarkAmount)}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" disabled={!this.state.isAssetValidToEarmark}
                  className={this.state.isAssetValidToEarmark ?
                    styles.btnEnabled : styles.btnDisabled}>
            Earmark
          </button>
        </div>
      </div>

    )
  }
}