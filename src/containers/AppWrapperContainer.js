/**
 * Created by Rui on 13/7/17.
 */
import {connect} from 'react-redux'
import { AppWrapperComponent } from '../components'
import * as ACTIONS from '../actions/CommonActions'


const mapStateToProps = (state, ownProps) => ({
  noPrompt: state.CommonReducer.get('noPrompt'),
  ...ownProps
})

const mapDispatchToProps = dispatch => ({
  onMQEvent: (flag) => {
    dispatch(ACTIONS.updateScreensize(flag))
  }
})

const AppWrapperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapperComponent)

export default AppWrapperContainer