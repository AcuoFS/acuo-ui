/**
 * Created by Rui on 21/12/16.
 */

import React from 'react'
import styles from './MarginCall.css'

export default class MarginCallRow extends React.Component{
  render(){
    return(
      <div className={styles.contentRow}>
        <div className={styles.flexContainer}>
          <div className={styles.cell}><input type="checkbox" /></div>
          <div className={styles.cell}>Acuo SG</div>
          <div className={styles.cell}>Counterparty C</div>
          <div className={styles.cell}>Counterparty C</div>
          <div className={styles.cell}>Acuo SG vs Counterparty C</div>
          <div className={styles.cell + ' ' + styles.dateCell}>18-10-2016</div>
          <div className={styles.cell + ' ' + styles.dateCell}>18-10-2016</div>
          <div className={styles.cell + ' ' + styles.callTypeCell}>Variation</div>
          <div className={styles.cell + ' ' + styles.ccyCell}>USD</div>
          <div className={styles.cell + ' ' + styles.largeCell}>123,456,789,012</div>
          <div className={styles.cell}>1234567890</div>
          <div className={styles.cell + ' ' + styles.largeCell}>123,456,789,012</div>
          <div className={styles.cell + ' ' + styles.largeCell}>123,456,789,012</div>
          <div className={styles.cell + ' ' + styles.largeCell}>123,456,789,012</div>
          <div className={styles.cell}>v</div>
        </div>
        <div className={styles.subrow}>
          <div className={styles.headerRow}>
            <div className={styles.subrowCell}>Threshold</div>
            <div className={styles.subrowCell}>Min Transfer</div>
            <div className={styles.subrowCell}>Rounding</div>
            <div className={styles.subrowCell}>Net Required</div>
            <div className={styles.subrowCell}>Rate</div>
            <div className={styles.subrowCell}>Trade Count</div>
          </div>
          <div className={styles.subrowContent}>
            <div className={styles.subrowCell}>123,456,789,123</div>
            <div className={styles.subrowCell}>123,456,789,123</div>
            <div className={styles.subrowCell}>123,456,789,123</div>
            <div className={styles.subrowCell}>123,456,789,123</div>
            <div className={styles.subrowCell}>123,456,789,123</div>
            <div className={styles.subrowCell}>39</div>
          </div>
        </div>
      </div>
    )
  }
}