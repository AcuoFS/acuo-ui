import React from 'react'
import styles from './MarginCall.css'
import MarginCallRow from './MarginCallRow'
import {checkBox, checkBoxWithTick} from '../../../images/common'
import ChangeCallAmountPopup from './sub-components/ChangeCallAmountPopup'
import LoadingBarSpinner from './../common/LoadingBarSpinner/LoadingBarSpinner'
import VariableCheckbox from './sub-components/VariableCheckbox'
// import _ from 'lodash'

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
      // selectedRows: [],
      // marginCallRows: []
    }

    this.openRow = this.openRow.bind(this)
    // this.toggleIsChecked = this.toggleIsChecked.bind(this)
    this.onTotalCallAmt = this.onTotalCallAmt.bind(this)
    this.clearPopup = this.clearPopup.bind(this)
    // this.onSingleRow = this.onSingleRow.bind(this)

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

  onSendButton(selectedRows, onPostMarginCallIDs) {
    // console.log(selectedRows)
    onPostMarginCallIDs(selectedRows)
  }

  componentDidUpdate() {
    // if(this.state.selectedRows.length){
    //   let marginCallRows =
    //     this.props.uploadData.filter(x => _.has(x, 'referenceIdentifier') && (_.indexOf(this.state.selectedRows, x.portfolioId) >= 0 )).map(x => x.referenceIdentifier)
    //   if(!_.isEqual(this.state.marginCallRows, marginCallRows))
    //     this.setState({
    //       marginCallRows: marginCallRows
    //     })
    // }

    //   this.setState({
    //     marginCallRows:
    //   })
  }

  render() {

    const { uploadDataFlag, requestingValuation, requestingMCGenerationOrValuation, selectedRows, marginCallRows, variableOptions, //state
      onPostMarginCallIDs, onRequestValuation, requestValuation, generateMarginCalls, onToggleRow, onToggleAllRows, onToggleVariableFilter } = this.props //dispatch

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
          <div className={styles.button + ' ' + (selectedRows.length <= 0 || requestingMCGenerationOrValuation ? styles.disabled : '')}
               disabled={selectedRows.length <= 0}
               onClick={() => requestValuation(selectedRows)}>
            Request Valuation
          </div>
          <div className={styles.button + ' ' + (selectedRows.length <= 0 || requestingMCGenerationOrValuation ? styles.disabled : '')}
               disabled={selectedRows.length <= 0}
               onClick={() => generateMarginCalls(selectedRows)}>
            Generate Margin Calls
          </div>
          <div className={styles.button + ' ' + (marginCallRows.length <= 0 || requestingMCGenerationOrValuation ? styles.disabled : '')}
               //disabled={selectedRows.length <= 0}
               disabled={true}
               onClick={() => this.onSendButton(marginCallRows, onPostMarginCallIDs)}>
            Send Margin Calls
          </div>
        </div>
        <div className={styles.content + ' ' + (requestingMCGenerationOrValuation ? styles.requesting : '')}>
          <div className={styles.masterRow}>
            <div className={styles.cell}>
              {/*<input type="checkbox" checked={this.state.isChecked} onChange={this.toggleIsChecked} />*/}
              {/*<img onClick={onToggleAllRows}*/}
                   {/*src={selectedRows.length === this.props.uploadData.length ? checkBoxWithTick : checkBox}/>*/}
              <VariableCheckbox
                options={variableOptions}
                onVariableClick={onToggleVariableFilter}
                onToggleAll={onToggleAllRows}
                selectedRowSize={selectedRows.length}
                totalRowSize={this.props.uploadData.length} />
            </div>
            <div className={styles.cell}>Legal Entity</div>
            <div className={styles.cell}>Cpty Organisation</div>
            <div className={styles.cell}>Cpty Entity</div>
            <div className={styles.cell}>Margin Agreement</div>
            <div className={styles.cell + ' ' + styles.ccyCell}>Portfolio</div>
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
            //console.log(selectedRows.filter(x => x === item.portfolioId))
              return <MarginCallRow spillContents={this.openRow} isChecked={this.state.isChecked}
                             isOpen={this.state.openedRows.indexOf(1) > -1}
                             propHandlerOnTotalMargin={this.onTotalCallAmt}
                             propMarginCallUploadData={this.props.uploadData} row={item}
                             propHandlerSingleRow={onToggleRow}
                             key={i}
                             selected={!!selectedRows.filter(x => x === item.portfolioId).length}/>}
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
