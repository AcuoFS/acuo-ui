import React from 'react'
import styles from './MarginCall.css'
import ContentRow from './MarginCallRow'

export default class MarginCall extends React.Component {
  constructor(props){
    super(props)
    this.openRow = this.openRow.bind(this)
    this.state = {
      openedRows: []
    }
  }

  openRow(e){
    //console.log(this.toggleRow(this.state.openedRows, e.currentTarget.dataset.ref))
    this.setState({
      openedRows: this.toggleRow(this.state.openedRows, e.currentTarget.dataset.ref)
    })
  }

  toggleRow(arr, index){
    console.log(arr.length)
    if(arr.length){
      if(arr.indexOf(index) > -1)
        console.log(arr.splice(arr.indexOf(index), 1))
      else
        console.log(arr.push(index))
    }else{
      console.log(arr.push(index))
    }
  }

  render() {
    return(
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Margin Call</div>
          <div className={styles.button}>Send selected Margin Calls</div>
        </div>
        <div className={styles.content}>
          <div className={styles.masterRow}>
            <div className={styles.cell}><input type="checkbox" /></div>
            <div className={styles.cell}>Legal Entity</div>
            <div className={styles.cell}>Cpty Organisation</div>
            <div className={styles.cell}>Cpty Entity</div>
            <div className={styles.cell}>Margin Agreement</div>
            <div className={styles.cell + ' ' + styles.dateCell}>Valuation Date</div>
            <div className={styles.cell + ' ' + styles.dateCell}>Call Date</div>
            <div className={styles.cell + ' ' + styles.callTypeCell}>Call Type</div>
            <div className={styles.cell + ' ' + styles.ccyCell}>CCY</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Total Call Amount</div>
            <div className={styles.cell}>Reference Identifier</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Exposure</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Collateral Value</div>
            <div className={styles.cell + ' ' + styles.largeCell}>Pending Collateral</div>
            <div className={styles.cell}></div>
          </div>

          <ContentRow id={1} key={1} spillContents={this.openRow} isOpen={this.state.openedRows.indexOf(1) > -1}/>
          <ContentRow id={2} key={2} spillContents={this.openRow} isOpen={this.state.openedRows.indexOf(2) > -1}/>

        </div>
      </div>
    )
  }
}