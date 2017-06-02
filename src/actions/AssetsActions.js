export const AssetsPanel = {
  DeployedPanel_ToggleSideExpand: (isExpanded)=>{ return { type: "@DEPLOYED__TOGGLE_SIDE_EXPAND",
                                                           payload: isExpanded  }},
  DeployedPanel_ToggleInitVarMargin: (IsVarMarginSelected)=>{ return{ type:"@DEPLOYED__TOGGLE_INIT_VAR_MARGIN",
                                                                      payload: IsVarMarginSelected }},
  DeployedPanel_ToggleRegionCounterparty: (IsRegionSelected)=>{ return{ type:"@DEPLOYED__TOGGLE_CATEGORY",
                                                                        payload: IsRegionSelected }},
  DeployedPanel_ToggleVerticalExpand: (isExpanded)=>{ return { type: "@DEPLOYED__TOGGLE_Y_EXPAND",
                                                           payload: isExpanded  }},
  DeployedPanel_SearchText: (text)=>{ return { type: "@DEPLOYED__SEARCHTEXT",
                                               payload: text  }},
  HomePanel_ToggleVerticalExpand: (isExpanded)=>{ return { type: "@HOME__TOGGLE_Y_EXPAND",
                                                           payload: isExpanded  }},
  HomePanel_ToggleCategory: (IsPledgeSelected)=>{ return{ type:"@HOME__TOGGLE_CATEGORY",
                                                          payload: IsPledgeSelected }},
  ShowPopup: (bool)=>{ return{ type:"@SHOW_POPUP",
                               payload: bool }},
  Popup_DraggingHomeAssetID: (assetID)=>{ return{ type:"@HOME__DRAGGING_HOME_ASSET_ID",
                                                  payload: assetID }},
  Popup_DroppedHomeAssetInfo: (assetInfo)=>{ return{ type:"@DEPLOYED__DROPPED_HOME_ASSET_DETAILS",
                                                     payload: assetInfo }},
  Popup_DeployedAssetToBeReplaced: (assetInfo)=>{ return{ type:"@DEPLOYED__ASSET_TO_BE_REPLACED",
                                                          payload: assetInfo }}
}
