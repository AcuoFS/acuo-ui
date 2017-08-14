import React from 'react'
import styles from './Login.css'
import { hashHistory } from 'react-router'


export default class LoginComponent extends React.Component{
  constructor(props){
   super(props)
   this.state = { showPassword : false,
                 passwordError : "",
                      password : "@Password1",
                      username : 'user@acuocpty.com',
                 inputPassword : "@Password1" }
  }

  setPassword(value){
    this.setState({password: e.currentTarget.value})
  }

  render(){
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
                     onChange={ (e)=>{this.setState({username: e.currentTarget.value})} }  />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>
              password
              <span onClick={ ()=>{ this.setState( {showPassword: !this.state.showPassword} ) } } >
               {(this.state.showPassword? "hide" : "show")}
              </span>
            </div>
            <div className={ styles.pw_error }>
              {this.state.passwordError}
            </div>
            <div className={styles.input}>
              <input type={(this.state.showPassword? "text" : "password")}
                     value={this.state.inputPassword}
                     onChange={ (e)=>{this.setState({inputPassword: e.currentTarget.value})} }
                />
            </div>
          </div>

          <div className={styles.buttonHolder}>
            <button className={(this.props.processingLogin ? styles.disabled : '')} onClick={ ()=>{
             this.setState( {passwordError: ""} )
             {/*if( this.state.inputPassword.length < 8 ) {*/}
               {/*this.setState( {passwordError: " Password must be a minimum of 8 characters "} ) }*/}
             {/*else {*/}
              {/*if( !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(this.state.inputPassword)) ) {*/}
                {/*this.setState( {passwordError: "Password must a mixed-case alphanumeric"} ) }*/}
              {/*else{*/}
               {/*if( this.state.inputPassword!=this.state.password  ) {*/}
                 {/*this.setState( { passwordError: "Invalid Password!" } ) }*/}
               {/*else {*/}
                //localStorage.authenticating = true
                //hashHistory.push("/2fa")
                 this.props.onLogin(this.state.username, this.state.password)
               }
              }>
              sign in
            </button>
          </div>
        </div>
      </div>
   )
  }
}



// export default LoginComponent
