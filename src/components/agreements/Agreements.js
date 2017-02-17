import React from 'react'
import AgreementsSummaryTable from './sub-components/AgreementsSummaryTable'
import AgreementsTable from './sub-components/AgreementsTable'
import styles from './Agreements.css'


export default class Agreements extends React.Component {
  render() {
    return (
      <div className={styles.compContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.compTitle}>Agreement</div>
          <div className={styles.btnContainer}>
            <button className={styles.agreementBtnStyle}>Import</button>
            <button className={styles.agreementBtnStyle}>Create</button>
          </div>
        </div>
        <input type="text" placeholder="Search" className={styles.searchInput}/>
        <div className={styles.labelContainer}>
          <span className={styles.statusLabel + ' ' + styles.outLabel}>Outgoing</span>
          <span className={styles.statusLabel + ' ' + styles.inLabel}>Incoming</span>
        </div>
        <AgreementsSummaryTable/>
        <AgreementsTable/>
      </div>
    )
  }
}