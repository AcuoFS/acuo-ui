import React from 'react'
import TableBody from './TableBody'
import styles from '../Table.css'
import { Link } from 'react-router'
import _ from 'lodash'

class TableItem extends React.Component {
  constructor(props) {
    super(props)
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  compute(deriv, key) {
    return _.reduce(this.getMarginStatus(deriv), (sum, x) => {
      if (x.timeFrames)
        return sum + _.reduce(x.timeFrames, (sum, y) => {
            return sum + _.reduce(y.actionsList, (sum, z) => {
                return sum + parseInt(_.get(z, key) ? _.get(z, key) : 0)
              }, 0)
          }, 0)
      else
        return sum + 0
    }, 0)
  }

  getNumberOfActions(deriv) {

    return this.numberWithCommas(_.reduce(this.getMarginStatus(deriv), (sum, x) => {
      if (x.timeFrames)
        return sum + _.reduce(x.timeFrames, (sum, y) => {
            return sum + y.actionsList.length
          }, 0)
      else
        return sum + 0
    }, 0))
  }

  getMarginStatus(deriv) {
    return deriv.marginStatus || []
  }

  checkNegative(orgAmount, numbersWithCommas){
    const amount = parseFloat(orgAmount)

    if(amount < 0)
      return '(' + numbersWithCommas(Math.abs(amount || 0)) + ')'
    else
      return numbersWithCommas(amount || 0)
  }

  derivTypeMapping(type) {
    switch(type){
      case 'OTC_legacy':
        return 'OTC Legacy'
      case 'OTC_bilateral':
        return 'OTC Bilateral'
      case 'OTC_clear':
        return 'OTC Clear'
      default:
        return type
    }
  }

  render() {

    const {redirect, deriv, clicked, arrow, toggle, onLineItemClick} = this.props

    const excess = (this.compute(deriv, 'collateralBalance') + this.compute(deriv, 'pendingCollateral')) - (this.compute(deriv, 'variableMargin') + this.compute(deriv, 'initialMargin'))

    return (
      <div>
        <div className={styles.table}>
          <div className={styles.derivItem}>
            <div className={styles.vertiCenter + " " + styles.derivType}>
              <p className={styles.centerThis + " " + styles.derivTypeText}>{this.derivTypeMapping(deriv.type)}</p>
            </div>
          </div>

          <div className={styles.tableItem}>
            <div className={styles.margin}>
              <p className={styles.leftThis}>Initial Margin</p>
              <p
                className={styles.fineFont}>{this.checkNegative(this.compute(deriv, 'initialMargin'), this.numberWithCommas)}</p>
            </div>
          </div>

          <div className={styles.tableItem}>
            <div className={styles.margin}>
              <p className={styles.leftThis}>Variation Margin</p>
              <p className={styles.fineFont}>{this.checkNegative(this.compute(deriv, 'variableMargin'), this.numberWithCommas)}</p>
            </div>
          </div>

          <div className={styles.tableItem}>
            <div className={styles.margin}>
              <p className={styles.leftThis}>Excess</p>
              <p className={styles.fineFont}>{this.checkNegative(excess, this.numberWithCommas)}</p>
            </div>
          </div>

          <div className={styles.tableItem}>
            <div className={styles.margin}>
              <p className={styles.leftThis}>Collateral Balance</p>
              <p className={styles.fineFont}>{this.checkNegative(this.compute(deriv, 'balanceAmount'), this.numberWithCommas)}</p>
            </div>
          </div>

          <div className={styles.tableItem}>
            <div className={styles.margin}>
              <p className={styles.leftThis}>Pending Collateral</p>
              <p className={styles.fineFont}>{this.numberWithCommas(this.compute(deriv, 'pendingCollateral'))}</p>
            </div>
          </div>

          <div className={styles.actionItem}>
            <div className={styles.actionVertiCenter}>
              <Link to={'/recon'}>
                <div className={styles.actions} onClick={() => redirect(deriv.type)} to={'/recon'}>
                  <div className={styles.text}>{this.getNumberOfActions(deriv)} ACTION ITEMS</div>
                  <div className={styles.arrow}></div>
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.toggleItem}>
            <div className={styles.vertiCenter}>
              <p className={styles.centerThis} onClick={clicked}>
                <img src={arrow} alt=""/>
              </p>
            </div>
          </div>
        </div>
        <TableBody numberWithCommas={this.numberWithCommas} marginStatus={this.getMarginStatus(deriv)}
                   open={toggle} onLineItemClick={onLineItemClick}/>
      </div>
    )
  }
}

export default TableItem
