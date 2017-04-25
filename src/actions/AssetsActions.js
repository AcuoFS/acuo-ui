export const AssetsPanel = {
  DeployedViewToggleSideExpand: (isExpanded)=>{ return { type: "@DEPLOYED_PANEL__TOGGLE_SIDE_EXPAND",
                                                         payload: isExpanded  }},
  InitVarMarginToggle: (IsVarMarginSelected)=>{ return{ type:"@DEPLOYED__TOGGLE_INIT_VAR_MARGIN",
                                                        payload: IsVarMarginSelected } }
}

// export const AssetsPanel = {
//   ResizeToggle: (handleStatus)=>{ return { type: "PANEL_RESIZE_TOGGLE",
//                                            payload: handleStatus  }},
//
//   MouseDownOnResize: (downOrNot)=>{ return { type: "PANEL_RESIZE_MOUSE_DOWN",
//                                            payload: downOrNot  }},
//
//   NewCursorY: (cursorY)=>{ return { type: "CURSOR_Y_POSITION",
//                                     payload: cursorY  }},
//
//   NewPanelHeight: (newHeight)=>{ return { type: "UPDATE_PANEL_HEIGHT",
//                                           payload: newHeight  }}
// }
