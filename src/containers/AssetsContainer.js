import { connect } from 'react-redux';
import { AssetsComponent } from '../components'
import { AssetsReducer } from '../reducers'
import { AssetsPanel } from '../actions/AssetsActions.js'

const mapStateToProps = (stateProps, ownProps) => {
  return {
   state: stateProps.AssetsReducer
  }
 }

const mapDispatchToProps = (dispatch, ownProps)=>{
 return {
  DeployedPanel_ToggleVerticalExpand: (isExpanded)=>{dispatch( AssetsPanel.DeployedPanel_ToggleVerticalExpand(isExpanded) )},
  DeployedPanel_ToggleSideExpand: (isExpanded)=>{dispatch( AssetsPanel.DeployedPanel_ToggleSideExpand(isExpanded) )},
  DeployedPanel_ToggleInitVarMargin: (IsVarMarginSelected)=>{dispatch(AssetsPanel.DeployedPanel_ToggleInitVarMargin(IsVarMarginSelected))},
  DeployedPanel_ToggleRegionCounterparty: (IsRegionSelected)=>{dispatch(AssetsPanel.DeployedPanel_ToggleRegionCounterparty(IsRegionSelected))}

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
