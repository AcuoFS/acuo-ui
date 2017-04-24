import React from 'react';
import styles from './tableUI.css'
import { connect } from 'react-redux'

const ColGroup = (props)=>{
 if(!props.style){throw "ColGroup style is not defined!"}
 console.log(props.style);
 let width =  `${(props.style.width || 100).toString()}%`
 // console.log(width)

 return(
  <div className={ props.style.className }
       ref={ (node)=>{node.style.width = width }}
       >
   {props.children}
  </div>
 )
}

const RowGroup = (props)=>{
 if(!props.style){throw "RowGroup style is not defined!"}
 console.log(props.style);
 let width =  `${(props.style.width || 100).toString()}%`
 let height =  `${(props.style.height || 100).toString()}%`
 // console.log(width)

 return(
  <div className={ props.style.className }
       ref={ (node)=>{node.style.width = width }}
       >
   {props.children}
  </div>
 )
}

/* DataCol
Similar to DataRow, it runs map cell component into a column.
DataCol should be draggable.

const DataCol = (props)=>{}
*/

const DataRow = (props)=>{
  if(!props.style){throw "props.style not defined"}
  let className = props.style.className;
  console.log(className);
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
         ref={ (node)=>{ node.style.height = height()
                         node.style.width = width  }}
         draggable={true}
         onDragStart={(node)=>{console.log("Drag Started")}} >

      { content.map( (content, idx)=>{ return <DataRowCell key={idx}
                                                           content={content}
                                                           siblings={siblings}/>} ) }
    </div>
   )
}

const DataRowCell = (props)=>{
  return(
   <div className={styles.DataRowCell}
         ref={ (node)=>{ node.style.width = `${(100 / props.siblings).toString()}%` } } >

     {props.content || "---No Content---"}
   </div> )
}

const Line = (props)=>{
 let className = props.style.className
 let height = `${(props.style.height || 0).toString()}px`
 // console.log(height);
 return(
  <div className={className}
       ref={ (node)=>{
        // console.log(node);
        // console.log(node.getBoundingClientRect());
        node.style.height = height} }
   ></div>
 )
}


const Table = {
  ColGroup,
  RowGroup,
  DataRow,
  Line
}


export default Table
