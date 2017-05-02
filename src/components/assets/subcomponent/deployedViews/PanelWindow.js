import React from 'react'
import styles from './PanelWindow.css'

const PanelWindow = (props)=>{
  return(
   <div className={styles.PanelWindow}>
     {props.children}
   </div>
  )
}

export default PanelWindow
