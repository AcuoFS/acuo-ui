import React from 'react'
import TableCell from './TableCell'
import * as DASHBOARD_CONSTANTS from '../../../constants/DashboardTable'
import styles from '../Table.css'
import selfStyles from './TableRow.css'


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

  getDirectionCell(directionText) {
    let directionCell
    switch (directionText) {
      case DASHBOARD_CONSTANTS.DIRECTION_IN:
        directionCell =
          <div className={selfStyles.directionCont + " " + selfStyles.directionIn}>
            {directionText}
          </div>
        break;
      case DASHBOARD_CONSTANTS.DIRECTION_OUT:
        directionCell =
          <div className={selfStyles.directionCont + " " + selfStyles.directionOut}>
            {directionText}
          </div>
    }
    return directionCell
  }

  getStatusCell(statusCode) {
    let statusCell
    switch (statusCode) {
      case DASHBOARD_CONSTANTS.STATUS_CODE_EXPECTED:
        statusCell =
          <div className={selfStyles.statusCont + ' ' + selfStyles.statusExpected}>
            {statusCode}
          </div>
        break
      case DASHBOARD_CONSTANTS.STATUS_CODE_RECON:
        statusCell =
          <div className={selfStyles.statusCont + ' ' + selfStyles.statusRecon}>
            {statusCode}
          </div>
        break
      case DASHBOARD_CONSTANTS.STATUS_CODE_UNRECON:
        statusCell =
          <div className={selfStyles.statusCont + ' ' + selfStyles.statusUnrecon}>
            {statusCode}
          </div>
        break
      case DASHBOARD_CONSTANTS.STATUS_CODE_DISPUTE:
        statusCell =
          <div className={selfStyles.statusCont + ' ' + selfStyles.dispute}>
            {statusCode}
          </div>
    }
    return statusCell
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

    const directionText = rowItems.get('direction')
    // Get only first letter of status for display of color
    const statusCode = rowItems.get('status').substring(0,1)

    let directionCell = this.getDirectionCell(directionText)
    let statusCell = this.getStatusCell(statusCode)

    return (
      <div className={styles.tableRow}>
        <TableCell cellValue={rowItems.get('legalEntity')}/>
        <TableCell cellValue={rowItems.get('cptyOrg')}/>
        <TableCell cellValue={rowItems.get('cptyEntity')}/>
        <TableCell cellValue={rowItems.get('ccy')}/>
        <TableCell cellValue={this.checkNegative(rowItems.get('initialMargin'), numberWithCommas)}/>
        <TableCell cellValue={this.checkNegative(rowItems.get('variableMargin'), numberWithCommas)}/>
        <TableCell cellValue={this.checkNegative(excess, numberWithCommas)}/>
        <TableCell cellValue={directionCell}/>
        <TableCell cellValue={statusCell}/>
      </div>
    )
  }
}

export default TableRow
