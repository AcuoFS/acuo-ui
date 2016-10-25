import React from 'react'

import styles from '../table.css'
import TableBody from './tablebody-component'

class TableItem extends React.Component{
  constructor(props){
    super(props)
      this.compute = this.compute.bind(this)

      this.getMarginStatus = this.getMarginStatus.bind(this)
  }
  numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  compute(key){
       return this.numberWithCommas(this.getMarginStatus().reduce((sum, x) => {
          if(x.get('timeFrames'))
          return sum + x.get('timeFrames').reduce((sum, y) => {
              return sum + y.get(key)
          }, 0)
           else
               return sum + 0
      }, 0))
  }
  getMarginStatus(){
      return this.props.deriv.get('marginStatus') || []
  }
  render() {
    return (
      <div>
        <div className={styles.table}>

            <div className={styles.derivItem}>
              <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>{this.props.deriv.get('type')}</p>
              </div>
            </div>

            <div className={styles.tableItem}>
              <div className={styles.margin}>
                  <p className={styles.leftThis}>CPTY Margin</p>
                  <p className={styles.fineFont}>{this.compute('CPTYMargin')}</p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>Region</p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>CCY</p>
              </div>
            </div>

            <div className={styles.tableItem}>
              <div className={styles.margin}>
                  <p className={styles.leftThis}>EXP.Margin</p>
                  <p className={styles.fineFont}>{this.compute('EXPMargin')}</p>
              </div>
            </div>

            <div className={styles.actionItem}>
              <div className={styles.actionVertiCenter}>
                  <div className={styles.actions}>
                    <div className={styles.text}>{this.compute('noOfActions')} ACTION ITEMS</div>
                    <div className={styles.arrow}></div>
                  </div>
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
          <TableBody marginStatus={this.props.deriv.get('marginStatus')} open={this.props.toggle}/>
      </div>
    )
  }
}

export default TableItem
