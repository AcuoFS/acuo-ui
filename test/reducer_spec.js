import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import reducer from '../src/reducers/reducer'

describe('reducer', () => {
  it('handles initState', () => {
    const initialState = Map()

    const action = {type: 'INIT_STATE', 'state': {'derivatives': [{
        'type': 'ETD'}, {'type': 'OTC'}]}}

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      'data': {
        'derivatives': [
          {
            'type': 'ETD'
          },
          {
            'type': 'OTC'
          }
        ]
      },
      'display': {
        'derivatives': [
          {
            'type': 'ETD'
          },
          {
            'type': 'OTC'
          }
        ]
      }
    }))
  })

  it('handles filter by derivative type', () => {
    const initialState = fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected"
                }
              ]
            },
            {
              "type": "OTC_bilateral",
              "marginStatus": [
                {
                  "status": "expected"
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected"
                }
              ]
            },
            {
              "type": "OTC_bilateral",
              "marginStatus": [
                {
                  "status": "expected"
                }
              ]
            }
          ]
        }

      }
    )

    const action = {
      type: 'FILTER_STATE_DERIV',
      filter: 'ETD'
    }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected"
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected"
                }
              ]
            },
            {
              "type": "OTC_bilateral",
              "marginStatus": [
                {
                  "status": "expected"
                }
              ]
            }
          ]
        },
        "inputs": {
          "filters" :{
            "typeFilter": {
              "type": "FILTER_STATE_DERIV",
              "filter": "ETD"
            }
          }
        }
      }
    ))
  })

  it('handles filter legal entity', () => {
    const initialState = fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "legalEntity": "Acuo SG"
                        },
                        {
                          "legalEntity": "Acuo ID"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "legalEntity": "Acuo SG"
                        },
                        {
                          "legalEntity": "Acuo ID"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }

      }
    )

    const action = {
      type: 'FILTER_STATE_LEGAL',
      filter: 'Acuo SG'
    }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "legalEntity": "Acuo SG"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "legalEntity": "Acuo SG"
                        },
                        {
                          "legalEntity": "Acuo ID"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "inputs": {
          "filters" :{
            "legalEntityFilter": {
              type: 'FILTER_STATE_LEGAL',
              filter: 'Acuo SG'
            }
          }
        }
      }
    ))
  })

  it('handles filter status', () => {
    const initialState = fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "legalEntity": "Acuo SG"
                        },
                        {
                          "legalEntity": "Acuo ID"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "legalEntity": "Acuo SG"
                        },
                        {
                          "legalEntity": "Acuo ID"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "legalEntity": "Acuo SG"
                        },
                        {
                          "legalEntity": "Acuo ID"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "legalEntity": "Acuo SG"
                        },
                        {
                          "legalEntity": "Acuo ID"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }

      }
    )

    const action = {
      type: 'FILTER_STATE_STATUS',
      filter: 'expected'
    }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "legalEntity": "Acuo SG"
                        },
                        {
                          "legalEntity": "Acuo ID"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "legalEntity": "Acuo SG"
                        },
                        {
                          "legalEntity": "Acuo ID"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "legalEntity": "Acuo SG"
                        },
                        {
                          "legalEntity": "Acuo ID"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "inputs": {
          "filters" :{
            "statusFilter": {
              type: 'FILTER_STATE_STATUS',
              filter: 'expected'
            }
          }
        }
      }
    ))
  })

  it('handles filter cpty entity', () => {
    const initialState = fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cpty": "ABC bank"
                        },
                        {
                          "cpty": "CDE bank"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyEntity": "ABC bank"
                        },
                        {
                          "cptyEntity": "CDE bank"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyEntity": "ABC bank"
                        },
                        {
                          "cptyEntity": "CDE bank"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyEntity": "ABC bank"
                        },
                        {
                          "cptyEntity": "CDE bank"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }

      }
    )

    const action = {
      type: 'FILTER_STATE_CPTYENTITY',
      filter: 'ABC bank'
    }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyEntity": "ABC bank"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyEntity": "ABC bank"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyEntity": "ABC bank"
                        },
                        {
                          "cptyEntity": "CDE bank"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyEntity": "ABC bank"
                        },
                        {
                          "cptyEntity": "CDE bank"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "inputs": {
          "filters" :{
            "cptyEntityFilter": {
              type: 'FILTER_STATE_CPTYENTITY',
              filter: 'ABC bank'
            }
          }
        }
      }
    ))
  })

  it('handles filter cpty org', () => {
    const initialState = fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Thailand"
                        },
                        {
                          "cptyOrg": "Singapore"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Singapore"
                        },
                        {
                          "cptyOrg": "Singapore"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Thailand"
                        },
                        {
                          "cptyOrg": "Singapore"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Singapore"
                        },
                        {
                          "cptyOrg": "Singapore"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }

      }
    )

    const action = {
      type: 'FILTER_STATE_CPTYORG',
      filter: 'Thailand'
    }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Thailand"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Thailand"
                        },
                        {
                          "cptyOrg": "Singapore"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Singapore"
                        },
                        {
                          "cptyOrg": "Singapore"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "inputs": {
          "filters" :{
            "cptyOrgFilter": {
              type: 'FILTER_STATE_CPTYORG',
              filter: 'Thailand'
            }
          }
        }
      }
    ))
  })

  it('handles multiple filters at once', () => {
    const initialState = fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Thailand"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Thailand"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Thailand"
                        },
                        {
                          "cptyOrg": "Singapore"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Thailand"
                        },
                        {
                          "cptyOrg": "Singapore"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "inputs": {
          "filters" :{
            "cptyOrgFilter": {
              type: 'FILTER_STATE_CPTYORG',
              filter: 'Thailand'
            }
          }
        }
      }
    )

    const action = {
      type: 'FILTER_STATE_STATUS',
      filter: 'pledge'
    }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS(
      {
        "display": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Thailand"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "data": {
          "derivatives": [
            {
              "type": "ETD",
              "marginStatus": [
                {
                  "status": "expected",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Thailand"
                        },
                        {
                          "cptyOrg": "Singapore"
                        }
                      ]
                    }
                  ]
                },
                {
                  "status": "pledge",
                  "timeFrames": [
                    {
                      "actionsList": [
                        {
                          "cptyOrg": "Thailand"
                        },
                        {
                          "cptyOrg": "Singapore"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        "inputs": {
          "filters" :{
            "cptyOrgFilter": {
              type: 'FILTER_STATE_CPTYORG',
              filter: 'Thailand'
            },
            "statusFilter": {
              type: 'FILTER_STATE_STATUS',
              filter: 'pledge'
            }
          }
        }
      }
    ))

  })

})