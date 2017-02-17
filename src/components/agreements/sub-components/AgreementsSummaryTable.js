import React from 'react'
import styles from './AgreementsSummaryTable.css'


export default class AgreementsSummaryTable extends React.Component {
  render() {
    return (
      <div className={styles.summaryTable}>
        <div className={styles.summaryTableHeaderRow}>
          <div className={styles.summaryTableCell}>Pending New</div>
          <div className={styles.summaryTableCell}>Pending Assigned</div>
          <div className={styles.summaryTableCell}>Rejected</div>
          <div className={styles.summaryTableCell}>Active</div>
          <div className={styles.summaryTableCell}>Change Request</div>
          <div className={styles.summaryTableCell}>Discontinued Request</div>
        </div>
        <div className={styles.summaryTableRow}>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
        </div>
        <div className={styles.summaryTableRow}>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
        </div>

      </div>
    )
  }
}