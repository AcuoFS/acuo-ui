import React from 'react'
import { connect } from 'react-redux'
import { LoginContainer } from './../../containers'
import styles from './LoginPage.css'

const Login = () => (
  <div className={styles.page}>
    <LoginContainer />
  </div>
)

const LoginPage = connect()(Login)

export { LoginPage }