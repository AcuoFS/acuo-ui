import React from 'react'
import { connect } from 'react-redux'
import styles from "./NavBar.css"

const NavBar = (props)=>{
   return(
    <div className={styles.navbar}>
      {props.children}
    </div>
   )
}

export default NavBar
