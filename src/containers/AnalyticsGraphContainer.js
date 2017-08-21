/**
 * Created by Rui on 16/8/17.
 */
import { AnalyticsGraphComponent } from './../components'
import { connect } from 'react-redux'
// import { doLogin } from './../actions/LoginActions'

const _default = false

const mapStateToProps = (state) => ({
  // processingLogin: state.CommonReducer.get('processingLogin') || _default
})

const mapDispatchToProps = (dispatch) => ({
  // onLogin: (user, pass) => dispatch(doLogin(user, pass))
})

const AnalyticsGraphContainer = connect(mapStateToProps, mapDispatchToProps)(AnalyticsGraphComponent)

export default AnalyticsGraphContainer
