import React from 'react'
import { connect } from 'react-redux'
import styles from "./NavBar.css"

export default class NavBar extends React.Component{
  render(){
   return(
    <div className={styles.navbar}>
      {this.props.children}
    </div>
   )
  }
}
