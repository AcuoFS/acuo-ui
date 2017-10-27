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
  onToggleMinimise: () => dispatch(toggleChatMinimise()),
  getStreamList: () => {

    fetch('https://develop-api.symphony.com:8444/sessionauth/v1/authenticate', {
      method: 'POST',
      headers: {'cache-control': 'no-cache'}
    }).then(response => {
      console.log(response)
    })

    // fetch('https://develop.symphony.com/pod/v1/streams/list', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     "skip": 0,
    //     "limit": 50,
    //     "streamTypes": [
    //       {"type": "IM"},
    //       {"type": "MIM"},
    //       {"type": "ROOM"},
    //       {"type": "POST"}
    //     ],
    //     "includeInactiveStreams": true
    //   }),
    //   headers: {'content-type': 'application/json'},
    //
    // }).then(response => {
    //   console.log(response)
    //   // alert('send success :' + JSON.stringify(idArr))
    //   // return response.json()
    // })
    //   .then(obj => {
    //   return 1
    // }).catch(error => {
    //   console.log('Error: ' + error)
    // })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent)
