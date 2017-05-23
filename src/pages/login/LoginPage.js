import React from 'react'
import { connect } from 'react-redux'
import { LoginContainer } from './../../containers'
import styles from './LoginPage.css'
import {hashHistory} from 'react-router'

class Login extends React.Component{
  constructor(){
   super()
  }

  componentWillMount(){
    if(localStorage.loginAt > Date.now()) { hashHistory.push('dashboard') }
  }

  render(){
    return(
     <div className={styles.page}>
      <LoginContainer />
     </div>
    )
  }
}



const LoginPage = connect()(Login)

export { LoginPage }
