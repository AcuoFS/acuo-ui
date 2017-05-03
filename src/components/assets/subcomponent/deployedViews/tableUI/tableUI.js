import React from 'react';
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
  let className = props.style.className;
  let content = props.content || [" "]
  let siblings = content.length // Number of cells in row instance
  let width =  `${(props.style.width || 100).toString()}%`
  let cellWidth = props.cellWidth
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
         draggable={true}
         onDragStart={(node)=>{console.log("Drag Started")}}   >

      { _.map(content, (content, idx)=>{
       return <DataRowCell key={idx}
                           content={content}
                           siblings={siblings}
                           cellWidth={ cellWidth? cellWidth[idx] : null }  />} )}
    </div>
   )
}

const DataRowCell = (props)=>{
  let cellWidth = props.cellWidth
  // content.length > 40, Trim to the first 40 chrars, append '...', mouseOver displays full content
  // content.length < 40, Shows full content, text wraps on overflow

  let cellType = (props, styles)=>{
   if(props.content.length > 40){
    let text = props.content.substring(0,41) + " ..."
    return (<div className={styles.CellVisible} title={props.content}> {text || "---No Content---"} </div>)
   }
   else{ return <div className={styles.CellVisible}> {props.content || "---No Content---"} </div> }
  }

  return(
   <div className={styles.DataRowCell}
        ref={ (node)=>{ if(node){node.style.width = `${ cellWidth || (100 / props.siblings).toString()}%`} } } >
     { cellType(props, styles) }
   </div> )
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
