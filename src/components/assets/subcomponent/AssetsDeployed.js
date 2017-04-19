import React from 'react';
import styles from './AssetsPanel.css'

export default class AssetsDeployedComponent extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log("Deployed Panel Frame Mounted!")
    console.log(this.props)
    // this.deployedFrame.style.height = this.props.ui.panelHeight
   }

  componentDidUpdate(){
    // console.log("Deployed Panel Frame Updated!");
    // console.log(this.props);
    // console.log("Updated panelHeight: " + this.props.ui);
    // this.deployedFrame.style.height = this.props.ui.panelHeight
   }


  render(){
    return(
     <div className={ styles.assetsPanelFrame }
          ref={ (node)=> this.deployedFrame = node}>
       <div  className={ styles.assetsPanelTitle} >
        <span  className={ styles.assetsPanelTitleText }> Deployed </span>
       </div>
       <div className={styles.panelResizeHandle}
            onClick={ (e)=>{ this.props.store.ResizeToggle(!this.props.ui.resizeHandleActive)} }
            onMouseDown={ (e)=>{ this.props.store.OnClickY(e.clientY) }}
            onMouseMove={ (e)=>{ if(this.props.ui.resizeHandleActive){
                                   this.props.store.newPanelHeight(e.clientY)
                                  }
                              }}   >
         ooo
       </div>
     </div>
    )
  }
}



// onMouseDown={ (e)=>{ console.log(e.clientY) }
// onMouseUp={ (e)=>{
//  console.log(e.target.getBoundingClientRect())
//  console.log(e.target.parentNode.style.height = "100px");
