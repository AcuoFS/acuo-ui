import React from 'react'
import styles from './Login.css'


export default class LoginComponent extends React.Component{
  constructor(props){
   super(props)
   this.state = { showPassword : false,
                      password : "" }
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
            <input type="text"/>
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
                   onChange={ (e)=>{this.setState({password: e.currentTarget.value})} }
              />
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
  }
}



// export default LoginComponent
