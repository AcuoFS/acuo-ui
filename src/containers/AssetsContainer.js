import { connect } from 'react-redux';
import { AssetsComponent } from '../components'
import { AssetsReducer } from '../reducers'
import { AssetsPanel } from '../actions/AssetsActions.js'

const mapStateToProps = (stateProps, ownProps) => {
  return {
    state: (stateProps.AssetsReducer).toJS(),
    substituted: stateProps.AssetsReducer.getIn(['ui', 'substituted'])
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    //***AssetsDeployedPanel***//
    DeployedPanel_ToggleVerticalExpand: (IsExpanded) => {
      dispatch(AssetsPanel.DeployedPanel_ToggleVerticalExpand(IsExpanded))
    },
    DeployedPanel_ToggleSideExpand: (IsExpanded) => {
      dispatch(AssetsPanel.DeployedPanel_ToggleSideExpand(IsExpanded))
    },
    DeployedPanel_ToggleInitVarMargin: (IsVarMarginSelected) => {
      dispatch(AssetsPanel.DeployedPanel_ToggleInitVarMargin(IsVarMarginSelected))
    },
    DeployedPanel_ToggleRegionCounterparty: (IsRegionSelected) => {
      dispatch(AssetsPanel.DeployedPanel_ToggleRegionCounterparty(IsRegionSelected))
    },
    DeployedPanel_SearchText: (text) => {
      dispatch(AssetsPanel.DeployedPanel_SearchText(text))
    },

    //AssetsHomePanel
    HomePanel_ToggleVerticalExpand: (IsExpanded) => {
      dispatch(AssetsPanel.HomePanel_ToggleVerticalExpand(IsExpanded))
    },
    HomePanel_ToggleCategory: (IsPledgeSelected) => {
      dispatch(AssetsPanel.HomePanel_ToggleCategory(IsPledgeSelected))
    },

    //***PopupRelated***//
    ShowPopup: (bool) => {
      dispatch(AssetsPanel.ShowPopup(bool))
    },
    Popup_Amount: (amount) => {
      dispatch(AssetsPanel.Popup_Amount(amount))
    },
    Popup_OnDragStart: (dragInfo) => {
      dispatch(AssetsPanel.Popup_OnDragStart(dragInfo))
    },
    Popup_OnDragEnd: (dragInfo) => {
      dispatch(AssetsPanel.Popup_OnDragEnd(dragInfo))
    },
    Popup_OnDrop: (dropInfo) => {
      dispatch(AssetsPanel.Popup_OnDrop(dropInfo))
    },
    Popup_onClickCancel: (resetAction) => {
      dispatch(AssetsPanel.Popup_onClickCancel(resetAction))
    },
    calculateAdjAmount: (amount) => {
      dispatch(AssetsPanel.onUpdateSubstitutedState(true))
      dispatch(AssetsPanel.onCalculateAdjAmount(amount))
    },
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    state: stateProps.state,
    actions: {...dispatchProps},
  }
}

const AssetsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AssetsComponent)

export default AssetsContainer;
