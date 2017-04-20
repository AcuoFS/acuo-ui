// export const assetPanelResizeToggle = ()=>{
//  return {
//    type: "ASSET_PANEL_RESIZE_TOGGLE",
//    payload: true
//  }
// }

export const AssetsPanel = {
  ResizeToggle: (handleStatus)=>{ return { type: "PANEL_RESIZE_TOGGLE",
                                           payload: handleStatus  }},

  MouseDownOnResize: (downOrNot)=>{ return { type: "PANEL_RESIZE_MOUSE_DOWN",
                                           payload: downOrNot  }},

  NewCursorY: (cursorY)=>{ return { type: "CURSOR_Y_POSITION",
                                    payload: cursorY  }},

  NewPanelHeight: (newHeight)=>{ return { type: "UPDATE_PANEL_HEIGHT",
                                          payload: newHeight  }}
}
