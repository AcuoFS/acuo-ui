import React from 'react'

import styles from '../table.css'
import TableBody from './tablebody-component.js'

class TableHead extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    return (
        <table>
          <thead>
            <tr className={styles.head}>
              <th>{this.props.marginType}</th>
              <th>CPTY Margin</th>
              <th>Region</th>
              <th>CCY</th>
              <th>EXP.Margin</th>
              <th>
                <div className={styles.actionHeader}>
                  <div className={styles.action}>
                    <div className={styles.items}>5 ACTION ITEMS</div>
                  </div>
                  <div className={styles.arrowRight}></div>
                </div>
              </th>
              <th>
                <button>Toggle</button>
              </th>
            </tr>
          </thead>
          <TableBody />
        </table>
    )
  }
};

export default TableHead
