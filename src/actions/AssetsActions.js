export const AssetsPanel = {
  DeployedPanel_ToggleSideExpand: (isExpanded)=>{ return { type: "@DEPLOYED_PANEL__TOGGLE_SIDE_EXPAND",
                                                         payload: isExpanded  }},
  DeployedPanel_ToggleVerticalExpand: (isExpanded)=>{ return { type: "@DEPLOYED_PANEL__TOGGLE_Y_EXPAND",
                                                               payload: isExpanded  }},
  DeployedPanel_ToggleInitVarMargin: (IsVarMarginSelected)=>{ return{ type:"@DEPLOYED__TOGGLE_INIT_VAR_MARGIN",
                                                        payload: IsVarMarginSelected }},
  DeployedPanel_ToggleRegionCounterparty: (IsRegionSelected)=>{ return{ type:"@DEPLOYED__TOGGLE_CATEGORY",
                                                          payload: IsRegionSelected }}
}
