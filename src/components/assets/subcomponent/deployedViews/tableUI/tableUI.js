import React from 'react';
import styles from './tableUI.css'
import { connect } from 'react-redux'

//ref={ (node)=>{console.log(node.parentNode.offsetWidth)}

const HeaderRow = (props)=>{
  let content = props.content
  let siblings = props.content.length
  let height = ()=>{
    if(props.style) {
      let rowSpan = props.style.rowSpan
      if(rowSpan){return `${((props.style.height || 24) * rowSpan).toString()}px`}
      else {return `${(props.style.height || 24).toString()}px`}
    }
    else { return "24px" }
  }

   return(
     <div className={styles.header}
          ref={ (node)=>{node.style.height = height() } }  >
       { content.map( (content, idx)=>{ return (<Cell key={idx}
                                                      content={content}
                                                      siblings={siblings} />) })}
     </div> )
}

const Row = (props)=>{
  // console.log(props);
  let content = props.content
  let siblings = content.length // Number of cells in row instance

  let height = ()=>{
    if(props.style) {
      let rowSpan = props.style.rowSpan
      if(rowSpan){return `${((props.style.height || 24) * rowSpan).toString()}px`}
      else {return `${(props.style.height || 24).toString()}px`}
    }
    else { return "24px" }
  }

  return(
    <div className={styles.row}
         ref={ (node)=>{ node.style.height = height() } }
         draggable={true}
         onDragStart={(node)=>{console.log("Drag Started")}} >

      { content.map( (content, idx)=>{ return <Cell key={idx}
                                                    content={content}
                                                    siblings={siblings}/>} ) }
    </div>
   )
}

const Cell = (props)=>{
  return(
   <span className={styles.cell}
         ref={ (node)=>{ node.style.width= `${(node.parentNode.clientWidth / props.siblings).toString()}px` } } >

     {props.content || "---No Content---"}
   </span> )
}

const Table = {
  HeaderRow,
  Row,
  Cell
}

export default Table
