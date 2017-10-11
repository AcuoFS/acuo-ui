import { LoginComponent } from './../components'
import { connect } from 'react-redux'
import { doLogin } from './../actions/LoginActions'

const _default = false

const mapStateToProps = (state) => ({
  processingLogin: state.CommonReducer.get('processingLogin') || _default,
  wrongCredentials: state.CommonReducer.get('wrongCredentials')
})

const mapDispatchToProps = (dispatch) => ({
  onLogin: (user, pass) => dispatch(doLogin(user, pass)),
})

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

export default LoginContainer
