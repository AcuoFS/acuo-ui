import React from 'react'
import styles from './Login.css'
import {hashHistory} from 'react-router'

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      username: '',
      password: ""
    }
  }

  componentDidMount() {
    this.refs.focus.focus()
  }

  render() {
    const { processingLogin, wrongCredentials, onLogin } = this.props
    return (
      <form className={styles.container}
            onSubmit={ (e) => {
              e.preventDefault()
              this.setState({passwordError: ""})
              onLogin(this.state.username, this.state.password)
            }}>
        <div className={styles.box}>
          <img className={styles.logo} src={'./images/login/login_logo.png'} alt=""/>
          <div className={styles.row}>
            <div className={styles.label}>
              Username
            </div>
            <div className={styles.input}>
              <input type="text"
                     value={this.state.username}
                     onChange={(e) => {
                       this.setState({username: e.currentTarget.value})
                     }}
                     ref="focus"/>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>
              password
              <span onClick={() => {
                this.setState({showPassword: !this.state.showPassword})
              }}>
               {(this.state.showPassword ? "hide" : "show")}
              </span>
            </div>
            <div className={styles.input}>
              <input type={(this.state.showPassword ? "text" : "password")}
                     value={this.state.password}
                     onChange={ (e) => {
                       this.setState({password: e.currentTarget.value})
                     } }
              />
            </div>
            {wrongCredentials &&
              <div className={ styles.pw_error }>
                Login failed, please check your credentials
              </div>}
          </div>

          <div className={styles.buttonHolder}>
            <button className={(processingLogin ? styles.disabled : '')}
                    type="submit">
              sign in
            </button>
          </div>
        </div>
      </form>
    )
  }
}

// export default LoginComponent
