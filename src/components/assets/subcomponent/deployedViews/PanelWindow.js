import React from 'react'
import { connect } from 'react-redux'
import styles from './PanelWindow.css'
import Table from './tableUI/tableUI.js'
import NavBar from './NavBar.js'


export default class PanelWindow extends React.Component {
  render(){
   return(
    <div className={styles.panelScreen}>
      <div className={styles.colLeft} >
        <NavBar />
        <Table.Header/>
      </div>
      <div className={styles.colRight} > Right </div>
    </div>
   )
  }
}
