/**
 * Created by Rui on 16/8/17.
 */
import { AnalyticsGraphComponent } from './../components'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  dataSet: {
    data: [
      {
        "id": 0,
        "clientAllegation": 978.85,
        "counterpartyAllegation": 697.96,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 1,
        "clientAllegation": 390.33,
        "counterpartyAllegation": 114.57,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 2,
        "clientAllegation": 517.72,
        "counterpartyAllegation": 552.3,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 3,
        "clientAllegation": 412.06,
        "counterpartyAllegation": 507.18,
        "disputed": 0,
        "disputeCode": []
      },
      {
        "id": 4,
        "clientAllegation": 425.32,
        "counterpartyAllegation": 102.65,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 5,
        "clientAllegation": 461.98,
        "counterpartyAllegation": 124.38,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 6,
        "clientAllegation": 211.79,
        "counterpartyAllegation": 716.68,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 7,
        "clientAllegation": 443.13,
        "counterpartyAllegation": 181.6,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 8,
        "clientAllegation": 111.97,
        "counterpartyAllegation": 897.65,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 9,
        "clientAllegation": 111.37,
        "counterpartyAllegation": 102.69,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 10,
        "clientAllegation": 638.3,
        "counterpartyAllegation": 673.94,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 11,
        "clientAllegation": 796.62,
        "counterpartyAllegation": 208.56,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 12,
        "clientAllegation": 397.38,
        "counterpartyAllegation": 570.13,
        "disputed": 0,
        "disputeCode": []
      },
      {
        "id": 13,
        "clientAllegation": 893.36,
        "counterpartyAllegation": 177.18,
        "disputed": 0,
        "disputeCode": []
      },
      {
        "id": 14,
        "clientAllegation": 194.03,
        "counterpartyAllegation": 546.49,
        "disputed": 0,
        "disputeCode": []
      },
      {
        "id": 15,
        "clientAllegation": 918.02,
        "counterpartyAllegation": 939.83,
        "disputed": 0,
        "disputeCode": []
      },
      {
        "id": 16,
        "clientAllegation": 493.85,
        "counterpartyAllegation": 833.99,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 17,
        "clientAllegation": 413.44,
        "counterpartyAllegation": 628.81,
        "disputed": 0,
        "disputeCode": []
      },
      {
        "id": 18,
        "clientAllegation": 178.55,
        "counterpartyAllegation": 576.63,
        "disputed": 1,
        "disputeCode": [
          9001,
          9002
        ]
      },
      {
        "id": 19,
        "clientAllegation": 286.67,
        "counterpartyAllegation": 206.85,
        "disputed": 0,
        "disputeCode": []
      }
    ]
  },
  xAxis: {
    key: 'counterpartyAllegation',
    label: 'Counterpart estimation'
  },
  yAxis: {
    key: 'clientAllegation',
    label: 'ACUO estimation'
  }
})

const mapDispatchToProps = (dispatch) => ({
  // onLogin: (user, pass) => dispatch(doLogin(user, pass))
})

const AnalyticsGraphContainer = connect(mapStateToProps, mapDispatchToProps)(AnalyticsGraphComponent)

export default AnalyticsGraphContainer
