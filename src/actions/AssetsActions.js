export const AssetsPanel = {
  DeployedViewToggleSideExpand: (isExpanded)=>{ return { type: "@DEPLOYED_PANEL__TOGGLE_SIDE_EXPAND",
                                                         payload: isExpanded  }},
  InitVarMarginToggle: (IsVarMarginSelected)=>{ return{ type:"@DEPLOYED__TOGGLE_INIT_VAR_MARGIN",
                                                        payload: IsVarMarginSelected }},
  ToggleRegionCounterparty: (IsRegionSelected)=>{ return{ type:"@DEPLOYED__TOGGLE_CATEGORY",
                                                          payload: IsRegionSelected }}
}
