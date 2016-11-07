import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {fromJS} from 'immutable'
import {Provider} from 'react-redux'
import { browserHistory, Router, Route, Link } from 'react-router'
import reducer from './reducer'
import {initState} from './action_creators'

import styles from './global.css'

import Dashboard from './components/dashboard/dashboard'
import Reconcile from './components/reconcile/reconcile'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends React.Component{
    constructor(props){
        super(props)
        //http://localhost:3000/data
        //https://acuo.herokuapp.com/json
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
                    <Router history={browserHistory}>
                        <Route path="/" component={Dashboard} />
                        <Route path="recon" component={Reconcile} />
                    </Router>
                </div>
            </Provider>
        )
    }
}

ReactDOM.render((
    <App />
  ),document.getElementById('app'))
