import React from 'react'

import styles from './popup-allocate.css'
import Checkedbox from './../../../images/reconcile/checkboxwithtick.png'
import Uncheckbox from './../../../images/reconcile/checkbox.png'


export default class AllocatePopup extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      postHaircut: false,
      amount: this.props.existingAsset.netAmount
    }

    this.togglePostHaircut = this.togglePostHaircut.bind(this)
    this.updateAmount = this.updateAmount.bind(this)
  }

  // As of 26May17, only Variation and Initial Margin Types have been implemented.
  displayMarginType = input => {
    switch (input) {
      case "variationMargin":
        return "Variation"
      case "initialMargin":
        return "Initial"
      case "credit":
        return 'Credit'
      case "netted":
        return 'Netted'
      default:
        return "Error: No Margin Type Detected"
    }
  }// end displayMarginType()

  togglePostHaircut = () => {
    this.setState({
      postHaircut: !this.state.postHaircut
    })
  }

  updateAmount = (val) => {
    this.setState({
      amount: val
    })
  }

  render() {
    return (
      <div className={styles.screen}>
        <div className={styles.popup}>
          <div className={styles.closePopup}>
            <span onClick={ () => this.props.popupUnmount() }>X</span>
          </div>
          {/*{console.log(this.props.existingAsset)}*/}
          <div className={styles.row}>
            <div className={styles.label}>Original Asset</div>
            <div>{(this.props.existingAsset ? this.props.existingAsset.assetName : "Unallocated")}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>New Asset</div>
            <div>{this.props.allocatedAsset.propAsset}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Margin Agreement</div>
            <div>{this.props.agreementName}</div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Margin Type</div>
            <div>{this.displayMarginType(this.props.marginType)} </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Amount</div>
            <input type="text"
                   placeholder="Enter Amount"
                   className={styles.userInput}
                   value={this.state.amount} onChange={(e) => this.updateAmount(e.target.value)}/>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Post-Haircut</div>
            <div>
              <img src={this.state.postHaircut ? Checkedbox : Uncheckbox} onClick={this.togglePostHaircut}/>
            </div>
          </div>

          <div className={styles.row + ' ' + styles.lastRow}>
            <div className={styles.allocateBtn} title="Functionality Under Construction..." onClick={() => this.props.onReplaceAllocatedAsset({})}>Confirm</div>
          </div>
        </div>
      </div>
    )
  }

}
