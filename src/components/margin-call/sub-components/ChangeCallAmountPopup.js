import React, {PropTypes} from 'react'
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
    this.onDeliverChange = this.onDeliverChange.bind(this)
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
    alert('state: ' + JSON.stringify(this.state))

    // TODO: update to endpoint
  }

  onReturnChange(e) {
    this.setState({
      returnAmt: e.target.value
    })
  }

  onDeliverChange(e) {
    this.setState({
      deliverAmt: e.target.value
    })
  }

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
            <div className={styles.formInput}><input type="number" className={styles.inputStyle}
                                                     value={this.state.returnAmt}
                                                     onChange={(e) => this.onReturnChange(e)}/>
            </div>
          </div>
          <div className={styles.flexRow}>
            <div className={styles.formLabel}>Deliver Amount</div>
            <div className={styles.formInput}><input type="number" className={styles.inputStyle}
                                                     value={this.state.deliverAmt}
                                                     onChange={(e) => this.onDeliverChange(e)}/>
            </div>
          </div>
          <div className={styles.flexRow}>
            <div className={styles.formLabel}>Total Call Amount</div>
            <div className={styles.formInput}><input disabled type="number" className={styles.inputStyle}
                                                     value={Number(this.state.returnAmt)
                                                     + Number(this.state.deliverAmt)}/>
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
  propHandlerClearPopup: PropTypes.func.isRequired
}