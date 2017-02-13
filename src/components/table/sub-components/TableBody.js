import React from 'react'
import TableRow from './TableRow'
import TableCell from './TableCell'
import styles from '../Table.css'


class TableBody extends React.Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  renderRow(status) {

    if (status.get('timeFrames'))
      return status.get('timeFrames').map((x) => {
        if (x.get('actionsList'))
          return x.get('actionsList').map((y) => {
            return (<TableRow numberWithCommas={this.props.numberWithCommas} rowItems={y}/>)
          })
      })
  }

  render() {
    return (
      <div className={this.props.open}>
        <div className={styles.tableBody}>
          <TableCell cellValue={'LEGAL ENTITY'}/>
          <TableCell cellValue={'CPTY Org'}/>
          <TableCell cellValue={'CPTY Entity'}/>
          <TableCell cellValue={'CCY'}/>
          <TableCell cellValue={'IM'}/>
          <TableCell cellValue={'VM'}/>
          <TableCell cellValue={'Excess'}/>
          <TableCell cellValue={'In / Out'}/>
          <TableCell cellValue={'Status'}/>
        </div>
        {this.props.marginStatus.map(this.renderRow)}
      </div>
    )
  }
}
;

export default TableBody
