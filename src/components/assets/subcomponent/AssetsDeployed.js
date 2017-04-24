import React from 'react';
import styles from './AssetsPanel.css'
import _ from 'lodash'

/*Components*/
import PanelWindow from './deployedViews/PanelWindow.js'

export default class AssetsDeployedComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
     ExpandVertical: false,
     ExpandSideways: false
    }
  }

  componentDidMount(){
   }

  componentDidUpdate(){
   }

   // onClick={ ()=>{ console.log(this.state)
   //                 let newState = _.set(_.cloneDeep(this.state), ['ExpandSideways'], !this.state.ExpandSideways)
   //                 this.setState(newState)

   render(){
    let resizeHandleActive = this.props.ui.deployedPanel.resizeHandleActive
    let isMouseDown = this.props.ui.deployedPanel.resizeHandleMouseDown
     return(
     <div className={ this.state.ExpandVertical? (styles.assetsPanelFrameExpanded) : (styles.assetsPanelFrame) }
          ref={ (node)=> this.deployedFrame = node}  >
        <div className={ styles.assetsPanelHeader} >
           <span className={ styles.assetsPanelTitleText }> Deployed </span>
           <input className={styles.assetsPanelHeaderInput} type={"text"}></input>
           <img className={styles.assetsPanelHeaderSideExpandBtn}
                src="images/assets_deployed/expand-sideways.svg"
                onClick={ ()=>{ console.log(this.state)

                }}
                />
        </div>
        <PanelWindow />
        <div className={styles.panelResizeHandle}
             onClick={ (e)=>{ this.setState( (prevState)=> ({ExpandVertical: !this.state.ExpandVertical})) }}
              >
          ooo
        </div>
     </div>
     )
   }



  // Code for resizable panels using mouse drag (buggy!!!)
  // render(){
  //  let resizeHandleActive = this.props.ui.deployedPanel.resizeHandleActive
  //  let isMouseDown = this.props.ui.deployedPanel.resizeHandleMouseDown
  //   return(
  //   <div className={ styles.assetsPanelFrame }
  //        ref={ (node)=> this.deployedFrame = node}
  //        onMouseUp={ (e)=>{e.stopPropagation(); if(isMouseDown){ this.props.dispatch.MouseDownOnResize(false) } }}
  //        onMouseMove={ (e)=>{e.stopPropagation(); if(resizeHandleActive || isMouseDown) { this.props.dispatch.GetNewPanelHeight(e.clientY) }}}
  //         >
  //      <div  className={ styles.assetsPanelTitle} > <span className={ styles.assetsPanelTitleText }> Deployed </span> </div>
  //      <PanelWindow />
  //      <div className={styles.panelResizeHandle}
  //           onMouseDown={ (e)=>{ if(!resizeHandleActive) {
  //                                  this.props.dispatch.ResizeToggle(true)
  //                                  this.props.dispatch.MouseDownOnResize(true)
  //                                  this.props.dispatch.NewCursorY(e.clientY) } }}
  //           onMouseUp={ (e)=>{e.stopPropagation(); if(resizeHandleActive) { this.props.dispatch.MouseDownOnResize(false) } }}
  //           onMouseLeave={ ()=>{ if(resizeHandleActive) { this.props.dispatch.ResizeToggle(false) } } }
  //           onMouseMove={ (e)=>{e.stopPropagation(); if(resizeHandleActive || isMouseDown) { this.props.dispatch.GetNewPanelHeight(e.clientY) }}}
  //            >
  //        ooo
  //      </div>
  //   </div>
  //   )
  // }
}
