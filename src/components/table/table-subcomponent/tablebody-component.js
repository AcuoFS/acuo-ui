import React from 'react'

import styles from '../table.css'
import TableRow from './tablerow-component.js'

class TableBody extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    return (
        <tbody className={styles.tableBody}>
          <tr className={styles.table}>
            <td>LEGAL ENTITY</td>
            <td>CPTY</td>
            <td>REGION</td>
            <td>CCY</td>
            <td className={styles.marginLeft} >IM</td>
            <td className={styles.marginLeft} colSpan="2">VM</td>
          </tr>
          <TableRow/>
          <TableRow/>
          <TableRow/>
          <TableRow/>
        </tbody>
    )
  }
};

export default TableBody
