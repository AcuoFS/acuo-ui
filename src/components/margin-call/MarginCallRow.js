/**
 * Created by Rui on 21/12/16.
 */

import React from 'react'
import styles from './MarginCall.css'
import data from '../../data/data'


export default class MarginCallRow extends React.Component{
  render(){
    const {isOpen, spillContents, id} = this.props

    return <div>
      {data.map((item, idx) => (<div key={idx} className={styles.contentRow}>
            <div className={styles.flexContainer}>
              <div className={styles.cell}><input type="checkbox" /></div>
              <div className={styles.cell}>{item.legalEntity}</div>
              <div className={styles.cell}>{item.cptyOrg}</div>
              <div className={styles.cell}>{item.cptyEntity}</div>
              <div className={styles.cell}>{item.marginAgreement}</div>
              <div className={styles.cell + ' ' + styles.dateCell}>{item.valuationDate}</div>
              <div className={styles.cell + ' ' + styles.dateCell}>{item.callDate}</div>
              <div className={styles.cell + ' ' + styles.callTypeCell}>{item.callType}</div>
              <div className={styles.cell + ' ' + styles.ccyCell}>{item.currency}</div>
              <div className={styles.cell + ' ' + styles.largeCell}>{item.totalCallAmount}</div>
              <div className={styles.cell}>{item.referenceIdentifier}</div>
              <div className={styles.cell + ' ' + styles.largeCell}>{item.exposure}</div>
              <div className={styles.cell + ' ' + styles.largeCell}>{item.collateralValue}</div>
              <div className={styles.cell + ' ' + styles.largeCell}>{item.pendingCollateral}</div>
              <div className={styles.cell} onClick={spillContents} data-ref={id}></div>
            </div>
        </div>))}
      </div>

      // <div className={styles.contentRow}>
      //   <div className={styles.flexContainer}>
      //     <div className={styles.cell}><input type="checkbox" /></div>
      //     <div className={styles.cell}>Acuo SG</div>
      //     <div className={styles.cell}>Counterparty C</div>
      //     <div className={styles.cell}>Counterparty C</div>
      //     <div className={styles.cell}>Acuo SG vs Counterparty C</div>
      //     <div className={styles.cell + ' ' + styles.dateCell}>18-10-2016</div>
      //     <div className={styles.cell + ' ' + styles.dateCell}>18-10-2016</div>
      //     <div className={styles.cell + ' ' + styles.callTypeCell}>Variation</div>
      //     <div className={styles.cell + ' ' + styles.ccyCell}>USD</div>
      //     <div className={styles.cell + ' ' + styles.largeCell}>123,456,789,012</div>
      //     <div className={styles.cell}>1234567890</div>
      //     <div className={styles.cell + ' ' + styles.largeCell}>123,456,789,012</div>
      //     <div className={styles.cell + ' ' + styles.largeCell}>123,456,789,012</div>
      //     <div className={styles.cell + ' ' + styles.largeCell}>123,456,789,012</div>
      //     <div className={styles.cell} onClick={spillContents} data-ref={id}></div>
      //   </div>
      //   <div className={styles.subrow + ' ' + (isOpen ? styles.showSubrow : '')}>
      //     <div className={styles.headerRow}>
      //       <div className={styles.subrowCell}>Threshold</div>
      //       <div className={styles.subrowCell}>Min Transfer</div>
      //       <div className={styles.subrowCell}>Rounding</div>
      //       <div className={styles.subrowCell}>Net Required</div>
      //       <div className={styles.subrowCell}>Rate</div>
      //       <div className={styles.subrowCell}>Trade Count</div>
      //     </div>
      //     <div className={styles.subrowContent}>
      //       <div className={styles.subrowCell}>123,456,789,123</div>
      //       <div className={styles.subrowCell}>123,456,789,123</div>
      //       <div className={styles.subrowCell}>123,456,789,123</div>
      //       <div className={styles.subrowCell}>123,456,789,123</div>
      //       <div className={styles.subrowCell}>123,456,789,123</div>
      //       <div className={styles.subrowCell}>39</div>
      //     </div>
      //   </div>
      // </div>
  }
}
