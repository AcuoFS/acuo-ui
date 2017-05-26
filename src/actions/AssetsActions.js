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
                                                          payload: IsPledgeSelected }}
}
