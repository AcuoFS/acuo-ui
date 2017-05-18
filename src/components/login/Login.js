import React from 'react'
import styles from './Login.css'
import { hashHistory } from 'react-router'


export default class LoginComponent extends React.Component{
  constructor(props){
   super(props)
   this.state = { showPassword : false,
                      password : "PA$$word",
                      username : 'john_doe' }
  }

  setPassword(value){
    this.setState({password: e.currentTarget.value})
  }

  render(){
   localStorage.clear()


   return(
    <div className={styles.container}>
      <div className={styles.box}>
        <img className={styles.logo} src={'./images/login/login_logo.png'} alt=""/>
        <div className={styles.row}>
          <div className={styles.label}>
            Username
          </div>
          <div className={styles.input}>
            <input type="text"
                   value={this.state.username}
                   onChange={ (e)=>{this.setState({password: e.currentTarget.value})} }  />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>
            password
            <span onClick={ ()=>{ this.setState( {showPassword: !this.state.showPassword} ) } } >
             {(this.state.showPassword? "hide" : "show")}
            </span>
          </div>
          <div className={styles.input}>
            <input type={(this.state.showPassword? "text" : "password")}
                   value={this.state.password}
                   onChange={ (e)=>{this.setState({password: e.currentTarget.value})} }
              />
          </div>
        </div>

        <div className={styles.buttonHolder}>
          <button onClick={ ()=>{ hashHistory.push("/2fa") } } >
            sign in
          </button>
        </div>
      </div>
    </div>
   )
  }
}



// export default LoginComponent
