import React from 'react'
import styles from './MarginCall.css'
import MarginCallRow from './MarginCallRow'
import {checkBox, checkBoxWithTick} from '../../../images/common'
import ChangeCallAmountPopup from './sub-components/ChangeCallAmountPopup'
import LoadingBarSpinner from './../common/LoadingBarSpinner/LoadingBarSpinner'

export default class MarginCall extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openedRows: [],
      isChecked: false,
      isShowPopup: false,
      marginCallUploadId: '',
      popUpX: 0,
      popUpY: 0,
      totalCallAmount: '',
      selectedRows: []
    }

    this.openRow = this.openRow.bind(this)
    this.toggleIsChecked = this.toggleIsChecked.bind(this)
    this.onTotalCallAmt = this.onTotalCallAmt.bind(this)
    this.clearPopup = this.clearPopup.bind(this)
    this.onSingleRow = this.onSingleRow.bind(this)

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

  onTotalCallAmt(totalCallAmount, marginCallUploadId, pageX, pageY, rowExpansionState) {
    this.setState({
      isShowPopup: true,
      marginCallUploadId: marginCallUploadId,
      totalCallAmount: totalCallAmount,
      popUpX: pageX,
      popUpY: pageY,
      isCurrentRowExpanded: rowExpansionState
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

  onSendButton(selectedRows, onPostMarginCallIDs) {
    onPostMarginCallIDs(selectedRows.map(row => row.referenceIdentifier))
  }

  render() {

    const { uploadDataFlag, requestingValuation, onPostMarginCallIDs } = this.props

    return (
      <div className={styles.container + ' ' + (requestingValuation || uploadDataFlag ? '' : styles.hidden)}>
        <ChangeCallAmountPopup propIsShow={this.state.isShowPopup}
                               propDeliverAmt=
                                 {Number.parseInt(this.state.totalCallAmount ? this.state.totalCallAmount : 0)}
                               propCurrentId={this.state.marginCallUploadId}
                               propHandlerClearPopup={this.clearPopup}
                               propHandlerSave={this.props.onUpdateMarginCallUpload}
                               popUpX={this.state.popUpX}
                               popUpY={this.state.popUpY}
                               isCurrentRowExpanded={this.state.isCurrentRowExpanded}/>

        <div className={styles.header}>
          <div className={styles.title}>Margin Call</div>
          <div className={styles.button + ' ' + (this.state.selectedRows.length <= 0 ? styles.disabled : '')} disabled={this.state.selectedRows.length <= 0} onClick={() => this.onSendButton(this.state.selectedRows, onPostMarginCallIDs)}>
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

          { uploadDataFlag ?
            this.props.uploadData.map((item, i) =>
              <MarginCallRow spillContents={this.openRow} isChecked={this.state.isChecked}
                             isOpen={this.state.openedRows.indexOf(1) > -1}
                             propHandlerOnTotalMargin={this.onTotalCallAmt}
                             propMarginCallUploadData={this.props.uploadData} row={item}
                             propHandlerSingleRow={this.onSingleRow}
                             key={i}/>
            )
            :
            <div className={styles.loadingContainer}>
              <LoadingBarSpinner text={'Valuation in progress'} />
            </div>

          }
        </div>
      </div>
    )
  }
}
