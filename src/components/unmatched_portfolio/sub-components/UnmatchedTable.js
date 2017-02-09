import React from 'react'
import {checkBox} from '../../../../images/common'
import {UNMATCHED_PORTFOLIO_URL} from '../../../constants/APIcalls'
import styles from './UnmatchedTable.css'


export default class UnmatchedTable extends React.Component {
render() {
    const {unmatchedPortfolios} = this.props
    /**
     * format:
     * {
    "msId": "msp7",
    "counterparty": "DBS",
    "netTotalIm": 100000.0,
    "netVmCall": 50000.0,
    "interestPayment": 1000.0,
    "productCashFlow": 500.0,
    "dailyPai": 100.0,
    "feesComms": 100.0,
    "pendingNonCash": 0.0,
    "pendingCash": 1000.0
    },
     */
    let rows = unmatchedPortfolios.map(portfolio => (
      <div className={styles.unmatchedTableRow} key={portfolio.msId}>
        <div className={styles.unmatchedTableCell}><img src={checkBox}/></div>
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
    ))

    return (
      <div className={styles.unmatchedTable}>
        <div className={styles.unmatchedTableHeader}>
          <div className={styles.unmatchedTableCell}></div>
          <div className={styles.unmatchedTableCell}>Counterparty</div>
          <div className={styles.unmatchedTableCell}>Net Total IM</div>
          <div className={styles.unmatchedTableCell}>Net VM Call (SGD)</div>
          <div className={styles.unmatchedTableCell}>Interest Payment (IM)</div>
          <div className={styles.unmatchedTableCell}>Product Cash Flows</div>
          <div className={styles.unmatchedTableCell}>Daily PAI</div>
          <div className={styles.unmatchedTableCell}>Fees & Comms</div>
          <div className={styles.unmatchedTableCell}>Pending Non-Cash</div>
          <div className={styles.unmatchedTableCell}>Pending Cash</div>
        </div>

        {rows}
      </div>
    )
  }
}