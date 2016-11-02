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
})