import React, {PropTypes} from 'react'
import styles from './AgreementsSummaryTable.css'


const AgreementsSummaryRow = ({rowData, children}) => {
  return <div className={styles.summaryTableRow}>

    {children}

    <div className={styles.summaryTableCell}>{rowData.pendingNew}</div>
    <div className={styles.summaryTableCell}>{rowData.pendingAssigned}</div>
    <div className={styles.summaryTableCell}>{rowData.pendingRejected}</div>
    <div className={styles.summaryTableCell}>{rowData.active}</div>
    <div className={styles.summaryTableCell}>{rowData.changeRequest}</div>
    <div className={styles.summaryTableCell}>{rowData.discontinuedReq}</div>
  </div>
}

AgreementsSummaryRow.PropTypes = {
  rowData: PropTypes.object.isRequired,
  children: React.PropTypes.element.isRequired
}

export default AgreementsSummaryRow