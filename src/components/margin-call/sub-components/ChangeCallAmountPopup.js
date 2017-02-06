import React, {PropTypes} from 'react'
import {numberWithCommas} from '../../../utils/numbersWithCommas'
import styles from './ChangeCallAmountPopup.css'


export default class ChangeCallAmountPopup extends React.Component {
  constructor(props) {
    super(props)

    const {propCurrentId, propDeliverAmt, propTotalCallAmt} = props

    this.state = {
      currentId: propCurrentId,
      returnAmt: 0,
      deliverAmt: propDeliverAmt
    }

    this.onCancel = this.onCancel.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onReturnChange = this.onReturnChange.bind(this)
    // this.onDeliverChange = this.onDeliverChange.bind(this)
  }

  // When there's update in props from parent, use parent's values and clear returnAmt
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentId: nextProps.propCurrentId,
      returnAmt: 0,
      deliverAmt: nextProps.propDeliverAmt
    })
  }

  onCancel() {
    this.props.propHandlerClearPopup()
  }

  onSave() {
    // TODO: update to endpoint
    this.props.propHandlerSave(Number(this.state.returnAmt)
      + Number(this.state.deliverAmt), this.state.currentId)

    this.onCancel()
  }

  onReturnChange(e) {
    this.setState({
      returnAmt: e.target.value
    })
  }

  // onDeliverChange(e) {
  //   this.setState({
  //     deliverAmt: e.target.value
  //   })
  // }

  render() {
    const {
      propIsShow
    } = this.props

    return (
      <div className={styles.popupPanel + ' ' + (propIsShow ? styles.showPopup : '')}>
        <div className={styles.popupHeader}>Edit Total Call Amount</div>
        <div>
          <div className={styles.flexRow}>
            <div className={styles.formLabel}>Return Amount</div>
            <div className={styles.formInput}>
              <input type="number" className={styles.inputStyle}
                     value={this.state.returnAmt}
                     onChange={(e) => this.onReturnChange(e)}/>
            </div>
          </div>
          <div className={styles.flexRow}>
            <div className={styles.formLabel}>Deliver Amount</div>
            <div className={styles.formInput}>
              <input disabled type="text" className={styles.inputStyle}
                     value={numberWithCommas(this.state.deliverAmt)}/>
            </div>
          </div>
          <div className={styles.flexRow}>
            <div className={styles.formLabel}>Total Call Amount</div>
            <div className={styles.formInput}>
              <input disabled type="text" className={styles.inputStyle}
                     value={numberWithCommas((Number(this.state.returnAmt)
                     + Number(this.state.deliverAmt)))}/>
            </div>
          </div>
        </div>
        <div className={styles.btnCont}>
          <button className={styles.buttonStyle + ' ' + styles.cancelButtonStyle} onClick={this.onCancel}>Cancel
          </button>
          <button className={styles.buttonStyle} onClick={this.onSave}>Save</button>
        </div>
      </div>
    )
  }
}

ChangeCallAmountPopup.PropTypes = {
  propIsShow: PropTypes.bool.isRequired,
  propDeliverAmt: PropTypes.number.isRequired,
  propCurrentId: PropTypes.string.isRequired,
  propHandlerClearPopup: PropTypes.func.isRequired,
  propHandlerSave: PropTypes.func.isRequired
}