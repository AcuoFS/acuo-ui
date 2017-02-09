import React from 'react'
import {checkBox} from '../../../../images/common'
import styles from './UnmatchedTable.css'


export default class UnmatchedTable extends React.Component {
  render(){
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
        <div className={styles.unmatchedTableRow}>
          <div className={styles.unmatchedTableCell}><img src={checkBox}/></div>
          <div className={styles.unmatchedTableCell}>c2</div>
          <div className={styles.unmatchedTableCell}>c3</div>
          <div className={styles.unmatchedTableCell}>c4</div>
          <div className={styles.unmatchedTableCell}>c5</div>
          <div className={styles.unmatchedTableCell}>c6</div>
          <div className={styles.unmatchedTableCell}>c7</div>
          <div className={styles.unmatchedTableCell}>c8</div>
          <div className={styles.unmatchedTableCell}>c9</div>
          <div className={styles.unmatchedTableCell}>c10</div>
        </div>
        <div className={styles.unmatchedTableRow}>
          <div className={styles.unmatchedTableCell}><img src={checkBox}/></div>
          <div className={styles.unmatchedTableCell}>c2</div>
          <div className={styles.unmatchedTableCell}>c3</div>
          <div className={styles.unmatchedTableCell}>c4</div>
          <div className={styles.unmatchedTableCell}>c5</div>
          <div className={styles.unmatchedTableCell}>c6</div>
          <div className={styles.unmatchedTableCell}>c7</div>
          <div className={styles.unmatchedTableCell}>c8</div>
          <div className={styles.unmatchedTableCell}>c9</div>
          <div className={styles.unmatchedTableCell}>c10</div>
        </div>

      </div>
    )
  }
}