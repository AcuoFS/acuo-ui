import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {fromJS} from 'immutable'
import {Provider} from 'react-redux'

import reducer from './reducer'
import {initState} from './action_creators'

import styles from './global.css'

import HelloWorld from './components/dashboard/sample-component/sample-component'
import {TableContainer} from './components/dashboard/table/table-component'
import Nav from './components/dashboard/navbar/navbar'
import {FilterContainer} from './components/dashboard/filters/filter'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends React.Component{
    constructor(props){
        super(props)

        fetch('https://acuo.herokuapp.com/json').then((response) => {
            return response.json()
        }).then((obj) => {
            store.dispatch(initState(fromJS(obj)))
        })
    }

    render(){
        return (
            <Provider store={store}>
                <div className={styles.globalStyles}>
                    <Nav />
                    <FilterContainer  />
                    <HelloWorld />
                    <TableContainer />
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
