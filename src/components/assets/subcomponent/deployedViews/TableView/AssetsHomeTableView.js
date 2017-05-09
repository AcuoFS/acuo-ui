import React from 'react'
import styles from './AssetsHomeTableView.css'
import { NavBarHome } from '../NavBar.js'
import NavBarStyle from './../NavBar.css'
import Table from '../tableUI/tableUI.js'


// export default class AssetsHomeTableView extends React.Component{
const AssetsHomeTableView = (props)=>{
   // console.log("@---AssetsHomeTableView");
   let IsPledgeSelected = props.state.ui.HomePanel_IsPledgeSelected
   let {Content, actions, TableStyle, cellWidth} = props

   return(
    <div className={styles.tableView}>
      <Table.RowGroup style={ TableStyle.RowGroupStyle } >
        <NavBarHome>

          <div className={NavBarStyle.tabs + " " + (IsPledgeSelected ? null :  NavBarStyle.selected)}
               onClick={()=>{actions.HomePanel_ToggleCategory(!IsPledgeSelected)}}  >
            Principal
          </div>

          <div className={NavBarStyle.tabs + " " + (IsPledgeSelected ? NavBarStyle.selected : null)}
               onClick={()=>{actions.HomePanel_ToggleCategory(!IsPledgeSelected)}}  >
            Pledge
          </div>

        </NavBarHome>
      </Table.RowGroup>

      <Table.ColGroup style={ TableStyle.RowGroupStyle }>
        <Table.DataRow content={Content.Header} style={TableStyle.HeaderRow } cellWidth={cellWidth} />

        {
           Content.RowData.map((row,idx)=>( <Table.DataRow content={row} style={TableStyle.DataRow} key={idx} cellWidth={cellWidth} /> ) )
        }

      </Table.ColGroup>

    </div>
   )
}

export default AssetsHomeTableView
