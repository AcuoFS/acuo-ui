import React from 'react'

import styles from '../table.css'

class TableRow extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className={styles.tableRow}>

          <div className={styles.bodyItem}>
            <div className={styles.vertiCenter}>
              <div className={styles.centerThis}>ACUO SG</div>
            </div>
          </div>

          <div className={styles.divMid}>
              <div className={styles.cptyItem}>
                <div className={styles.vertiCenter}>
                  <div className={styles.centerThis}>ABC Bank</div>
                </div>
              </div>

              <div className={styles.innerItem}>
                <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>Singapore</p>
                </div>
              </div>

              <div className={styles.marginRow}>
                <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>SGD</p>
                </div>
              </div>

              <div className={styles.marginItem}>
                <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>1,500,000,000</p>
                </div>
              </div>
          </div>
          <div className={styles.outerItem}>
            <div className={styles.vertiCenter}>
              <p className={styles.centerThis}>1,500,000,000</p>
            </div>
          </div>
      </div>
    )
  }
};

export default TableRow
