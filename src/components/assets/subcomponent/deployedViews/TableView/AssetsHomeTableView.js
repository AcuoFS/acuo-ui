import React from 'react';
import styles from './AssetsHomeTableView.css'
import NavBar from "../Navbar.js"
import Table from '../TableUI/TableUI.js'

// export default class AssetsHomeTableView extends React.Component{
const AssetsHomeTableView = (props)=>{

  // render(){
   console.log(props)
   let {Content, TableStyle} = props
   console.log(Content);
   console.log(TableStyle);

   return(
    <div className={styles.tableView}>
      <Table.RowGroup style={ TableStyle.RowGroupStyle } >
        <NavBar>
          Blah
        </NavBar>
      </Table.RowGroup>

      <Table.RowGroup style={ TableStyle.RowGroupStyle }>
        <Table.DataRow content={Content.Header} style={TableStyle.HeaderRow} />
      </Table.RowGroup>


    </div>
   )
  // }
}

export default AssetsHomeTableView
