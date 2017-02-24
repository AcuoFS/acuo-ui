import React from 'react'
import UnmatchedTableRow from './UnmatchedTableRow'
import _ from 'lodash'
import {UNMATCHED_PORTFOLIO_URL} from '../../../constants/APIcalls'
import styles from './UnmatchedTable.css'


export default class UnmatchedTable extends React.Component {
  componentWillMount() {
    const {onInitUnmatchedPortfolio, unmatchedPortfolios} = this.props

    // Fetch only when unmatched portfolio list is empty
    if (unmatchedPortfolios.length == 0) {
      fetch(UNMATCHED_PORTFOLIO_URL).then((response) => {
        return response.json()
      }).then((obj) => {
        onInitUnmatchedPortfolio(obj.items)
      })
    }
  }

  render() {
    const {
      unmatchedPortfolios,
      onTableRow,
      filterText,
      selectedList
    } = this.props
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
    const filteredByCounterPty = _.filter(unmatchedPortfolios,
      o => _.toUpper(o.counterparty).match(new RegExp(_.toUpper(filterText))))

    let rows = filteredByCounterPty.map(portfolio => (
      <UnmatchedTableRow portfolio={portfolio} key={portfolio.msId}
                         onTableRow={onTableRow}
                         selectedList={selectedList}/>
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