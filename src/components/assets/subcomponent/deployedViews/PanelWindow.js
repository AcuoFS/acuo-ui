import React from 'react'
import { connect } from 'react-redux'
import styles from './PanelWindow.css'
import Table from './tableUI/tableUI.js'
import NavBar from './NavBar.js'

const HeaderRowContent = ["Region" , "Agreement", "Counterparty"]
const HeaderRowStyle = {
 height: 24,
 rowSpan: 1
}

const RowContent = [ "Americas", "Acuo SG Pte Ltd v Counterparty B4", "Counterparty" ]
const RowStyle = {
  height: 24,
  rowSpan: 4
}

export default class PanelWindow extends React.Component {
  render(){
   return(
    <div className={styles.panelScreen}>
      <div className={styles.colLeft} >
        <NavBar />
        <Table.HeaderRow content={HeaderRowContent} style={HeaderRowStyle} />
        <Table.Row content={RowContent} style={RowStyle} / >
        <Table.Row content={RowContent} style={RowStyle} / >
      </div>
      <div className={styles.colRight} >
        <NavBar />
      </div>
    </div>
   )
  }
}
