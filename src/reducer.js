import {Map, List, fromJS} from 'immutable'

export function initState(state, newJSON){
  return state.set('data', fromJS(newJSON)).set('display', fromJS(newJSON))
  //pushed into two separate nodes, data(for retention of persistent data), display(for rendering the UI)
}

export default function reducer(state = Map(), action) {
  switch(action.type){
    case 'INIT_STATE':
      return initState(state, action.state)
  }

  return state
}