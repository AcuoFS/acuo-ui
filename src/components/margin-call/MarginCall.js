import React from 'react'
import styles from './MarginCall.css'
import ContentRow from './MarginCallRow'

export default class MarginCall extends React.Component {
  render() {
    return(
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Margin Call</div>
          <div className={styles.button}>Send selected Margin Calls</div>
        </div>
        <div className={styles.content}>
          <div className={styles.masterRow}>
            <div className={styles.cell}><input type="checkbox" /></div>
            <div className={styles.cell}>Legal Entity</div>
            <div className={styles.cell}>Cpty Organisation</div>
            <div className={styles.cell}>Cpty Entity</div>
            <div className={styles.cell}>Margin Agreement</div>
            <div className={styles.cell + ' ' + styles.dateCell}>Valuation Date</div>
            <div className={styles.cell + ' ' + styles.dateCell}>Call Date</div>
            <div className={styles.cell + ' ' + styles.callTypeCell}>Call Type</div>
            <div className={styles.cell + ' ' + styles.ccyCell}>CCY</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Total Call Amount</div>
            <div className={styles.cell}>Reference Identifier</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Exposure</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Collateral Value</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Pending Collateral</div>
            <div className={styles.cell}></div>
          </div>

          <ContentRow />
          <ContentRow />

        </div>
      </div>
    )
  }
}