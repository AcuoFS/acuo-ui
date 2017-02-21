const mockSummary = {
  clientSummary: {
    clientName: 'Acuo SG',
    pendingNew: '12',
    pendingAssigned: '12',
    pendingRejected: '12',
    active: '12',
    changeRequest: '12',
    discontinuedReq: '12'
  },
  cptySummary: {
    clientName: 'Counterparty',
    pendingNew: '12',
    pendingAssigned: '12',
    pendingRejected: '12',
    active: '12',
    changeRequest: '12',
    discontinuedReq: '12',
    cptySummaryBreakdown: [
      {
        clientName: 'Counterparty Leg',
        pendingNew: '6',
        pendingAssigned: '6',
        pendingRejected: '6',
        active: '6',
        changeRequest: '6',
        discontinuedReq: '6'
      },
      {
        clientName: 'Counterparty Reg VM',
        pendingNew: '6',
        pendingAssigned: '6',
        pendingRejected: '6',
        active: '6',
        changeRequest: '6',
        discontinuedReq: '6'
      }
    ]
  }
}

export default mockSummary