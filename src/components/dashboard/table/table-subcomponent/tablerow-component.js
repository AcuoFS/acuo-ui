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
              <div className={styles.centerThis}>{this.props.rowItems.get('legalEntity')}</div>
            </div>
          </div>

          <div className={styles.divMid}>
              <div className={styles.cptyItem}>
                <div className={styles.vertiCenter}>
                  <div className={styles.centerThis}>{this.props.rowItems.get('cpty')}</div>
                </div>
              </div>

              <div className={styles.innerItem}>
                <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>{this.props.rowItems.get('venue')}</p>
                </div>
              </div>

              <div className={styles.marginRow}>
                <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>{this.props.rowItems.get('ccy')}</p>
                </div>
              </div>

              <div className={styles.marginItem}>
                <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>{this.props.numberWithCommas(this.props.rowItems.get('initialMargin'))}</p>
                </div>
              </div>
          </div>
          <div className={styles.outerItem}>
            <div className={styles.vertiCenter}>
              <p className={styles.centerThis}>{this.props.numberWithCommas(this.props.rowItems.get('variableMargin'))}</p>
            </div>
          </div>
      </div>
    )
  }
};

export default TableRow
