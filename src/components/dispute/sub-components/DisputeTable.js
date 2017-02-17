import React, {PropTypes} from 'react'
import DisputeTableRow from './DisputeTableRow'
import _ from 'lodash'
import * as DISPUTE_FILTER from '../../../constants/DisputeFilters'
import * as DISPUTE_ATTRIBUTE from '../../../constants/DisputeAttributes'
import {getDate} from '../../../utils'
import styles from './DisputeTable.css'


const filterBySelectedRange = (disputeData, dateFilter) => (
  _.filter(disputeData, (disputeRecord) => {
    const currentDate = getDate()
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
            propRole={dispute[DISPUTE_ATTRIBUTE.ROLE]}
            propLegalEntity={dispute[DISPUTE_ATTRIBUTE.LEGAL_ENTITY]}
            propCptyOrg={dispute[DISPUTE_ATTRIBUTE.CPTY_ORG]}
            propCptyEntity={dispute[DISPUTE_ATTRIBUTE.CPTY_ENTITY]}
            propAgreementName={dispute[DISPUTE_ATTRIBUTE.AGREEMENT_NAME]}
            propId={dispute[DISPUTE_ATTRIBUTE.DISPUTE_ID]}
            propDaysOpened={dispute[DISPUTE_ATTRIBUTE.DAYS_OPENED]}
            propLastUpdated={dispute[DISPUTE_ATTRIBUTE.LAST_UPDATED]}
            propStatus={dispute[DISPUTE_ATTRIBUTE.STATUS]}/>
        )
      }

    </div>
  )

}

DisputeTable.PropTypes = {
  disputeData: PropTypes.arrayOf(PropTypes.object).isRequired,
  dateFilter: PropTypes.string.isRequired
}

export default DisputeTable