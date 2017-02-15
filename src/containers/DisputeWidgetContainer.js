import {connect} from 'react-redux'
import {DisputeWidgetComponent} from './../components'
import * as DISPUTE_ACTION from '../actions/DisputeActions'


const mockData = [
  {
    role: 'S', legalEntity: 'Acuo SG', cptyOrg: 'Counterparty C',
    cptyEntity: 'Counterparty C', agreementName: 'Acuo SG vs Counterparty C',
    disputeId: '1234567890', daysOpened: '100', lastUpdated: '2016-11-23T00:00:00.000Z',
    status: 'Received'
  },
  {
    role: 'P', legalEntity: 'Acuo SG', cptyOrg: 'Counterparty C',
    cptyEntity: 'Counterparty C', agreementName: 'Acuo SG vs Counterparty C',
    disputeId: '1234567890', daysOpened: '100', lastUpdated: '2016-11-23T00:00:00.000Z',
    status: 'Sent'
  },
  {
    role: 'S', legalEntity: 'Acuo SG', cptyOrg: 'Counterparty A',
    cptyEntity: 'Counterparty A', agreementName: 'Acuo SG vs Counterparty A',
    disputeId: '1234567890', daysOpened: '100', lastUpdated: '2017-02-01T00:00:00.000Z',
    status: 'Received'
  },
  {
    role: 'S', legalEntity: 'Acuo SG', cptyOrg: 'Counterparty A',
    cptyEntity: 'Counterparty A', agreementName: 'Acuo SG vs Counterparty A',
    disputeId: '1234567890', daysOpened: '100', lastUpdated: '2016-08-20T00:00:00.000Z',
    status: 'Received'
  },
  {
    role: 'S', legalEntity: 'Acuo SG', cptyOrg: 'Counterparty A',
    cptyEntity: 'Counterparty A', agreementName: 'Acuo SG vs Counterparty A',
    disputeId: '1234567890', daysOpened: '100', lastUpdated: '2016-11-01T00:00:00.000Z',
    status: 'Received'
  },
  {
    role: 'P', legalEntity: 'Acuo SG', cptyOrg: 'Counterparty A',
    cptyEntity: 'Counterparty A', agreementName: 'Acuo SG vs Counterparty A',
    disputeId: '1234567890', daysOpened: '100', lastUpdated: '2017-02-20T00:00:00.000Z',
    status: 'Received'
  }
]

const mapStateToProps = state => ({
  disputeData: mockData,
  disputeFilter: state.DisputeReducer.get('disputeFilter')
})

const mapDispatchToProps = dispatch => ({
  onInitDisputeData: (disputeData) => {
    dispatch(DISPUTE_ACTION.initDispute(disputeData))
  },
  onUpdateDisputeFilter: (disputeFilter) => {
    dispatch(DISPUTE_ACTION.updateDisputeFilter(disputeFilter))
  }
})

const DisputeWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisputeWidgetComponent)

export default DisputeWidgetContainer