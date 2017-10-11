import {connect} from 'react-redux'
import Dispute from '../components/margin-agreement/sub-components/Dispute'
// import {reconInitState} from '../actions'
// import { sagaNavbarAlerts } from './../actions/CommonActions'
// import {RECON_URL, SEND_RECON_DISPUTE_URL} from '../constants/APIcalls'
import _ from 'lodash'
import { reconDispute } from './../actions'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  sendDisputeToBack: (disputeObjToSend) => {
    // console.log('here')
    disputeObjToSend.reasonCodes = _.map(disputeObjToSend.reasonCodes, codeObj => codeObj.value)
    dispatch(reconDispute(disputeObjToSend))
    // console.log(disputeObjToSend)
    //console.log('disputeObjToSend: ' + JSON.stringify(disputeObjToSend))

    // fetch(SEND_RECON_DISPUTE_URL, {
    //   method: 'POST',
    //   headers: new Headers({'Content-Type': 'application/json'}),
    //   body: JSON.stringify(disputeObjToSend)
    // }).then(response => {
    //   //console.log(response)
    //   if (response.status === 200 || response.status === 201) {
    //     //alert('Sent dispute to backend successfully!')
    //   } else {
    //     //alert('Unknown status code received: ' + response.status)
    //   }
    //
    //   fetch(RECON_URL).then((response) => {
    //     return response.json()
    //   }).then((obj) => {
    //     const {items} = obj
    //     dispatch(reconInitState(items))
    //   })
    //   dispatch(sagaNavbarAlerts())
    // }).catch(error => {
    //   console.log('Error: ' + error)
    // })

  }
})

const ReconDisputeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dispute)

export default ReconDisputeContainer