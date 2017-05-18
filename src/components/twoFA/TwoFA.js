import React from 'react';
import styles from './TwoFA.css'
import _ from 'lodash';

export default class TwoFA_Component extends React.Component{
  constructor(props){
   super(props)
   this.state = { showPassword : false,
                      password : ""     }
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
          <div className={styles.input}>
            <input type={ (this.state.showPassword ? "text" : "password") }
                   onChange={ (e)=>{this.setState({password: e.currentTarget.value})} }
                   value={this.state.password}
              />
          </div>
        </div>

        <div className={styles.buttonHolder}>
          <button>
            CONTINUE
          </button>
          <div onClick={ ()=>{console.log("Going Back")} } >GO BACK</div>
        </div>


      </div>
    </div>
   )
  }
}
