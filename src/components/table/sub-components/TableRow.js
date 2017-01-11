import React from 'react'
import TableCell from './TableCell'
import styles from '../Table.css'


class TableRow extends React.Component {
  constructor(props) {
    super(props)
  }

  checkNegative(excess, numbersWithCommas){
    if(excess < 0)
      return '(' + numbersWithCommas(Math.abs(excess)) + ')'
    else
      return excess
  }

  render() {

    const { rowItems, numberWithCommas } = this.props
    const excess =
      (
        Number.parseInt(rowItems.get('collateralBalance') ? rowItems.get('collateralBalance') : 0) +
        Number.parseInt(rowItems.get('pendingCollateral') ? rowItems.get('pendingCollateral') : 0)
      )
      -
      (
        Number.parseInt(rowItems.get('variableMargin') ? rowItems.get('variableMargin') : 0) +
        Number.parseInt(rowItems.get('initialMargin') ? rowItems.get('initialMargin') : 0)
      )

    return (
      <div className={styles.tableRow}>
        <TableCell bodyItemClass={'bodyItem'} cellValue={rowItems.get('legalEntity')}/>
        <TableCell bodyItemClass={'innerItem'} cellValue={rowItems.get('cptyOrg')}/>
        <TableCell bodyItemClass={'cptyItem'} cellValue={rowItems.get('cptyEntity')}/>
        <TableCell bodyItemClass={'marginRow'} cellValue={rowItems.get('ccy')}/>
        <TableCell bodyItemClass={'marginItem'} cellValue={
          numberWithCommas(Number.parseInt(rowItems.get('initialMargin') || 0))}/>
        <TableCell bodyItemClass={'marginItem'} cellValue={
          numberWithCommas(Number.parseInt(rowItems.get('variableMargin') || 0))}/>
        <TableCell bodyItemClass={'outerItem'} cellValue={
          this.checkNegative(excess, numberWithCommas)}/>
      </div>
    )
  }
}

export default TableRow
