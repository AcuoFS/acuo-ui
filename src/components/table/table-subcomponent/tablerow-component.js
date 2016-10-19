import React from 'react'

import styles from '../table.css'

class TableRow extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    return (
        <tr>
          <td>ACUO SG</td>
          <td>ABC Bank</td>
          <td>Singapore</td>
          <td>SGD</td>
          <td>10,000,000</td>
          <td colSpan="2">10,000,000</td>
        </tr>
    )
  }
};

export default TableRow
