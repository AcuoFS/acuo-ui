import React from 'react'
import TableHead from './table-subcomponent/tablehead-component'
import styles from './table.css'

class Table extends React.Component{
  render() {
    return (
      <div>
        <TableHead marginType={"ETD"}/>
        <TableHead marginType={"OTC Cleared"}/>
        <TableHead marginType={"OTC Bilateral Reg"}/>
        <TableHead marginType={"OTC Bilateral Leg"}/>
      </div>
    );
  }
}

export default Table
