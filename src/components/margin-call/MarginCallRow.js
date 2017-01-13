/**
* Created by Hz on 2017-01-13.
* this is a single row, data from parent should be - row
 */
import React from 'react'
import styles from './MarginCall.css'
import { numberWithCommas } from '../../utils/numbersWithCommas'


export default class MarginCallRow extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      isChecked: props.isChecked
    }

    this.toggleIsChecked = this.toggleIsChecked.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isChecked: nextProps.isChecked
    })
  }

  checkNegative(amount){
    if(amount < 0)
      return '(' + numberWithCommas(Math.abs(amount)) + ')'
    else
      return  numberWithCommas(Math.abs(amount))
  }

  toggleIsChecked() {
    this.setState(state => Object.assign({}, state, {isChecked: !state.isChecked}))
  }

  render(){
    const {isOpen, displayAll, spillContents, row:item} = this.props
    const id = 'temp_static_id'

    return <div className={styles.flexContainer}>
      <div className={styles.cell}><input type="checkbox" checked={this.state.isChecked} onChange={this.toggleIsChecked} /></div>
      <div className={styles.cell}>{item.legalEntity}</div>
      <div className={styles.cell}>{item.cptyOrg}</div>
      <div className={styles.cell}>{item.cptyEntity}</div>
      <div className={styles.cell}>{item.marginAgreement}</div>
      <div className={styles.cell + ' ' + styles.dateCell}>{item.valuationDate}</div>
      <div className={styles.cell + ' ' + styles.dateCell}>{item.callDate}</div>
      <div className={styles.cell + ' ' + styles.callTypeCell}>{item.callType}</div>
      <div className={styles.cell + ' ' + styles.ccyCell}>{item.currency}</div>
      <div className={styles.cell + ' ' + styles.largeCell}>{this.checkNegative(item.totalCallAmount)}</div>
      <div className={styles.cell}>{item.referenceIdentifier}</div>
      <div className={styles.cell + ' ' + styles.largeCell}>{this.checkNegative(item.exposure)}</div>
      <div className={styles.cell + ' ' + styles.largeCell}>{this.checkNegative(item.collateralValue)}</div>
      <div className={styles.cell + ' ' + styles.largeCell}>{item.pendingCollateral}</div>
      <div className={styles.cell} onClick={spillContents} data-ref={id}></div>
    </div>
  }
}
