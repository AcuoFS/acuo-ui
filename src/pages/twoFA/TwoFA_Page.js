import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { TwoFA_Container } from './../../containers'
import styles from './TwoFA_Page.css'

class TwoFA extends React.Component{
  constructor(){
   super()
  }

  componentWillMount(){
    if(localStorage.loginAt > Date.now())  hashHistory.push('dashboard')
    else {
      if(!localStorage.authenticating){hashHistory.push('/') }
    }

  }

  render(){
   return(
    <div className={styles.page}>
      <TwoFA_Container />
    </div>
   )
  }
}

const TwoFA_Page = connect()(TwoFA)

export { TwoFA_Page }
