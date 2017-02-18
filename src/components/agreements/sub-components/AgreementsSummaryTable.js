import React from 'react'
import {plusBox, minuxBox} from '../../../../images/common'
import * as TYPES from '../../../constants/AgreementsConstants'
import styles from './AgreementsSummaryTable.css'


export default class AgreementsSummaryTable extends React.Component {
  handleExpandCollapse(nextClickAction, propHandlerCptyExpand) {
    propHandlerCptyExpand(nextClickAction)
  }

  render() {
    const {
      propSummaryData,
      propIsCptySummaryExpanded,
      propHandlerCptyExpand,
      propTypeSelected
    } = this.props

    let clientDom, cptyDom, cptyBreakdown

    if ((propTypeSelected == TYPES.AGREEMENT_TYPE_SELECTED_BOTH
      || propTypeSelected == TYPES.AGREEMENT_TYPE_SELECTED_OUTGOING)
      && propSummaryData.clientSummary) {
      clientDom = <div className={styles.summaryTableRow}>
        <div className={styles.summaryTableCell + ' ' + styles.clientDisplay}>
          {propSummaryData.clientSummary.clientName}
        </div>
        <div className={styles.summaryTableCell}>{propSummaryData.clientSummary.pendingNew}</div>
        <div className={styles.summaryTableCell}>{propSummaryData.clientSummary.pendingAssigned}</div>
        <div className={styles.summaryTableCell}>{propSummaryData.clientSummary.pendingRejected}</div>
        <div className={styles.summaryTableCell}>{propSummaryData.clientSummary.active}</div>
        <div className={styles.summaryTableCell}>{propSummaryData.clientSummary.changeRequest}</div>
        <div className={styles.summaryTableCell}>{propSummaryData.clientSummary.discontinuedReq}</div>
      </div>
    }

    if ((propTypeSelected == TYPES.AGREEMENT_TYPE_SELECTED_BOTH
      || propTypeSelected == TYPES.AGREEMENT_TYPE_SELECTED_INCOMING)
      && propSummaryData.cptySummary) {
      cptyDom = <div className={styles.summaryTableRow}>
        <div className={styles.summaryTableCell+ ' ' + styles.cptyDisplay}>
          <div className={styles.entityTypeContainer}>
            {propSummaryData.cptySummary.clientName} <img src={propIsCptySummaryExpanded ?
            minuxBox : plusBox} className={styles.plusMinusStyle}
                                                          onClick={() => this.handleExpandCollapse(
                                                            !propIsCptySummaryExpanded,
                                                            propHandlerCptyExpand)}/>
          </div>
        </div>
        <div className={styles.summaryTableCell}>{propSummaryData.cptySummary.pendingNew}</div>
        <div className={styles.summaryTableCell}>{propSummaryData.cptySummary.pendingAssigned}</div>
        <div className={styles.summaryTableCell}>{propSummaryData.cptySummary.pendingRejected}</div>
        <div className={styles.summaryTableCell}>{propSummaryData.cptySummary.active}</div>
        <div className={styles.summaryTableCell}>{propSummaryData.cptySummary.changeRequest}</div>
        <div className={styles.summaryTableCell}>{propSummaryData.cptySummary.discontinuedReq}</div>
      </div>

      cptyBreakdown = propSummaryData.cptySummary.cptySummaryBreakdown.map((cptyRecord, index) => {
        return <div className={styles.summaryTableRow} key={index}>
          <div className={styles.summaryTableCell}>{cptyRecord.clientName}</div>
          <div className={styles.summaryTableCell}>{cptyRecord.pendingNew}</div>
          <div className={styles.summaryTableCell}>{cptyRecord.pendingAssigned}</div>
          <div className={styles.summaryTableCell}>{cptyRecord.pendingRejected}</div>
          <div className={styles.summaryTableCell}>{cptyRecord.active}</div>
          <div className={styles.summaryTableCell}>{cptyRecord.changeRequest}</div>
          <div className={styles.summaryTableCell}>{cptyRecord.discontinuedReq}</div>
        </div>
      })

    }

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

        {clientDom}

        {cptyDom}

        {
          propIsCptySummaryExpanded &&
          cptyBreakdown
        }

      </div>
    )
  }
}