import React from 'react'
import TableCell from './TableCell'
import styles from '../Table.css'


class TableRow extends React.Component {
  constructor(props) {
    super(props)
  }

  checkNegative(orgAmount, numbersWithCommas){
    const amount = parseFloat(orgAmount)

    if(amount < 0)
      return '(' + numbersWithCommas(Math.abs(amount || 0)) + ')'
    else
      return numbersWithCommas(amount || 0)
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
        <TableCell bodyItemClass={'marginItem'} cellValue={this.checkNegative(rowItems.get('initialMargin'), numberWithCommas)}/>
        <TableCell bodyItemClass={'marginItem'} cellValue={this.checkNegative(rowItems.get('variableMargin'), numberWithCommas)}/>
        <TableCell bodyItemClass={'outerItem'} cellValue={
          this.checkNegative(excess, numberWithCommas)}/>
      </div>
    )
  }
}

export default TableRow
