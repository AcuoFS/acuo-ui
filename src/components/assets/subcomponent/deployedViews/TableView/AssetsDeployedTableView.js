import React from 'react'
import styles from './AssetsDeployedTableView.css'
import { NavBarDeployed } from './../NavBar'
import NavBarStyle from './../NavBar.css'
import Table from './../tableUI/tableUI'

const AssetsDeployedTableView = (props)=>{

  let { actions , state } = props

  let IsVarMarginSelected = props.state.ui.IsVarMarginSelected
  let assetCategory = (IsVarMarginSelected ? "varMargin" : "initMargin")
  let IsRegionSelected = props.state.ui.IsRegionSelected
  let IsDeployedPanelExpandedSideways = props.state.ui.DeployedPanel_ExpandedSideways

  let categoryHeader = props.categoryHeader
  let dataHeader = props.dataHeader

  let Content = props.tableContent;
  let TableStyle = props.tableStyle
  let CatCellWidth = props.cellWidth.category
  let DataCellWidth = props.cellWidth.data

  let HomePanel_ShowPopup = (state? state.ui.HomePanel_ShowPopup : false)


  return (
    <div className={styles.tableView}>
      <Table.RowGroup style={TableStyle.RowGroupStyle}>
        <Table.ColGroup style={TableStyle.RegCptyColGroupStyle}>
          <NavBarDeployed>
            <div className={ (IsRegionSelected? NavBarStyle.tabs + " " + NavBarStyle.selected : NavBarStyle.tabs ) }
                 onClick={()=>{actions.DeployedPanel_ToggleRegionCounterparty(!IsRegionSelected)}} >
              Region
            </div>
            <div className={(IsRegionSelected? NavBarStyle.tabs : NavBarStyle.tabs + " " + NavBarStyle.selected)}
                 onClick={()=>{actions.DeployedPanel_ToggleRegionCounterparty(!IsRegionSelected)}} >
              Counterparty
            </div>
          </NavBarDeployed>
         <Table.DataRow contentType={"deployed_categoryHeader"} content={categoryHeader} style={TableStyle.RegCptyHeadStyle} cellWidth={CatCellWidth}/>

        </Table.ColGroup>
        <Table.ColGroup style={TableStyle.VarMarginColGroupStyle}>
          <NavBarDeployed>
           <div className={IsVarMarginSelected? NavBarStyle.tabs : NavBarStyle.tabs + " " + NavBarStyle.selected }
                onClick={()=>{actions.DeployedPanel_ToggleInitVarMargin( !IsVarMarginSelected ) }} >
             Initial Margin
           </div>
           <div className={IsVarMarginSelected? NavBarStyle.tabs + " " + NavBarStyle.selected : NavBarStyle.tabs  }
                onClick={()=>{actions.DeployedPanel_ToggleInitVarMargin( !IsVarMarginSelected )  }}  >
             Variation Margin
           </div>
          </NavBarDeployed>
          <Table.DataRow contentType={"deployed_dataHeader"} content={dataHeader} style={TableStyle.VarMarginHeadStyle} cellWidth={DataCellWidth} />
        </Table.ColGroup>
      </Table.RowGroup>

     {Content.map((rowBlock, idx)=>{
      return(
       <Table.RowGroup style={TableStyle.DataBlockStyle} key={idx}>
         <Table.DataRow contentType={"deployed_CategoryContent"} content={rowBlock.CategoryContent} style={TableStyle.RowStyle1} cellWidth={CatCellWidth}/>
         <Table.ColGroup style={TableStyle.InnerColGroupStyle}>
           { rowBlock.RowContent.map( (rowData,idy)=>{
            // console.log(rowData.assetID);
            return <Table.DataRow contentType={"deployed_rowData"}
                                  assetCategory={assetCategory}
                                  assetID={rowData.assetID}
                                  content={rowData.assetInfo}
                                  actions={actions}
                                  state={state}
                                  style={TableStyle.RowStyle2}
                                  cellWidth={DataCellWidth}
                                  key={idy}
                                  IsDeployedPanelExpandedSideways={IsDeployedPanelExpandedSideways} />
           } ) }
         <Table.DataRow contentType={"deployed_PledgeContent"} content={rowBlock.PledgeContent} style={TableStyle.RowPledgeStyle} cellWidth={DataCellWidth} />
         <Table.DataRow contentType={"deployed_ExcessContent"} content={rowBlock.ExcessContent} style={TableStyle.RowExcessStyle} cellWidth={DataCellWidth} />
         </Table.ColGroup>
       </Table.RowGroup>
      )
     })}
    </div>
   )
}

export default AssetsDeployedTableView
