import React from 'react';
import PropTypes from 'prop-types';
import styles from './tableUI.css'

const ColGroup = (props)=>{
 if(!props.style){throw "ColGroup's style is not passed in through props!"}
 let width =  `${(props.style.width || 100).toString()}%`

 return(
  <div className={ props.style.className }
       ref={ (node)=>{ if(node){node.style.width = width} }}  >
   {props.children}
  </div>
 )
}

const RowGroup = (props)=>{
 if(!props.style){throw "RowGroup's style is not passed in through props!"}
 let width =  `${(props.style.width || 100).toString()}%`
 let height =  `${(props.style.height || 100).toString()}%`

 return(
  <div className={ props.style.className }
       ref={ (node)=>{ if(node){node.style.width = width} }}  >
   {props.children}
  </div>
 )
}

const DataRow = (props)=>{
  if(!props.style){throw "DataRow's style not passed in through props"}
  let { actions , state,  assetID , IsDeployedPanelExpandedSideways, cellWidth} = props;
  let showPopup = ( state? state.ui.HomePanel_ShowPopup : false)
  let className = props.style.className;
  let contentType = props.contentType || null; if (!contentType) console.warn("Unspecified contentType")
  let content = props.content || [""]
  let Home_PledgedContent; if(state) Home_PledgedContent = state.data.Home_PledgedContent;
  let siblings = content.length
  let width =  `${(props.style.width || 100).toString()}%`
  let height = ()=>{
    if(props.style) {
      let rowSpan = props.style.rowSpan
      if(rowSpan){return `${((props.style.height || 24) * rowSpan).toString()}px`}
      else {return `${(props.style.height || 24).toString()}px`}
    }
    else { return "24px" }
  }

  return(
    <div className={className}
         ref={ (node)=>{ if(node){node.style.height = height(); node.style.width = width}  }}

         draggable={ ((contentType==="deployed_rowData" || contentType==="home_Row") ? true : false) }

         onDragStart={ (ev)=>{
          let payload = JSON.stringify(_.find( Home_PledgedContent, (o)=>{ if(o.id==assetID) return true } ))
          ev.dataTransfer.setData((contentType==="deployed_rowData" ? 'asset/deployed' :'asset/home'), payload)
          ev.dataTransfer.effectAllowed="move"
          if(!assetID) actions.Popup_DraggingHomeAssetID(assetID)
         }}

         onDragOver={ (ev)=>{
          ev.dataTransfer.dragEffect="none"
          if(contentType==="deployed_rowData"){ if(ev.dataTransfer.types == "asset/home") ev.preventDefault() }
          else{ if(contentType==="home_Row"){ if(ev.dataTransfer.types == "asset/deployed") ev.preventDefault() } }

         }}

         onDrop={ (ev)=>{
          let getDropLoad = (ev, contentType)=>{
           if (contentType === "deployed_rowData") {return ev.dataTransfer.getData('asset/home')}
           if (contentType === "home_Row") {return ev.dataTransfer.getData('asset/deployed')}
          }
          actions.DeployedPanel_ShowPopup(!showPopup)
          let payload = getDropLoad(ev, contentType)
          actions.Popup_DroppedHomeAssetInfo(payload)
         }}

         onDragEnd={ ()=>{ actions.Popup_DraggingHomeAssetID(null) }}
         >

      { _.map(content, (content, idx)=>{
       return <DataRowCell key={idx}
                           id={idx}
                           contentType={contentType}
                           content={content}
                           siblings={siblings}
                           IsDeployedPanelExpandedSideways={IsDeployedPanelExpandedSideways}
                           cellWidth={ cellWidth? cellWidth[idx] : null }  />} )}
    </div>
   )
}

DataRow.propTypes = {
 style: PropTypes.object,
 contentType: PropTypes.string,
 cellWidth: PropTypes.arrayOf(PropTypes.number)
}

const DataRowCell = (props)=>{

  let contentType = props.contentType || null;
  let cellWidth = props.cellWidth
  let IsDeployedPanelSideExpanded = props.IsDeployedPanelExpandedSideways
  let cellType = (props, styles, IsDeployedPanelExpandedSideways)=>{
   if(contentType==="deployed_categoryHeader" || contentType==="deployed_CategoryContent" || contentType==="deployed_dataHeader" || contentType==="deployed_rowData" || contentType==="deployed_PledgeContent" || contentType==="deployed_ExcessContent" ){
       if(contentType==="deployed_CategoryContent"){
           if(props.content.length > 40) <div className={styles.CellVisible} title={props.content}> { props.content.substring(0,41) + "..." || "---No Content---"} </div>
           else return <div className={styles.CellVisible} title={props.content}> {props.content || "---No Content---"} </div>
       }
       else{
           if(props.id===0 && props.content.length > 15 && !IsDeployedPanelSideExpanded) return <div className={styles.CellVisible} title={props.content}> {  (props.content.substring(0,16) + "...") || "---No Content---"} </div>
           else { if(props.content.length > 15) return <div className={styles.CellVisible} title={props.content}> { props.content.substring(0,16) + "..." || "---No Content---"} </div>
                  else return <div className={styles.CellVisible} title={props.content}> {props.content || "---No Content---"} </div> }
       }
   }
   else {
      if(props.content.length > 12){
        if(props.id===3){
         return <div className={styles.CellVisible} title={props.content}> { props.content || "---No Content---"} </div>
        }
        else{
         console.assert( props.content.length > 12, "Cell content: " , props.content , " is below " , props.content.length , " characters!")
         return <div className={styles.CellVisible} title={props.content}> { props.content.substring(0,10) + "..." || "---No Content---"} </div>
        }
      }
      else{
        console.assert( props.content.length <= 12, "Cell content: " , props.content , " exceeds " , props.content.length, " characters" )
        return <div className={styles.CellVisible} title={props.content}> {props.content || "---No Content---"} </div>
      }
   }

  }

  return(
   <div className={styles.DataRowCell}
        ref={ (node)=>{ if(node){node.style.width = `${ cellWidth || (100 / props.siblings).toString()}%`} } } >
     { cellType(props, styles) }
   </div> )
}

DataRowCell.propTypes = {
 contentType: PropTypes.string,
 cellWidth: PropTypes.number,
 IsDeployedPanelExpandedSideways: PropTypes.bool
}


const Table = {
  ColGroup,
  RowGroup,
  DataRow,
}

export default Table


//-----Possible Refactoring-----
/*
@ DataRowCell
  Allow user to pass styling DataRowCell styling through DataRow's props.
*/

//-----Further Development-----
/*
+ DataCol
+ DataColCell
   Similar to DataRow, it runs map cell component into a column.
   DataCol should be draggable.

   const DataCol = (props)=>{return()}
   const DataColCell = (props)=>{return()}
*/
/*
+ Cell
   Unlike DataRowCell and DataColCell, the cell component should allow user to
   implement each cell independently.

   const Cell = (props)=>{return()}
*/
