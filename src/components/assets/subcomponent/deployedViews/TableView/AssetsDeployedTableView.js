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

  let incomingDragHomeAssetID = (state.data.Popup_DraggingHomeAssetID ? state.data.Popup_DraggingHomeAssetID : false)

  let eligibilityCheck = ( incomingDragHomeAssetID , assetCategory , AgreementData )=>{
   if(incomingDragHomeAssetID){
    let ineligible_IDs = AgreementData.RawAgreementObject.ineligible_IDs // Array Type
    return _.includes( ineligible_IDs , parseInt(incomingDragHomeAssetID))
   }
   else false
  }
  let renderIneligibleFade =  eligibility => { if(eligibility) {return <Table.FadeScreen/>} }

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

     {Content.map((AgreementData, idx)=>{

      const eligibility = eligibilityCheck( incomingDragHomeAssetID, assetCategory, AgreementData )

      return(
       <Table.RowGroup style={TableStyle.DataBlockStyle} key={idx}>
         { renderIneligibleFade(eligibility) }
         <Table.DataRow contentType={"deployed_CategoryContent"} content={AgreementData.CategoryContent} style={TableStyle.RowStyle1} cellWidth={CatCellWidth} />
         <Table.ColGroup style={TableStyle.InnerColGroupStyle}>
           { AgreementData.RowContent.map( (rowData,idy)=>{
            return <Table.DataRow contentType={"deployed_rowData"}
                                  state={state}
                                  actions={actions}
                                  assetCategory={assetCategory}
                                  assetID={rowData.assetID}
                                  content={rowData.assetInfo}
                                  style={TableStyle.RowStyle2}
                                  cellWidth={DataCellWidth}
                                  IsDeployedPanelExpandedSideways={IsDeployedPanelExpandedSideways}
                                  key={idy}
                                  />
           } ) }
         <Table.DataRow contentType={"deployed_PledgeContent"} content={AgreementData.PledgeContent} style={TableStyle.RowPledgeStyle} cellWidth={DataCellWidth}/>
         <Table.DataRow contentType={"deployed_ExcessContent"} content={AgreementData.ExcessContent} style={TableStyle.RowExcessStyle} cellWidth={DataCellWidth}/>
         </Table.ColGroup>
       </Table.RowGroup>
      )
     })}
    </div>
   )
}

export default AssetsDeployedTableView
