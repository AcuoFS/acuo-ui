import React from 'react'
import styles from './AssetsHomeTableView.css'
import NavBar from '../NavBar.js'
import NavBarStyle from './../NavBar.css'
import Table from '../tableUI/tableUI.js'


// export default class AssetsHomeTableView extends React.Component{
const AssetsHomeTableView = (props)=>{
   console.log("@---AssetsHomeTableView");
   console.log(props)
   let {Content, TableStyle} = props

   return(
    <div className={styles.tableView}>
      <Table.RowGroup style={ TableStyle.RowGroupStyle } >
        <NavBar>
          <div className={NavBarStyle.tabs}>Principal</div>
          <div className={NavBarStyle.tabs + " " + NavBarStyle.selected}>Pledge</div>
        </NavBar>
      </Table.RowGroup>

      <Table.ColGroup style={ TableStyle.RowGroupStyle }>
        <Table.DataRow content={Content.Header} style={TableStyle.HeaderRow} />

        {
           Content.RowData.map((row,idx)=>( <Table.DataRow content={row} style={TableStyle.DataRow} key={idx} /> ) )
        }

      </Table.ColGroup>

    </div>
   )
}

export default AssetsHomeTableView
