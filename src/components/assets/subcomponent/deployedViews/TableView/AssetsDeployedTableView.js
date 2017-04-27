import React from 'react';
import { connect } from 'react-redux'
import styles from './AssetsDeployedTableView.css'
import NavBar from "../Navbar.js"
import NavBarStyle from "../NavBar.css"
import Table from '../TableUI/TableUI.js'
import { AssetsPanel } from '../../../../../actions/AssetsActions.js'

/*  AssetsDeployedTableView shall contain only presentational components to form the tableUI
      - All table components should come from tableUi.js  */

class AssetsDeployedTable extends React.Component{
 constructor(props){
  super(props)
 }

 toggleCategory = (bool)=>{
  this.props.ToggleRegionCounterparty(bool)
 }

 render(){
  let categoryHeader = this.props.categoryHeader
  let dataHeader = this.props.dataHeader

  let Content = this.props.tableContent
  let TableStyle = this.props.tableStyle
  let IsDeployedPanelExpandedSideways = this.props.state.ui.IsDeployedPanelExpandedSideways;
  let IsVarMarginSelected = this.props.state.ui.IsVarMarginSelected
  let IsRegionSelected = this.props.state.ui.IsRegionSelected

  return (
    <div className={styles.tableView}>
     <Table.RowGroup style={TableStyle.RowGroupStyle}>
      <Table.ColGroup style={TableStyle.RegCptyColGroupStyle}>
       <NavBar>
        <div className={ (IsRegionSelected? NavBarStyle.tabs + " " + NavBarStyle.selected : NavBarStyle.tabs ) }
             onClick={()=>{this.props.ToggleRegionCounterparty(!IsRegionSelected)}}
         >
          Region
        </div>
        <div className={(IsRegionSelected? NavBarStyle.tabs : NavBarStyle.tabs + " " + NavBarStyle.selected)}
             onClick={()=>{this.props.ToggleRegionCounterparty(!IsRegionSelected)}}
         >
          Counterparty
        </div>
       </NavBar>
       <Table.DataRow content={categoryHeader} style={TableStyle.RegCptyHeadStyle} />

      </Table.ColGroup>
      <Table.ColGroup style={TableStyle.VarMarginColGroupStyle}>
       <NavBar>
        <div className={IsVarMarginSelected? NavBarStyle.tabs : NavBarStyle.tabs + " " + NavBarStyle.selected }
             onClick={()=>{this.props.InitVarMarginToggle( !IsVarMarginSelected ) }} >
          Initial Margin
        </div>
        <div className={IsVarMarginSelected? NavBarStyle.tabs + " " + NavBarStyle.selected : NavBarStyle.tabs  }
             onClick={()=>{ this.props.InitVarMarginToggle( !IsVarMarginSelected )  }}  >
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
          {rowBlock.RowContent.map((rowData,idy)=>{
            return(
             <Table.DataRow content={rowData} style={TableStyle.RowStyle2} key={idy}/>
            )
          })}
         <Table.DataRow content={rowBlock.PledgeContent} style={TableStyle.RowPledgeExcessStyle} />
         <Table.DataRow content={rowBlock.ExcessContent} style={TableStyle.RowPledgeExcessStyle} />
         </Table.ColGroup>
       </Table.RowGroup>
      )
     })}

    </div>
   )
 }
}

/*-------------------------------*/
let mapStateToProps = (stateProps, ownProps)=>{
 return {
  ...ownProps
 }
}
let mapDispatchToProps = (dispatch, ownProps)=>{
  return{
   InitVarMarginToggle: (IsVarMarginSelected)=>{dispatch(AssetsPanel.InitVarMarginToggle(IsVarMarginSelected))},
   ToggleRegionCounterparty: (IsRegionSelected)=>{dispatch(AssetsPanel.ToggleRegionCounterparty(IsRegionSelected))}
  }
}
let AssetsDeployedTableView = connect(null,mapDispatchToProps)(AssetsDeployedTable)
export default AssetsDeployedTableView





// <Table.RowGroup style={TableStyle.DataBlockStyle}>
//   <Table.DataRow content={Content.RowContent1} style={TableStyle.RowStyle1} />
//   <Table.ColGroup style={TableStyle.InnerColGroupStyle}>
//     <Table.DataRow content={Content.RowContent2} style={TableStyle.RowStyle2} />
//     <Table.DataRow content={Content.RowContent2} style={TableStyle.RowStyle2} />
//     <Table.DataRow content={Content.RowContentPledge} style={TableStyle.RowPledgeExcessStyle} />
//     <Table.DataRow content={Content.RowContentExcess} style={TableStyle.RowPledgeExcessStyle} />
//   </Table.ColGroup>
// </Table.RowGroup>
