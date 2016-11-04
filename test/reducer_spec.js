import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import reducer from '../src/reducer'

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
            "typeFilter": "ETD"
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
            "legalEntityFilter": "Acuo SG"
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
            "statusFilter": "expected"
          }
        }
      }
    ))
  })

  it('handles filter CPTY', () => {
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
                          "cpty": "ABC bank"
                        },
                        {
                          "cpty": "CDE bank"
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
                          "cpty": "ABC bank"
                        },
                        {
                          "cpty": "CDE bank"
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
      type: 'FILTER_STATE_CPTY',
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
                          "cpty": "ABC bank"
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
                          "cpty": "ABC bank"
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
                          "cpty": "ABC bank"
                        },
                        {
                          "cpty": "CDE bank"
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
            "cptyFilter": "ABC bank"
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
            "cptyOrgFilter": "Thailand"
          }
        }
      }
    ))
  })
})