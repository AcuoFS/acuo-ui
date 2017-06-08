import React from 'react';
import PropTypes from 'prop-types'
import {checkNegative} from '../../../utils'
import styles from './ChangeCallAmountPopup.css'
import _ from 'lodash'


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

  shouldComponentUpdate(nextProps){
    return !_.isEqual(this.props, nextProps)
  }

  render() {
    const {
      propIsShow,
      popUpX,
      popUpY,
      isCurrentRowExpanded
    } = this.props

    const xy = {
      'left': popUpX,
      'top': isCurrentRowExpanded ? popUpY + 100 : popUpY + 30
    }

    return (
      <div className={styles.popupPanel + ' ' + (propIsShow ? styles.showPopup : '')} style={xy}>
        <div className={styles.closeButton} onClick={this.onCancel}>
          x
        </div>
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
                     value={checkNegative(this.state.deliverAmt)}/>
            </div>
          </div>
          <div className={styles.flexRow}>
            <div className={styles.formLabel}>Total Call Amount</div>
            <div className={styles.formInput}>
              <input disabled type="text" className={styles.inputStyle}
                     value={checkNegative((Number(this.state.returnAmt)
                     + Number(this.state.deliverAmt)).toFixed(0))}/>
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