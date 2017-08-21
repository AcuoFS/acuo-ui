import React from 'react'
import TableRow from './TableRow'
import TableCell from './TableCell'
import styles from '../Table.css'
import _ from 'lodash'

class TableBody extends React.Component {
  constructor(props) {
    super(props)
  }

  renderRow(status, onLineItemClick) {
    if (status.timeFrames)
      return _.map(status.timeFrames, (x) =>
        (x.actionsList ? _.map(x.actionsList, (y) =>
          <TableRow rowItems={y}
                    onLineItemClick={onLineItemClick}/>
        ) : '')
      )
  }

  render() {
    const { marginStatus, open, onLineItemClick } = this.props
    return (
      <div className={open}>
        <div className={styles.tableBody}>
          <TableCell cellValue={'Principal Entity'}/>
          <TableCell cellValue={'CPTY Org'}/>
          <TableCell cellValue={'CPTY Entity'}/>
          <TableCell cellValue={'CCY'}/>
          <TableCell cellValue={'Collateral Balance'}/>
          <TableCell cellValue={'Pending Collateral'}/>
          <TableCell cellValue={'∆ Collateral'}/>
          <TableCell cellValue={'∆ IM'}/>
          <TableCell cellValue={'∆ VM'}/>
          <TableCell cellValue={'Delta'}/>
          <TableCell cellValue={'In / Out'}/>
          <TableCell cellValue={'Status'}/>
        </div>
        {_.map(marginStatus, (status) => this.renderRow(status, onLineItemClick))}
      </div>
    )
  }
}
;

export default TableBody
