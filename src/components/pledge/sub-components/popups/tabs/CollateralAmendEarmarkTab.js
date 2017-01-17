import React from 'react'
import styles from '../../../Pledge.css'


export default class CollateralEarmarkAmendTab extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isAssetValidToAmend: false,
      amendAmount: 0.00
    }

    this.amendAmount = null
    this.validateAmendForm = this.validateAmendForm.bind(this)
    this.changeAmendAmount = this.changeAmendAmount.bind(this)
  }

  changeAmendAmount(e) {
    this.setState({
      amendAmount: e.target.value
    }, this.validateAmendForm)
  }

  validateAmendForm() {
    const isAllInputFilled =
      !(this.amendAmount.value == "0" || this.amendAmount.value.trim() == "")

    this.setState({
      isAssetValidToAmend: isAllInputFilled
    })
  }

  render(){
    const {
      checkContent,
      checkAmountExceeding,
      rawPrice
    } = this.props

    return (
      <div className={styles.tabbedContent + ' ' + checkContent('amend')}>
        <div className={styles.popupRow}>
          <div className={styles.popupText}> Amount
          </div>
          <div className={styles.popupInputBox}>
            <input type="number" className={styles.popupInputBox}
                   ref={dom => this.amendAmount = dom} value={this.state.amendAmount}
                   onChange={(e) => {this.changeAmendAmount(e)}}/>
          </div>
        </div>

        <div className={styles.popupRow}>
          <div className={styles.popupText}>
          </div>
          <div className={styles.popupInputBox}>
            <div className={styles.helperText}>Amount rounded down to nearest unit value</div>
            {checkAmountExceeding(rawPrice, this.state.amendAmount)}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" disabled={!this.state.isAssetValidToAmend}
                  className={this.state.isAssetValidToAmend ?
                    styles.btnEnabled : styles.btnDisabled}>
            Earmark
          </button>
        </div>
      </div>

    )
  }
}