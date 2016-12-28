import React from 'react'
import TableCell from './TableCell'
import styles from '../Table.css'


class TableRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const { rowItems, numberWithCommas } = this.props
    const excess = (rowItems.get('collateralBalance') + rowItems.get('pendingCollateral')) - (rowItems.get('variableMargin') + rowItems.get('variableMargin'))

    return (
      <div className={styles.tableRow}>
        <TableCell bodyItemClass={'bodyItem'} cellValue={rowItems.get('legalEntity')}/>
        <TableCell bodyItemClass={'innerItem'} cellValue={rowItems.get('cptyOrg')}/>
        <TableCell bodyItemClass={'cptyItem'} cellValue={rowItems.get('cptyEntity')}/>
        <TableCell bodyItemClass={'marginRow'} cellValue={rowItems.get('ccy')}/>
        <TableCell bodyItemClass={'marginItem'} cellValue={
          numberWithCommas(rowItems.get('initialMargin'))}/>
        <TableCell bodyItemClass={'marginItem'} cellValue={
          numberWithCommas(rowItems.get('variableMargin'))}/>
        <TableCell bodyItemClass={'outerItem'} cellValue={
          numberWithCommas(excess)}/>
      </div>
    )
  }
}

export default TableRow
