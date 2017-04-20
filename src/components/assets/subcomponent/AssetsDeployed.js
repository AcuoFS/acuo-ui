import React from 'react';
import styles from './AssetsPanel.css'

export default class AssetsDeployedComponent extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    // console.log("Deployed Panel Frame Mounted!")
    let panelHeight =  this.props.ui.deployedPanel.panelHeight.toString() + "px"
    this.deployedFrame.style.height = panelHeight
   }

  componentDidUpdate(){
    // console.log("Deployed Panel Frame Updated!");
    // console.log(this.props);
    let handleActive = this.props.ui.deployedPanel.resizeHandleActive
    let isMouseDown = this.props.ui.deployedPanel.resizeHandleMouseDown
    console.log(handleActive + "/" + isMouseDown);

    let panelHeight =  this.props.ui.deployedPanel.panelHeight.toString() + "px"
    this.deployedFrame.style.height = panelHeight
   }

  render(){
   let resizeHandleActive = this.props.ui.deployedPanel.resizeHandleActive
   let isMouseDown = this.props.ui.deployedPanel.resizeHandleMouseDown
    return(
    <div className={ styles.assetsPanelFrame }
          ref={ (node)=> this.deployedFrame = node}
          onMouseUp={ (e)=>{e.stopPropagation(); if(isMouseDown){ this.props.dispatch.MouseDownOnResize(false) } }}
          onMouseMove={ (e)=>{e.stopPropagation(); if(resizeHandleActive || isMouseDown) { this.props.dispatch.GetNewPanelHeight(e.clientY) }}}
          >
       <div  className={ styles.assetsPanelTitle} >
        <span  className={ styles.assetsPanelTitleText }> Deployed </span>
       </div>
       <div className={styles.panelResizeHandle}
            onMouseDown={ (e)=>{ if(!resizeHandleActive) {
                                   this.props.dispatch.ResizeToggle(true)
                                   this.props.dispatch.MouseDownOnResize(true)
                                   this.props.dispatch.NewCursorY(e.clientY) } }}
            onMouseUp={ (e)=>{e.stopPropagation(); if(resizeHandleActive) { this.props.dispatch.MouseDownOnResize(false) } }}
            onMouseLeave={ ()=>{ if(resizeHandleActive) { this.props.dispatch.ResizeToggle(false) } } }
            onMouseMove={ (e)=>{e.stopPropagation(); if(resizeHandleActive || isMouseDown) { this.props.dispatch.GetNewPanelHeight(e.clientY) }}}
             >
         ooo
       </div>
     </div>
    )
  }
}
