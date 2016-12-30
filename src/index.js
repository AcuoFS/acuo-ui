import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {fromJS} from 'immutable'
import {Provider} from 'react-redux'
import { browserHistory, Router, Route } from 'react-router'

import reducer from './reducers'
import {initState} from './actions'
import styles from './static/global.css'
import {
  Dashboard,
  ReconcileContainer,
  PledgePageContainer,
  UploadPortfolioPage,
  DeployedPage
} from './pages'


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
                        <Route path="recon" component={ReconcileContainer} />
                        <Route path="pledge" component={PledgePageContainer} />
                        <Route path="upload_portfolio" component={UploadPortfolioPage} />
                        <Route path="deployed" component={DeployedPage} />
                    </Router>
                </div>
            </Provider>
        )
    }
}

ReactDOM.render((
    <App />
  ),document.getElementById('app'))
