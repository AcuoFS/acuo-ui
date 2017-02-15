/**
 * This is just interim as endpoint is not ready
 * @type {[*]}
 */
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

export default mockData