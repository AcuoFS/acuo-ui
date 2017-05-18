/**
 * Created by Rui on 17/5/17.
 */
import React from 'react'
import styles from './Login.css'

const LoginComponent = () => (
  <div className={styles.container}>
    <div className={styles.box}>
      <img className={styles.logo} src={'./images/login/login_logo.png'} alt=""/>
      <div className={styles.row}>
        <div className={styles.label}>
          Username
        </div>
        <div className={styles.input}>
          <input type="text"/>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          password
        </div>
        <div className={styles.input}>
          <input type="password"/>
        </div>
      </div>

      <div className={styles.buttonHolder}>
        <button>
          sign in
        </button>
      </div>
    </div>
  </div>
)

export default LoginComponent