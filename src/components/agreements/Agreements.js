import React from 'react'
import AgreementsSummaryTable from './sub-components/AgreementsSummaryTable'
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
        <input type="text" placeholder="Search"/>
        <div className={styles.labelContainer}>
          <span className={styles.statusLabel + ' ' + styles.outLabel}>Incoming</span>
          <span className={styles.statusLabel + ' ' + styles.inLabel}>Outgoing</span>
        </div>
        <AgreementsSummaryTable/>
        <div>details table</div>

      </div>
    )
  }
}