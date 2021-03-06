import React from 'react'
import styles from './AssetsHomeTableView.css'
import { NavBarHome } from '../NavBar.js'
import NavBarStyle from './../NavBar.css'
import Table from '../tableUI/tableUI.js'

// export default class AssetsHomeTableView extends React.Component{
const AssetsHomeTableView = (props)=>{
   let IsPledgeSelected = props.state.ui.HomePanel_IsPledgeSelected
   let assetCategory = ( IsPledgeSelected ? "pledged" : "principal" )
   let IsDeployedPanelExpandedSideways = props.state.ui.DeployedPanel_ExpandedSideways
   let { Content, state, actions, TableStyle } = props
   let { Popup_DraggingAssetID } = state.data
   let cellWidth = (IsDeployedPanelExpandedSideways?  props.cellWidth.minimized : props.cellWidth.expanded )
   let HomePanel_ShowPopup = (state? state.ui.HomePanel_ShowPopup : false)

   let Popup_DraggingDeployedAssetID = ( state.data.Popup_DraggingDeployedAssetID ? state.data.Popup_DraggingDeployedAssetID : null )
   let Popup_OriginAgreement = ( state.data.Popup_OriginAgreement ? state.data.Popup_OriginAgreement : null )
   let eligibilityCheck = (Popup_DraggingDeployedAssetID, Popup_OriginAgreement, homeAsset)=>{
     if(Popup_DraggingDeployedAssetID && Popup_OriginAgreement && homeAsset){
       let {ineligible_IDs} = Popup_OriginAgreement
       return _.some( ineligible_IDs , (id)=>{ return id === parseInt(homeAsset.assetID) } )
     }
   }
   let renderIneligibleFade =  eligibility => { if(eligibility) {return <Table.FadeScreen height={`${TableStyle.FadeScreen.height}px`}  />} }

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
        <Table.DataRow contentType={ "home_Header"} content={Content.Header} style={TableStyle.HeaderRow } cellWidth={ cellWidth } />

        {
          _.map( Content.RowData , (row,idx)=>{
            const eligibility = eligibilityCheck(Popup_DraggingDeployedAssetID, Popup_OriginAgreement, row)
            return(
             <div key={ row.assetID }>
              { renderIneligibleFade(eligibility) }
              <Table.DataRow contentType={ "home_Row" }
                             state={ state }
                             actions={ actions }
                             assetCategory={ assetCategory }
                             assetID = { row.assetID }
                             content={ row.assetInfo }
                             style={ TableStyle.DataRow }
                             IsDeployedPanelExpandedSideways={ IsDeployedPanelExpandedSideways }
                             cellWidth={ cellWidth }
                             />
             </div>
            )
           })//end map()
        }

      </Table.ColGroup>

    </div>
   )
}

export default AssetsHomeTableView
