import React, {PropTypes} from 'react'
import {plusBox, minuxBox} from '../../../../images/common'
import * as CONSTANTS from '../../../constants/AgreementsConstants'
import AgreementsSummaryRow from './AgreementsSummaryRow'
import styles from './AgreementsSummaryTable.css'


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
      return <AgreementsSummaryRow rowData={rowData}>
        <div className={styles.summaryTableCell + ' ' + styles.clientDisplay}>
          {rowData.clientName}
        </div>
      </AgreementsSummaryRow>
    case CONSTANTS.SUMMARY_ROW_CPTY:
      return <AgreementsSummaryRow rowData={rowData}>
        <div className={styles.summaryTableCell + ' ' + styles.cptyDisplay}>
          <div className={styles.entityTypeContainer}>
            {rowData.clientName}
            <img src={propIsCptySummaryExpanded ?
              minuxBox : plusBox} className={styles.plusMinusStyle}
                 onClick={() =>
                   propHandlerCptyExpand(!propIsCptySummaryExpanded)}/>
          </div>
        </div>

      </AgreementsSummaryRow>
    default:
      return <AgreementsSummaryRow rowData={rowData} key={index}>
        <div className={styles.summaryTableCell}>{rowData.clientName}</div>
      </AgreementsSummaryRow>
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

AgreementsSummaryTable.PropTypes = {
  propSummaryData: PropTypes.object.isRequired,
  propIsCptySummaryExpanded: PropTypes.bool.isRequired,
  propHandlerCptyExpand: PropTypes.func.isRequired,
  propTypeSelected: PropTypes.string.isRequired
}

export default AgreementsSummaryTable
