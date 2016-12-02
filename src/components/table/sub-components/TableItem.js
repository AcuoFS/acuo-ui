import React from 'react'
import TableBody from './TableBody'
import styles from '../Table.css'


class TableItem extends React.Component{
  constructor(props){
    super(props)
      this.compute = this.compute.bind(this)
      this.getMarginStatus = this.getMarginStatus.bind(this)
      this.getNumberOfActions = this.getNumberOfActions.bind(this)

  }
  numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  compute(key){
     return this.getMarginStatus().reduce((sum, x) => {
       if(x.get('timeFrames'))
         return sum + x.get('timeFrames').reduce((sum, y) => {
           return sum + y.get('actionsList').reduce((sum, z) => {
             return sum + z.get(key)
           }, 0)
         }, 0)
         else
           return sum + 0
     }, 0)
  }
  getNumberOfActions(){

    return this.numberWithCommas(this.getMarginStatus().reduce((sum, x) => {
      if(x.get('timeFrames'))
        return sum + x.get('timeFrames').reduce((sum, y) => {
            return sum + y.get('actionsList').size
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
                  <p className={styles.fineFont}>{this.numberWithCommas(this.compute('variableMargin') + this.compute('initialMargin'))}</p>
              </div>
            </div>

            <div className={styles.listItem}>
              <div className={styles.vertiCenter}>
                  <p className={styles.centerThis}>CPTY Org</p>
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
                  <p className={styles.fineFont}>TBC</p>
              </div>
            </div>

            <div className={styles.actionItem}>
              <div className={styles.actionVertiCenter}>
                  <div className={styles.actions}>
                    <div className={styles.text}>{this.getNumberOfActions()} ACTION ITEMS</div>
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
          <TableBody numberWithCommas={this.numberWithCommas} marginStatus={this.getMarginStatus()} open={this.props.toggle}/>
      </div>
    )
  }
}

export default TableItem
