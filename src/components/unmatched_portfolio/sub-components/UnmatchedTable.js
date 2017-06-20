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

    const widths = [ 5, 16, 10, 10, 10, 10, 10, 10, 10, 10 ]
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
                         selectedList={selectedList}
                         widths={widths} />
    ))

    return (
      <div className={styles.tableGroup}>
        <div className={styles.headerRow}>
          <div className={styles.headerCell}
               ref={(node)=>{ if(node){ node.style.width = `${widths[0]}%` }} } />

          <div className={styles.headerCell}
               ref={(node)=>{ if(node){ node.style.width = `${widths[1]}%` }} }>
           Counterparty
          </div>

          <div className={styles.headerCell}
               ref={(node)=>{ if(node){ node.style.width = `${widths[2]}%` }} }>
           Net Total IM
          </div>

          <div className={styles.headerCell}
               ref={(node)=>{ if(node){ node.style.width = `${widths[3]}%` }} }>
           Net VM Call (SGD)
          </div>

          <div className={styles.headerCell}
               ref={(node)=>{ if(node){ node.style.width = `${widths[4]}%` }} }>
           Interest Payment (IM)
          </div>

          <div className={styles.headerCell}
               ref={(node)=>{ if(node){ node.style.width = `${widths[5]}%` }} }>
           Product Cash Flows
          </div>

          <div className={styles.headerCell}
               ref={(node)=>{ if(node){ node.style.width = `${widths[6]}%` }} }>
           Daily PAI
          </div>

          <div className={styles.headerCell}
               ref={(node)=>{ if(node){ node.style.width = `${widths[7]}%` }} }>
           Fees & Comms
          </div>

          <div className={styles.headerCell}
               ref={(node)=>{ if(node){ node.style.width = `${widths[8]}%` }} }>
           Pending Non-Cash
          </div>

          <div className={styles.headerCell}
               ref={ node=>{if(node) node.style.width = `${widths[9]}%` } }>
           Pending Cash
          </div>

        </div>

        <div className={styles.rowGroup}>
         {rows}
        </div>

      </div>
     )

    // return (
    //   <div className={styles.unmatchedTable}>
    //     <div className={styles.unmatchedTableHeader}>
    //       <div className={styles.unmatchedTableCell}></div>
    //       <div className={styles.unmatchedTableCell}>Counterparty</div>
    //       <div className={styles.unmatchedTableCell}>Net Total IM</div>
    //       <div className={styles.unmatchedTableCell}>Net VM Call (SGD)</div>
    //       <div className={styles.unmatchedTableCell}>Interest Payment (IM)</div>
    //       <div className={styles.unmatchedTableCell}>Product Cash Flows</div>
    //       <div className={styles.unmatchedTableCell}>Daily PAI</div>
    //       <div className={styles.unmatchedTableCell}>Fees & Comms</div>
    //       <div className={styles.unmatchedTableCell}>Pending Non-Cash</div>
    //       <div className={styles.unmatchedTableCell}>Pending Cash</div>
    //     </div>
    //
    //     {rows}
    //
    //   </div>
    //  )
  }
}
