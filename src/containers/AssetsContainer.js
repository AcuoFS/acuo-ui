import { connect } from 'react-redux';
import { AssetsComponent } from '../components'
import { AssetsReducer } from '../reducers'
import { AssetsPanel } from '../actions/AssetsActions.js'
import {toJS} from 'immutable'

const mapStateToProps = (stateProps, ownProps) => {
  return {
   state: (stateProps.AssetsReducer).toJS()
  }
 }

const mapDispatchToProps = (dispatch, ownProps)=>{
 return {
  //***AssetsDeployedPanel***//
  DeployedPanel_ToggleVerticalExpand: (IsExpanded)=>{dispatch( AssetsPanel.DeployedPanel_ToggleVerticalExpand(IsExpanded) )},
  DeployedPanel_ToggleSideExpand: (IsExpanded)=>{dispatch( AssetsPanel.DeployedPanel_ToggleSideExpand(IsExpanded) )},
  DeployedPanel_ToggleInitVarMargin: (IsVarMarginSelected)=>{dispatch(AssetsPanel.DeployedPanel_ToggleInitVarMargin(IsVarMarginSelected))},
  DeployedPanel_ToggleRegionCounterparty: (IsRegionSelected)=>{dispatch(AssetsPanel.DeployedPanel_ToggleRegionCounterparty(IsRegionSelected))},
  DeployedPanel_SearchText: (text)=>{ dispatch(AssetsPanel.DeployedPanel_SearchText(text)) },

  //AssetsHomePanel
  HomePanel_ToggleVerticalExpand: (IsExpanded)=>{dispatch( AssetsPanel.HomePanel_ToggleVerticalExpand(IsExpanded) )},
  HomePanel_ToggleCategory: (IsPledgeSelected)=>{dispatch( AssetsPanel.HomePanel_ToggleCategory(IsPledgeSelected) )},

  //***PopupRelated***//
  // Popup_Update_DraggingAssetID: (HomeAssetID)=>{dispatch( AssetsPanel.Popup_Update_DraggingAssetID(HomeAssetID) )},
  ShowPopup: (bool)=>{dispatch(AssetsPanel.ShowPopup(bool))},
  Popup_Amount: (amount)=>{dispatch(AssetsPanel.Popup_Amount(amount))},
  // Popup_Update_DroppedAsset: (assetInfo)=>{dispatch(AssetsPanel.Popup_Update_DroppedAsset(assetInfo))},
  // Popup_Update_AssetToBeReplaced: (assetInfo)=>{dispatch(AssetsPanel.Popup_Update_AssetToBeReplaced(assetInfo))},
  Popup_OnDragStart: (dragInfo)=>{dispatch(AssetsPanel.Popup_OnDragStart(dragInfo))},
  Popup_OnDragEnd: (dragInfo)=>{dispatch(AssetsPanel.Popup_OnDragEnd(dragInfo))},
  Popup_OnDrop: (dropInfo)=>{dispatch(AssetsPanel.Popup_OnDrop(dropInfo))},
  Popup_onClickCancel: (resetAction)=>{dispatch(AssetsPanel.Popup_onClickCancel(resetAction))},

 }
}

const mergeProps = (stateProps, dispatchProps, ownProps)=>{
 return{
  state: stateProps.state,
  actions: {...dispatchProps}
 }
}

const AssetsContainer =  connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)( AssetsComponent )

export default AssetsContainer;
