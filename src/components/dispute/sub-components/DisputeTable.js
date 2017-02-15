import React from 'react'
import DisputeTableRow from './DisputeTableRow'
import _ from 'lodash'
import * as DISPUTE_FILTER from '../../../constants/DisputeFilters'
import styles from './DisputeTable.css'


const filterBySelectedRange = (disputeData, dateFilter) => (
  _.filter(disputeData, (disputeRecord) => {
    // const currentDate = new Date()
    // TODO Using 15 Feb 2017 as reference date as calendar is not ready
    const currentDate = new Date(2017, 1, 15)
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const recordDate = new Date(disputeRecord.lastUpdated)

    switch (dateFilter) {
      case DISPUTE_FILTER.CURRENT_MONTH:
        // First to last day of current month
        return _.inRange(
          recordDate,
          (new Date(currentYear, currentMonth, 1)),
          (new Date(currentYear, currentMonth + 1, 0))
        )
      case DISPUTE_FILTER.THREE_MONTHS:
        // First day of 3 months ago to last day of current month
        return _.inRange(
          recordDate,
          (new Date(currentYear, currentMonth - 3, 1)),
          (new Date(currentYear, currentMonth + 1, 0))
        )
      case DISPUTE_FILTER.SIX_MONTHS:
        // First day of 6 months ago to last day of current month
        return _.inRange(
          recordDate,
          (new Date(currentYear, currentMonth - 6, 1)),
          (new Date(currentYear, currentMonth + 1, 0))
        )
      default:
        return false
    }
  })
)

const DisputeTable = ({disputeData, dateFilter}) => {
  return (
    <div className={styles.disputeTable}>
      <div className={styles.disputeTableHeaderRow}>
        <div className={styles.disputeTableCell}>Role</div>
        <div className={styles.disputeTableCell}>Legal Entity</div>
        <div className={styles.disputeTableCell}>CPTY Organization</div>
        <div className={styles.disputeTableCell}>CPTY Entity</div>
        <div className={styles.disputeTableCell}>Agreement Name</div>
        <div className={styles.disputeTableCell}>ID</div>
        <div className={styles.disputeTableCell}>Days Opened</div>
        <div className={styles.disputeTableCell}>Last Updated</div>
        <div className={styles.disputeTableCell}>Status</div>
        <div className={styles.disputeTableCell}></div>
        <div className={styles.disputeTableCell}></div>
      </div>

      {
        disputeData.length > 0 &&
        filterBySelectedRange(disputeData, dateFilter).map((dispute, index) =>
          <DisputeTableRow
            key={index}
            propRole={dispute.role}
            propLegalEntity={dispute.legalEntity}
            propCptyOrg={dispute.cptyOrg}
            propCptyEntity={dispute.cptyEntity}
            propAgreementName={dispute.agreementName}
            propId={dispute.disputeId}
            propDaysOpened={dispute.daysOpened}
            propLastUpdated={dispute.lastUpdated}
            propStatus={dispute.status}/>
        )
      }

    </div>
  )

}

export default DisputeTable