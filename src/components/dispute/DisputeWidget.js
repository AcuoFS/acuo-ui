import React from 'react'
import DisputeTable from './sub-components/DisputeTable'
import styles from './DisputeWidget.css'


export default class DisputeWidget extends React.Component {
  render() {
    return (
      <div className={styles.compContainer}>
        <div className={styles.compTitle}>Dispute Management</div>
        <div className={styles.btnContainer}>
          <button className={styles.btnStyle + ' ' + styles.btnInactive}>Current month</button>
          <button className={styles.btnStyle + ' ' + styles.btnActive}>3 months ago</button>
          <button className={styles.btnStyle + ' ' + styles.btnActive}>6 months ago</button>
        </div>
        <DisputeTable/>
      </div>
    )
  }
}