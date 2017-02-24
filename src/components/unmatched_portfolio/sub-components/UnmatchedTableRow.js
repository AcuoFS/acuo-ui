import React from 'react'
import {checkBox, checkBoxWithTick} from '../../../../images/common'
import styles from './UnmatchedTable.css'


export default class UnmatchedTableRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // isChecked: _.some(props.selectedList,
      //   (selectedItem) => selectedItem.msId == props.portfolio.msId)
      // Set checkbox if list contains this portfolio
      isChecked: props.selectedList.includes(props.portfolio)
    }

    this.onCheck = this.onCheck.bind(this)
  }

  onCheck(portfolio) {
    // Send to parent
    this.props.onTableRow(portfolio, !this.state.isChecked)

    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  render() {
    const {portfolio} = this.props
    return (
      <div className={styles.unmatchedTableRow}>
        <div className={styles.unmatchedTableCell}>
          <img src={this.state.isChecked ? checkBoxWithTick : checkBox} onClick={() => this.onCheck(portfolio)}/>
        </div>
        <div className={styles.unmatchedTableCell}>{portfolio.counterparty}</div>
        <div className={styles.unmatchedTableCell}>{portfolio.netTotalIm}</div>
        <div className={styles.unmatchedTableCell}>{portfolio.netVmCall}</div>
        <div className={styles.unmatchedTableCell}>{portfolio.interestPayment}</div>
        <div className={styles.unmatchedTableCell}>{portfolio.productCashFlow}</div>
        <div className={styles.unmatchedTableCell}>{portfolio.dailyPai}</div>
        <div className={styles.unmatchedTableCell}>{portfolio.feesComms}</div>
        <div className={styles.unmatchedTableCell}>{portfolio.pendingNonCash}</div>
        <div className={styles.unmatchedTableCell}>{portfolio.pendingCash}</div>
      </div>
    )
  }
}