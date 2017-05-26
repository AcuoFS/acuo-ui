import React from 'react';
import styles from './TwoFA.css'
import _ from 'lodash';
import { hashHistory } from 'react-router'


export default class TwoFA_Component extends React.Component{
  constructor(props){
   super(props)
   this.state = { showPassword : false,
                securekeyError : "",
                     securekey : "123456",
                inputSecurekey : "123456"    }
  }

  componentWillUnmount(){
   delete localStorage.authenticating
  }

  render(){
   return(
    <div className={styles.container}>
      <div className={styles.box}>
        <img className={styles.logo} src={'./images/login/login_logo.png'} alt=""/>


        <div className={styles.row}>
          <div className={styles.label}>
            2FA SECURITY CODE
            <span onClick={ ()=>{ this.setState( (prevState, props)=>{ return {showPassword: !prevState.showPassword}})}} >
              { (this.state.showPassword ? "hide" : "show") }
            </span>
          </div>
          <div className={ styles.key_error }>
            {this.state.securekeyError}
          </div>
          <div className={styles.input}>
            <input type={ (this.state.showPassword ? "text" : "password") }
                   onChange={ (e)=>{this.setState({inputSecurekey: e.currentTarget.value})} }
                   value={this.state.inputSecurekey}
              />
          </div>
        </div>

        <div className={styles.buttonHolder}>
          <button onClick={ ()=>{
            this.setState( {securekeyError: ""} )
            if( this.state.inputSecurekey != this.state.securekey ) {this.setState({securekeyError:"Invalid Key!"})}
            else{
             localStorage.loginAt = Date.now() + 86400000
             hashHistory.push("dashboard")
            }
           }} >
            CONTINUE
          </button>
          <div onClick={ ()=>{hashHistory.push("/")} } >GO BACK</div>
        </div>


      </div>
    </div>
   )
  }
}
