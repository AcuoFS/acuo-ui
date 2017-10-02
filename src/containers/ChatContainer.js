/**
 * Created by Rui on 26/9/17.
 */
import React from 'react'
import {
  connect
} from 'react-redux'

import {
  ChatComponent
} from './../components'
import {
  toggleChatMinimise,
  toggleChatOpen
} from './../actions/CommonActions'

const mapStateToProps = (state) => ({
  opened: state.ChatReducer.get('opened'),
  minimised: state.ChatReducer.get('minimised')
})

const mapDispatchToProps = dispatch => ({
  onToggleOpen: () => dispatch(toggleChatOpen()),
  onToggleMinimise: () => dispatch(toggleChatMinimise())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent)
