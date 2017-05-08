import React from 'react'
import { connect } from 'react-redux'
import styles from './PanelWindow.css'

export default class PanelWindow extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
   return(
    <div className={styles.PanelWindow}>
      {this.props.children}
    </div>
   )
  }
}
