import React from 'react';
import styles from './tableUI.css'
import { connect } from 'react-redux'

class Header extends React.Component{
 render(){
  return(
   <div>
    <div className={styles.header}> Header </div>
   </div>
  )
 }
}

const Table = {
  Header
}

export default Table
