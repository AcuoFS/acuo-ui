import React from 'react'
import styles from './MarginCall.css'
import ContentRows from './MarginCallRows'
import {checkBox, checkBoxWithTick} from '../../../images/common'
import ChangeCallAmountPopup from './sub-components/ChangeCallAmountPopup'
import marginCallData from '../../data/data'


export default class MarginCall extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openedRows: [],
      isChecked: false,
      isShowPopup: false,
      marginCallUploadId: '',
      totalCallAmount: '',
      selectedRows: []
    }

    this.openRow = this.openRow.bind(this)
    this.toggleIsChecked = this.toggleIsChecked.bind(this)
    this.onTotalCallAmt = this.onTotalCallAmt.bind(this)
    this.clearPopup = this.clearPopup.bind(this)
    this.onSingleRow = this.onSingleRow.bind(this)

    // TODO: should be fetched from endpoint. This is the interim mock data
    props.onGetMarginUploadData(marginCallData)
  }

  toggleIsChecked() {
    this.setState(state => {
      const currIsCheckedValue = state.isChecked
      return Object.assign({}, state, {isChecked: !currIsCheckedValue})
    })

    // check all
    if (!this.state.isChecked) {
      this.setState({
        selectedRows: [...this.props.uploadData]
      })
    }
    // uncheck all
    else {
      this.setState({
        selectedRows: []
      })
    }
  }

  openRow(e) {
    //console.log(this.toggleRow(this.state.openedRows, e.currentTarget.dataset.ref))
    this.setState({
      openedRows: this.toggleRow(this.state.openedRows, e.currentTarget.dataset.ref)
    })
  }

  toggleRow(arr, index) {
    console.log(arr.length)
    if (arr.length) {
      if (arr.indexOf(index) > -1)
        console.log(arr.splice(arr.indexOf(index), 1))
      else
        console.log(arr.push(index))
    } else {
      console.log(arr.push(index))
    }
  }

  onTotalCallAmt(totalCallAmount, marginCallUploadId) {
    this.setState({
      isShowPopup: true,
      marginCallUploadId: marginCallUploadId,
      totalCallAmount: totalCallAmount
    })
  }

  clearPopup() {
    this.setState({
      isShowPopup: false,
      marginCallUploadId: '',
      totalCallAmount: ''
    })
  }

  onSingleRow(rowObj, actionIsChecked) {
    // check action coming from row
    if (actionIsChecked) {
      this.setState({
        selectedRows: [...this.state.selectedRows, rowObj]
      })
    }
    // uncheck action from row
    else {
      this.setState({
        selectedRows: this.state.selectedRows.filter(row =>
        row.mgnCallUploadId != rowObj.mgnCallUploadId)
      })
    }
  }

  onSendButton(selectedRows) {
    // todo: API call to endpoint should be here
    alert('selected ids: ' + selectedRows.map(row => row.mgnCallUploadId))
  }

  render() {
    return (
      <div className={styles.container}>
        <ChangeCallAmountPopup propIsShow={this.state.isShowPopup}
                               propDeliverAmt=
                                 {Number.parseInt(this.state.totalCallAmount ? this.state.totalCallAmount : 0)}
                               propCurrentId={this.state.marginCallUploadId}
                               propHandlerClearPopup={this.clearPopup}
                               propHandlerSave={this.props.onUpdateMarginCallUpload}/>

        <div className={styles.header}>
          <div className={styles.title}>Margin Call</div>
          <div className={styles.button} onClick={() => this.onSendButton(this.state.selectedRows)}>
            Send selected Margin Calls
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.masterRow}>
            <div className={styles.cell}>
              {/*<input type="checkbox" checked={this.state.isChecked} onChange={this.toggleIsChecked} />*/}
              <img onClick={this.toggleIsChecked}
                   src={this.state.isChecked ? checkBoxWithTick : checkBox}/>
            </div>
            <div className={styles.cell}>Legal Entity</div>
            <div className={styles.cell}>Cpty Organisation</div>
            <div className={styles.cell}>Cpty Entity</div>
            <div className={styles.cell}>Margin Agreement</div>
            <div className={styles.cell + ' ' + styles.dateCell}>Valuation Date</div>
            <div className={styles.cell + ' ' + styles.dateCell}>Call Date</div>
            <div className={styles.cell + ' ' + styles.callTypeCell}>Call Type</div>
            <div className={styles.cell + ' ' + styles.ccyCell}>CCY</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Total Call Amount</div>
            <div className={styles.cell}>Reference Identifier</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Exposure</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Collateral Value</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Pending Collateral</div>
            <div className={styles.cell}></div>
          </div>

          <ContentRows spillContents={this.openRow} isChecked={this.state.isChecked}
                       isOpen={this.state.openedRows.indexOf(1) > -1}
                       propHandlerOnTotalMargin={this.onTotalCallAmt}
                       propMarginCallUploadData={this.props.uploadData}
                       propHandlerSingleRow={this.onSingleRow}/>
          {/*<ContentRows spillContents={this.openRow} isChecked={this.state.isChecked} isOpen={this.state.openedRows.indexOf(2) > -1}/>*/}
        </div>
      </div>
    )
  }
}
