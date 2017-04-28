import React from 'react';
import styles from './TableUI.css'
import { connect } from 'react-redux'

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

      { _.map(content, (content, idx)=>{ return <DataRowCell key={idx}
                                                           content={content}
                                                           siblings={siblings}/>} ) }
    </div>
   )
}

const DataRowCell = (props)=>{
  return(
   <div className={styles.DataRowCell}
         ref={ (node)=>{ if(node){node.style.width = `${(100 / props.siblings).toString()}%`} } } >

     {props.content || "---No Content---"}
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
