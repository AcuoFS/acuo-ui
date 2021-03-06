import {
  ON_CAL_ADJ_AMOUNT,
  UPDATE_SUBSTITUTED_FLAG
} from './../constants/ActionTypes'

export const AssetsPanel = {
  DeployedPanel_ToggleSideExpand: (isExpanded) => {
    return {
      type: "@DEPLOYED__TOGGLE_SIDE_EXPAND",
      payload: isExpanded
    }
  },
  DeployedPanel_ToggleInitVarMargin: (IsVarMarginSelected) => {
    return {
      type: "@DEPLOYED__TOGGLE_INIT_VAR_MARGIN",
      payload: IsVarMarginSelected
    }
  },
  DeployedPanel_ToggleRegionCounterparty: (IsRegionSelected) => {
    return {
      type: "@DEPLOYED__TOGGLE_CATEGORY",
      payload: IsRegionSelected
    }
  },
  DeployedPanel_ToggleVerticalExpand: (isExpanded) => {
    return {
      type: "@DEPLOYED__TOGGLE_Y_EXPAND",
      payload: isExpanded
    }
  },
  DeployedPanel_SearchText: (text) => {
    return {
      type: "@DEPLOYED__SEARCHTEXT",
      payload: text
    }
  },

  HomePanel_ToggleVerticalExpand: (isExpanded) => {
    return {
      type: "@HOME__TOGGLE_Y_EXPAND",
      payload: isExpanded
    }
  },
  HomePanel_ToggleCategory: (IsPledgeSelected) => {
    return {
      type: "@HOME__TOGGLE_CATEGORY",
      payload: IsPledgeSelected
    }
  },

  // ShowPopup: (bool)=>{ return{ type:"@SHOW_POPUP",
  //                              payload: bool }},
  Popup_Amount: (amount) => {
    return {
      type: "@POPUP_AMOUNT",
      payload: amount
    }
  },
  Popup_Update_DraggingAssetID: (assetID) => {
    return {
      type: "@POPUP__DRAGGING__ASSET_ID",
      payload: assetID
    }
  },
  // Popup_Update_DroppedAsset: (assetInfo)=>{ return{ type:"@POPUP__DROPPED_ASSET",
  //                                                    payload: assetInfo }},
  // Popup_Update_AssetToBeReplaced: (assetInfo)=>{ return{ type:"@POPUP__ASSET_TO_BE_REPLACED",
  //                                                        payload: assetInfo }},
  Popup_OnDragStart: (dragInfo) => {
    return {
      type: "@POPUP_ON_DRAG_START",
      payload: dragInfo
    }
  },
  Popup_OnDragEnd: (dragInfo) => {
    return {
      type: "@POPUP_ON_DRAG_END",
      payload: dragInfo
    }
  },
  Popup_OnDrop: (dropInfo) => {
    return {
      type: "@POPUP_ON_DROP",
      payload: dropInfo
    }
  },
  Popup_onClickCancel: (cancelAction) => {
    return {
      type: "@POPUP_ON_CLICK_CANCEL",
      payload: cancelAction
    }
  },

  onCalculateAdjAmount: (amount) => ({
    type: ON_CAL_ADJ_AMOUNT,
    amount
  }),

  onUpdateSubstitutedState: (flag) => ({
    type: UPDATE_SUBSTITUTED_FLAG,
    flag
  })

}
