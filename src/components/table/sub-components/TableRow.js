import React from 'react'
import TableCell from './TableCell'
import styles from '../Table.css'


class TableRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.tableRow}>
        <TableCell bodyItemClass={'bodyItem'} cellValue={this.props.rowItems.get('legalEntity')}/>
        <TableCell bodyItemClass={'innerItem'} cellValue={this.props.rowItems.get('cptyOrg')}/>
        <TableCell bodyItemClass={'cptyItem'} cellValue={this.props.rowItems.get('cptyEntity')}/>
        <TableCell bodyItemClass={'marginRow'} cellValue={this.props.rowItems.get('ccy')}/>
        <TableCell bodyItemClass={'marginItem'} cellValue={
          this.props.numberWithCommas(this.props.rowItems.get('initialMargin'))}/>
        <TableCell bodyItemClass={'marginItem'} cellValue={
          this.props.numberWithCommas(this.props.rowItems.get('variableMargin'))}/>
        <TableCell bodyItemClass={'outerItem'} cellValue={
          this.props.numberWithCommas(this.props.rowItems.get('variableMargin'))}/>
      </div>
    )
  }
}
;

export default TableRow
