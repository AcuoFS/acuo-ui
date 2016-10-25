import React from 'react'

import styles from '../table.css'
import TableRow from './tablerow-component.js'

class TableBody extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className={this.props.open}>
        <div className={styles.tableBody}>

            <div className={styles.bodyItem}>
              <div className={styles.vertiCenter}>
                <div className={styles.centerThis}>LEGAL ENTITY</div>
              </div>
            </div>

            <div className={styles.divMid}>
                <div className={styles.cptyItem}>
                  <div className={styles.vertiCenter}>
                    <div className={styles.centerThis}>CPTY</div>
                  </div>
                </div>

                <div className={styles.innerItem}>
                  <div className={styles.vertiCenter}>
                    <p className={styles.centerThis}>REGION</p>
                  </div>
                </div>

                <div className={styles.marginItem}>
                  <div className={styles.vertiCenter}>
                    <p className={styles.centerThis}>CCY</p>
                  </div>
                </div>

                <div className={styles.marginItem}>
                  <div className={styles.vertiCenter}>
                    <p className={styles.centerThis}>IM</p>
                  </div>
                </div>
            </div>
            <div className={styles.outerItem}>
              <div className={styles.vertiCenter}>
                <p className={styles.centerThis}>VM</p>
              </div>
            </div>
        </div>
        <TableRow />
        <TableRow />
        <TableRow />
        <TableRow />
      </div>
    )
  }
};

export default TableBody
