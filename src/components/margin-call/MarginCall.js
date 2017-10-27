import React from 'react'
import styles from './MarginCall.css'
import MarginCallRow from './MarginCallRow'
import {checkBox, checkBoxWithTick} from '../../../images/common'
import ChangeCallAmountPopup from './sub-components/ChangeCallAmountPopup'
import LoadingBarSpinner from './../common/LoadingBarSpinner/LoadingBarSpinner'
import _ from 'lodash'

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
      selectedRows: [],
      marginCallRows: []
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
        selectedRows: [...this.props.uploadData.map(x => x.portfolioId)]
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
    //console.log(arr.length)
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
    //console.log(rowObj)
    if (!actionIsChecked) {
      this.setState({
        selectedRows: [...this.state.selectedRows, rowObj.portfolioId],
      })
      if(rowObj.referenceIdentifier){
        this.setState({
          marginCallRows: [...this.state.marginCallRows, rowObj.referenceIdentifier],
        })
      }
    }
    // uncheck action from row
    else {
      let marginCallRows = []

      let selectedRows = this.state.selectedRows.filter(row =>
      row !== rowObj.portfolioId)

      if(rowObj.referenceIdentifier){
        console.log(rowObj.referenceIdentifier)
        console.log(this.state.marginCallRows)
        marginCallRows =  this.state.marginCallRows.filter(row =>
        row !== rowObj.referenceIdentifier)

        console.log(marginCallRows)
      }
      this.setState({
        marginCallRows: marginCallRows,
        selectedRows: selectedRows
      })
    }
  }

  onSendButton(selectedRows, onPostMarginCallIDs) {
    console.log(selectedRows)
    onPostMarginCallIDs(selectedRows)
  }

  componentDidUpdate() {
    if(this.state.selectedRows.length){
      let marginCallRows = this.props.uploadData.filter(x => _.has(x, 'referenceIdentifier') && (_.indexOf(this.state.selectedRows, x.portfolioId) >= 0 ) ).map(x => x.referenceIdentifier)
      if(!_.isEqual(this.state.marginCallRows, marginCallRows))
        this.setState({
          marginCallRows: marginCallRows
        })
    }

    //   this.setState({
    //     marginCallRows:
    //   })
  }

  render() {

    const { uploadDataFlag, requestingValuation, onPostMarginCallIDs, onRequestValuation, requestValuation, generateMarginCalls, requestingMCGenerationOrValuation } = this.props

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
          <div className={styles.button + ' ' + (this.state.selectedRows.length <= 0 ? styles.disabled : '')}
               disabled={this.state.selectedRows.length <= 0}
               onClick={() => requestValuation(this.state.selectedRows)}>
            Request Valuation
          </div>
          <div className={styles.button + ' ' + (this.state.selectedRows.length <= 0 ? styles.disabled : '')}
               disabled={this.state.selectedRows.length <= 0}
               onClick={() => generateMarginCalls(this.state.selectedRows)}>
            Generate Margin Calls
          </div>
          <div className={styles.button + ' ' + (this.state.marginCallRows.length <= 0 ? styles.disabled : '')}
               //disabled={this.state.selectedRows.length <= 0}
               disabled={true}
               onClick={() => this.onSendButton(this.state.marginCallRows, onPostMarginCallIDs)}>
            Send Margin Calls
          </div>
        </div>
        <div className={styles.content + ' ' + (requestingMCGenerationOrValuation ? styles.requesting : '')}>
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
            <div className={styles.cell + ' ' + styles.callTypeCell}>Portfolio</div>
            <div className={styles.cell + ' ' + styles.dateCell}>Valuation Date</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Exposure</div>
            <div className={styles.cell + ' ' + styles.callTypeCell}>Call Type</div>
            <div className={styles.cell + ' ' + styles.dateCell}>Call Date</div>
            <div className={styles.cell + ' ' + styles.ccyCell}>CCY</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Total Call Amount</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Collateral Value</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Pending Collateral</div>
            <div className={styles.cell}></div>
          </div>

          { uploadDataFlag ?
            this.props.uploadData.map((item, i) => {
            //console.log(this.state.selectedRows.filter(x => x === item.portfolioId))
              return <MarginCallRow spillContents={this.openRow} isChecked={this.state.isChecked}
                             isOpen={this.state.openedRows.indexOf(1) > -1}
                             propHandlerOnTotalMargin={this.onTotalCallAmt}
                             propMarginCallUploadData={this.props.uploadData} row={item}
                             propHandlerSingleRow={this.onSingleRow}
                             key={i}
                             selected={!!this.state.selectedRows.filter(x => x === item.portfolioId).length}/>}
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
