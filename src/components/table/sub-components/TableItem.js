import React from 'react'
import TableBody from './TableBody'
import styles from '../Table.css'
import { Link } from 'react-router'


class TableItem extends React.Component {
  constructor(props) {
    super(props)
    this.compute = this.compute.bind(this)
    this.getMarginStatus = this.getMarginStatus.bind(this)
    this.getNumberOfActions = this.getNumberOfActions.bind(this)

  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  compute(key) {
    return this.getMarginStatus().reduce((sum, x) => {
      if (x.get('timeFrames'))
        return sum + x.get('timeFrames').reduce((sum, y) => {
            return sum + y.get('actionsList').reduce((sum, z) => {
                return sum + z.get(key)
              }, 0)
          }, 0)
      else
        return sum + 0
    }, 0)
  }

  getNumberOfActions() {

    return this.numberWithCommas(this.getMarginStatus().reduce((sum, x) => {
      if (x.get('timeFrames'))
        return sum + x.get('timeFrames').reduce((sum, y) => {
            return sum + y.get('actionsList').size
          }, 0)
      else
        return sum + 0
    }, 0))
  }

  getMarginStatus() {
    return this.props.deriv.get('marginStatus') || []
  }

  render() {

    const {redirect} = this.props

    return (
      <div>
        <div className={styles.table}>
          <div className={styles.derivItem}>
            <div className={styles.vertiCenter + " " + styles.derivType}>
              <p className={styles.centerThis + " " + styles.derivTypeText}>{this.props.deriv.get('type')}</p>
            </div>
          </div>

          <div className={styles.tableItem}>
            <div className={styles.margin}>
              <p className={styles.leftThis}>Initial Margin</p>
              <p
                className={styles.fineFont}>{this.numberWithCommas(this.compute('initialMargin'))}</p>
            </div>
          </div>

          <div className={styles.tableItem}>
            <div className={styles.margin}>
              <p className={styles.leftThis}>Variation Margin</p>
              <p className={styles.fineFont}>{this.numberWithCommas(this.compute('variableMargin'))}</p>
            </div>
          </div>

          <div className={styles.tableItem}>
            <div className={styles.margin}>
              <p className={styles.leftThis}>Excess</p>
              <p className={styles.fineFont}>{this.numberWithCommas((this.compute('collateralBalance') + this.compute('pendingCollateral')) - (this.compute('variableMargin') + this.compute('initialMargin')))}</p>
            </div>
          </div>

          <div className={styles.tableItem}>
            <div className={styles.margin}>
              <p className={styles.leftThis}>Collateral Balance</p>
              <p className={styles.fineFont}>{this.numberWithCommas(this.compute('collateralBalance'))}</p>
            </div>
          </div>

          <div className={styles.tableItem}>
            <div className={styles.margin}>
              <p className={styles.leftThis}>Pending Collateral</p>
              <p className={styles.fineFont}>{this.numberWithCommas(this.compute('pendingCollateral'))}</p>
            </div>
          </div>

          <div className={styles.actionItem}>
            <div className={styles.actionVertiCenter}>
              <Link to={'/recon'}>
                <div className={styles.actions} onClick={redirect} data-ref={this.props.deriv.get('type')} to={'/recon'}>
                  <div className={styles.text}>{this.getNumberOfActions()} ACTION ITEMS</div>
                  <div className={styles.arrow}></div>
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.toggleItem}>
            <div className={styles.vertiCenter}>
              <p className={styles.centerThis} onClick={this.props.clicked}>
                <img src={this.props.arrow} alt=""/>
              </p>
            </div>
          </div>
        </div>
        <TableBody numberWithCommas={this.numberWithCommas} marginStatus={this.getMarginStatus()}
                   open={this.props.toggle}/>
      </div>
    )
  }
}

export default TableItem
