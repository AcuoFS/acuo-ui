import React from 'react'

import styles from '../table.css'
import TableBody from './tablebody-component'

class TableItem extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <div className={styles.table}>

            <div className={styles.derivItem}>
              <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>{this.props.status}</p>
              </div>
            </div>

            <div className={styles.tableItem}>
              <div className={styles.margin}>
                  <p className={styles.leftThis}>CPTY Margin</p>
                  <p className={styles.fineFont}>1,500,000.000.00</p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>Region</p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>CCY</p>
              </div>
            </div>

            <div className={styles.tableItem}>
              <div className={styles.margin}>
                  <p className={styles.leftThis}>EXP.Margin</p>
                  <p className={styles.fineFont}>1,500,000.000.00</p>
              </div>
            </div>

            <div className={styles.actionItem}>
              <div className={styles.actionVertiCenter}>
                  <div className={styles.actions}>
                    <div className={styles.text}>5 ACTION ITEMS</div>
                    <div className={styles.arrow}></div>
                  </div>
              </div>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.vertiCenter}>
                  <p className={styles.centerThis} onClick={this.props.clicked}>
                      <img src={this.props.arrow} alt=""/>
                  </p>
              </div>
            </div>
          </div>
          <TableBody open={this.props.toggle}/>
      </div>
    )
  }
}

export default TableItem
