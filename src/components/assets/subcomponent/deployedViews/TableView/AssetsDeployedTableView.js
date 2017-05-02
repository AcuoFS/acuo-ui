import React from 'react'
import styles from './AssetsDeployedTableView.css'
import NavBar from './../NavBar'
import NavBarStyle from './../NavBar.css'
import Table from './../tableUI/tableUI'

const AssetsDeployedTableView = (props)=>{

  let actions = props.actions

  let IsVarMarginSelected = props.state.ui.IsVarMarginSelected
  let IsRegionSelected = props.state.ui.IsRegionSelected

  let categoryHeader = props.categoryHeader
  let dataHeader = props.dataHeader

  let Content = props.tableContent
  let TableStyle = props.tableStyle

  return (
    <div className={styles.tableView}>
      <Table.RowGroup style={TableStyle.RowGroupStyle}>
        <Table.ColGroup style={TableStyle.RegCptyColGroupStyle}>
          <NavBar>
            <div className={ (IsRegionSelected? NavBarStyle.tabs + " " + NavBarStyle.selected : NavBarStyle.tabs ) }
                 onClick={()=>{actions.DeployedPanel_ToggleRegionCounterparty(!IsRegionSelected)}} >
              Region
            </div>
            <div className={(IsRegionSelected? NavBarStyle.tabs : NavBarStyle.tabs + " " + NavBarStyle.selected)}
                 onClick={()=>{actions.DeployedPanel_ToggleRegionCounterparty(!IsRegionSelected)}} >
              Counterparty
            </div>
          </NavBar>
         <Table.DataRow content={categoryHeader} style={TableStyle.RegCptyHeadStyle} />

        </Table.ColGroup>
        <Table.ColGroup style={TableStyle.VarMarginColGroupStyle}>
          <NavBar>
           <div className={IsVarMarginSelected? NavBarStyle.tabs : NavBarStyle.tabs + " " + NavBarStyle.selected }
                onClick={()=>{actions.DeployedPanel_ToggleInitVarMargin( !IsVarMarginSelected ) }} >
             Initial Margin
           </div>
           <div className={IsVarMarginSelected? NavBarStyle.tabs + " " + NavBarStyle.selected : NavBarStyle.tabs  }
                onClick={()=>{actions.DeployedPanel_ToggleInitVarMargin( !IsVarMarginSelected )  }}  >
             Variation Margin
           </div>
          </NavBar>
          <Table.DataRow content={dataHeader} style={TableStyle.VarMarginHeadStyle} />
        </Table.ColGroup>
      </Table.RowGroup>

     {Content.map((rowBlock, idx)=>{
      return(
       <Table.RowGroup style={TableStyle.DataBlockStyle} key={idx}>
         <Table.DataRow content={rowBlock.CategoryContent} style={TableStyle.RowStyle1} />
         <Table.ColGroup style={TableStyle.InnerColGroupStyle}>
           { rowBlock.RowContent.map( (rowData,idy)=>(<Table.DataRow content={rowData} style={TableStyle.RowStyle2} key={idy}/>) ) }
         <Table.DataRow content={rowBlock.PledgeContent} style={TableStyle.RowPledgeExcessStyle} />
         <Table.DataRow content={rowBlock.ExcessContent} style={TableStyle.RowPledgeExcessStyle} />
         </Table.ColGroup>
       </Table.RowGroup>
      )
     })}
    </div>
   )
}

export default AssetsDeployedTableView
