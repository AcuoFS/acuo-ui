import React from 'react'
import DisputeTableRow from './DisputeTableRow'
import styles from './DisputeTable.css'


export default class DisputeTable extends React.Component {
  render() {
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

        <DisputeTableRow
          propRole={'S'}
          propLegalEntity={'Acuo SG'}
          propCptyOrg={'Counterparty C'}
          propCptyEntity={'Counterparty C'}
          propAgreementName={'Acuo SG vs Counterparty C'}
          propId={'1234567890'}
          propDaysOpened={'100'}
          propLastUpdated={'23-11-2016'}
          propStatus={'Received'}/>

        <DisputeTableRow
          propRole={'P'}
          propLegalEntity={'Acuo SG'}
          propCptyOrg={'Counterparty C'}
          propCptyEntity={'Counterparty C'}
          propAgreementName={'Acuo SG vs Counterparty C'}
          propId={'1234567890'}
          propDaysOpened={'100'}
          propLastUpdated={'23-11-2016'}
          propStatus={'Sent'}/>

        <DisputeTableRow
          propRole={'S'}
          propLegalEntity={'Acuo SG'}
          propCptyOrg={'Counterparty A'}
          propCptyEntity={'Counterparty A'}
          propAgreementName={'Acuo SG vs Counterparty A'}
          propId={'1234567890'}
          propDaysOpened={'100'}
          propLastUpdated={'23-11-2016'}
          propStatus={'Received'}/>


      </div>
    )
  }
}