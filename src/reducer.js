import {Map, List, fromJS} from 'immutable'

export function initState(state, newJSON){
  return state.set('data', fromJS(newJSON)).set('display', fromJS(newJSON))
  //pushed into two separate nodes, data(for retention of persistent data), display(for rendering the UI)
}

function applyFilter(derivatives, type){
    return derivatives.filter((x) => {
        return x.get('type') == type
    })
}

export function updateState(state, type){console.log('update', type)
    if(type=="All"){
        return state.set('display',state.get('data'))
    }else
        return state.setIn(['inputs', 'filters', 'typeFilter'], type).setIn(['display', 'derivatives'], applyFilter(state.getIn(['data', 'derivatives']), type))
}



export default function reducer(state = Map(), action) {

    switch(action.type){
        case 'INIT_STATE':
            return initState(state, action.state)

        case 'FILTER_STATE':
            return updateState(state, action.filter)
    }

  return state
}