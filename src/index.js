import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {hashHistory, Router, Route} from 'react-router'
import reducer from './reducers'
import styles from './static/global.css'
import * as PAGES from './pages'

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
            <Route path="/" component={PAGES.DashboardContainer}/>
            <Route path="recon" component={PAGES.ReconcileContainer}/>
            <Route path="pledge" component={PAGES.PledgePage}/>
            <Route path="upload_portfolio" component={PAGES.UploadPortfolioPage}/>
            <Route path="deployed" component={PAGES.DeployedPage}/>
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
