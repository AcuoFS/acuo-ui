import React from 'react'
import styles from './ContentBody.css'


export default class CSA extends React.Component {
  render(){
    const {propIsDisplay} = this.props

    return <div className={propIsDisplay ? styles.createContent : styles.hideForm}>
      CSA
    </div>
  }
}