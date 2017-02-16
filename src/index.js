import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {fromJS} from 'immutable'
import {Provider} from 'react-redux'
import {hashHistory, Router, Route} from 'react-router'
import reducer from './reducers'
import styles from './static/global.css'
import {
  DashboardContainer,
  ReconcileContainer,
  PledgePage,
  UploadPortfolioPage,
  DeployedPage,
  DisputePage
} from './pages'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

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
            <Route path="/" component={DashboardContainer}/>
            <Route path="recon" component={ReconcileContainer}/>
            <Route path="pledge" component={PledgePage}/>
            <Route path="upload_portfolio" component={UploadPortfolioPage}/>
            <Route path="deployed" component={DeployedPage}/>
            <Route path="disputes" component={DisputePage}/>
          </Router>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render((
  <App />
), document.getElementById('app'))
