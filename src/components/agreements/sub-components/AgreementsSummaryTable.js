import React from 'react'
import {plusBox, minuxBox} from '../../../../images/common'
import * as CONSTANTS from '../../../constants/AgreementsConstants'
import styles from './AgreementsSummaryTable.css'


const createRowWithCommonProperties = (index, rowData, firstCellDom) => {
  return <div className={styles.summaryTableRow} key={index}>
    {firstCellDom}
    <div className={styles.summaryTableCell}>{rowData.pendingNew}</div>
    <div className={styles.summaryTableCell}>{rowData.pendingAssigned}</div>
    <div className={styles.summaryTableCell}>{rowData.pendingRejected}</div>
    <div className={styles.summaryTableCell}>{rowData.active}</div>
    <div className={styles.summaryTableCell}>{rowData.changeRequest}</div>
    <div className={styles.summaryTableCell}>{rowData.discontinuedReq}</div>
  </div>
}

/**
 * Three different types of row: SUMMARY_ROW_CLIENT/SUMMARY_ROW_CPTY/SUMMARY_ROW_CPTY_DETAIL
 *
 * Most properties are largely the same, except for:
 * 1) First cell on row
 * 2) key property of row
 *
 * @param rowData
 * @param rowType
 * @param propIsCptySummaryExpanded
 * @param propHandlerCptyExpand
 * @param index
 */
const createSummaryTableRow = (rowData, rowType,
                               propIsCptySummaryExpanded,
                               propHandlerCptyExpand, index) => {
  switch (rowType) {
    case CONSTANTS.SUMMARY_ROW_CLIENT:
      return createRowWithCommonProperties(CONSTANTS.SUMMARY_ROW_CLIENT, rowData,
        <div className={styles.summaryTableCell + ' ' + styles.clientDisplay}>
          {rowData.clientName}
        </div>
      )
    case CONSTANTS.SUMMARY_ROW_CPTY:
      return createRowWithCommonProperties(CONSTANTS.SUMMARY_ROW_CPTY, rowData,
        <div className={styles.summaryTableCell + ' ' + styles.cptyDisplay}>
          <div className={styles.entityTypeContainer}>
            {rowData.clientName}
            <img src={propIsCptySummaryExpanded ?
              minuxBox : plusBox} className={styles.plusMinusStyle}
                 onClick={() =>
                   propHandlerCptyExpand(!propIsCptySummaryExpanded)}/>
          </div>
        </div>
      )
    default:
      return createRowWithCommonProperties(index, rowData,
        <div className={styles.summaryTableCell}>{rowData.clientName}</div>)
  }
}

const AgreementsSummaryTable = ({
  propSummaryData,
  propIsCptySummaryExpanded,
  propHandlerCptyExpand,
  propTypeSelected
}) => {
  return (
    <div className={styles.summaryTable}>
      <div className={styles.summaryTableHeaderRow}>
        <div className={styles.summaryTableCell}></div>
        <div className={styles.summaryTableCell}>Pending New</div>
        <div className={styles.summaryTableCell}>Pending Assigned</div>
        <div className={styles.summaryTableCell}>Rejected</div>
        <div className={styles.summaryTableCell}>Active</div>
        <div className={styles.summaryTableCell}>Change Request</div>
        <div className={styles.summaryTableCell}>Discontinued Request</div>
      </div>

      {
        (propTypeSelected == CONSTANTS.AGREEMENT_TYPE_SELECTED_BOTH
        || propTypeSelected == CONSTANTS.AGREEMENT_TYPE_SELECTED_OUTGOING)
        && propSummaryData.clientSummary &&
        createSummaryTableRow(propSummaryData.clientSummary, CONSTANTS.SUMMARY_ROW_CLIENT, null, null, null)
      }
      {
        (propTypeSelected == CONSTANTS.AGREEMENT_TYPE_SELECTED_BOTH
        || propTypeSelected == CONSTANTS.AGREEMENT_TYPE_SELECTED_INCOMING)
        && propSummaryData.cptySummary &&
        createSummaryTableRow(propSummaryData.cptySummary, CONSTANTS.SUMMARY_ROW_CPTY, propIsCptySummaryExpanded,
          propHandlerCptyExpand, null)
      }
      {
        propIsCptySummaryExpanded &&
        (propTypeSelected == CONSTANTS.AGREEMENT_TYPE_SELECTED_BOTH
        || propTypeSelected == CONSTANTS.AGREEMENT_TYPE_SELECTED_INCOMING)
        && propSummaryData.cptySummary &&
        propSummaryData.cptySummary.cptySummaryBreakdown.map((cptyRecord, index) => (
          createSummaryTableRow(cptyRecord, CONSTANTS.SUMMARY_ROW_CPTY_DETAIL, null, null, index)
        ))
      }
    </div>
  )
}

export default AgreementsSummaryTable
