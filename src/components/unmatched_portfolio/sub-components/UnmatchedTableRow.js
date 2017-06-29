import React from 'react'
import {checkBox, checkBoxWithTick} from '../../../../images/common'
import styles from './UnmatchedTable.css'


export default class UnmatchedTableRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // isChecked: _.some(props.selectedList,
      //   (selectedItem) => selectedItem.msId == props.portfolio.msId)
      // Set checkbox if list contains this portfolio
      isChecked: props.selectedList.includes(props.portfolio)
    }

    this.onCheck = this.onCheck.bind(this)
  }

  onCheck(portfolio) {
    // Send to parent
    this.props.onTableRow(portfolio, !this.state.isChecked)

    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  render() {
    const {portfolio, widths} = this.props
    return (
      <div className={styles.row}>
        <div className={styles.rowCell}
             ref={(node)=>{ if(node){ node.style.width = `${widths[0]}%` }} } >
              <img src={this.state.isChecked ? checkBoxWithTick : checkBox} onClick={() => this.onCheck(portfolio)}/>
         </div>

        <div className={styles.rowCell}
             ref={(node)=>{ if(node){ node.style.width = `${widths[1]}%` }} } >
             {portfolio.counterparty}
        </div>

        <div className={styles.rowCell}
             ref={(node)=>{ if(node){ node.style.width = `${widths[2]}%` }} } >
             {portfolio.netTotalIm}
        </div>

        <div className={styles.rowCell}
             ref={(node)=>{ if(node){ node.style.width = `${widths[3]}%` }} } >
             {portfolio.netVmCall}
        </div>

        <div className={styles.rowCell}
             ref={(node)=>{ if(node){ node.style.width = `${widths[4]}%` }} } >
             {portfolio.interestPayment}
        </div>

        <div className={styles.rowCell}
             ref={(node)=>{ if(node){ node.style.width = `${widths[5]}%` }} } >
             {portfolio.productCashFlow}
        </div>

        <div className={styles.rowCell}
             ref={(node)=>{ if(node){ node.style.width = `${widths[6]}%` }} } >
             {portfolio.dailyPai}
        </div>

        <div className={styles.rowCell}
             ref={(node)=>{ if(node){ node.style.width = `${widths[7]}%` }} } >
             {portfolio.feesComms}
        </div>

        <div className={styles.rowCell}
             ref={(node)=>{ if(node){ node.style.width = `${widths[8]}%` }} } >
             {portfolio.pendingNonCash}
        </div>

        <div className={styles.rowCell}
             ref={(node)=>{ if(node){ node.style.width = `${widths[9]}%` }} } >
             {portfolio.pendingCash}
        </div>

      </div>
    )
  }
}
