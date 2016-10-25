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
})