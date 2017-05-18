import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { hashHistory, Router, Route } from 'react-router'
import createSagaMiddleware from 'redux-saga'

import root from './sagas'
import reducer from './reducers'
import styles from './static/global.css'
import * as PAGES from './pages'

const sagaMiddleware = createSagaMiddleware()

/**********
 * createStore takes up to 3 arguments. If the second argument is a function it assumes that your second argument is the store enhancer.
 * If it is an object or there are 3 arguments present it assumes that the argument is your initial state.
 *
 * Your middleware variable is a store enhancer and the chrome extension is also an enhancer:
 * applyMiddleware(sagaMiddleware)
 * window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 *
 * You have to compose both in a single function:
 * compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
 *********/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(root)

class App extends React.Component {
  constructor(props) {
    super(props)
    //http://localhost:3000/data
    //https://acuo.herokuapp.com/json
  }

  render() {
    return (
      <Provider store={store}>
        <div className={styles.globalStyles}>
          <Router history={hashHistory}>
            <Route path="/login" component={PAGES.LoginPage}/>
            <Route path="/" component={PAGES.DashboardContainer}/>
            <Route path="recon" component={PAGES.ReconcileContainer}/>
            <Route path="pledge" component={PAGES.PledgePage}/>
            <Route path="upload_portfolio" component={PAGES.UploadPortfolioPage}/>
            <Route path="deployed" component={PAGES.DeployedPageContainer}/>
            <Route path="agreements" component={PAGES.AgreementsPage}/>
            <Route path="disputes" component={PAGES.DisputePage}/>
          </Router>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render((
  <App />
), document.getElementById('app'))
