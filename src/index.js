import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { hashHistory, Router, Route } from 'react-router'
import createSagaMiddleware from 'redux-saga'
import axios from 'axios'
import Notifications from 'react-notification-system-redux'

import root from './sagas'
import reducer from './reducers'
import styles from './static/global.css'
import * as PAGES from './pages'
import {
  NotificationContainer,
  AppWrapperContainer,
  ChatContainer
} from './containers'
import { updateScreensize, refreshAccessToken } from './actions/CommonActions'
import {
  FETCH_ACCESS_WITH_REFRESH
} from "./constants/APIcalls";

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


/***
 * INTERCEPTORS
 * REQ:
 * these take a req and injects an authorization header if it exists
 * RES:
 * these take a response and sets an auth token into the localStorage if the authorization header exists
 * they take a cookie and set it into the document object
 * if server responses with a 498(access token expiry), attempt to send the cookie along to refresh access token
 * if successful, resend the original request with the new access token
 * if not, that means login session has expired and force the user to log out
 */
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config)
  if(localStorage.getItem('__JWT_TOKEN__'))
    config.headers.authorization = localStorage.getItem('__JWT_TOKEN__')

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

axios.interceptors.response.use(function (response) {

    if(response.headers.authorization)
      window.localStorage.setItem('__JWT_TOKEN__', response.headers.authorization)

    if(response.headers['set-cookie'])
      document.cookie = response.headers['set-cookie']

    return response;
  // }
}, function (error) {
  // Do something with response error
  const { config, response: { status } } = error

  console.log(config)
  console.log(status)

  switch(error.response.status) {
    case 401:
      window.localStorage.clear()
      hashHistory.push('/')
      store.dispatch(Notifications.error({
        title: 'Warning',
        message: `Login session expired, please log in again`,
        position: 'tr',
        uid: 9999999999,
        autoDismiss: 0
      }))
      break;

    case 498:
      console.log('switch 498')
      // console.log(window.localStorage.getItem('isRefreshing'))

      if (!window.localStorage.refreshingPromise) {
        console.log('token not refreshing, refreshing token')
        const prom = axios.get(FETCH_ACCESS_WITH_REFRESH, { withCredentials: true }).then((response) => {
          console.log('new token')
          console.log(window.localStorage.getItem('__JWT_TOKEN__'))
          // config.headers['authorization'] = window.localStorage.getItem('__JWT_TOKEN__')
        }, () => {
          window.localStorage.clear()
          hashHistory.push('/')
          store.dispatch(Notifications.error({
            title: 'Warning',
            message: `Login session expired, please log in again`,
            position: 'tr',
            uid: 9999999999,
            autoDismiss: 0
          }))
        }).finally(() => {
          // mark that we're done refreshing the token, so we can start a new request if needed
          window.localStorage.removeItem('refreshingPromise')
        })

        window.localStorage.setItem('refreshingPromise', 'true')
        console.log('current token')
        console.log(window.localStorage.getItem('__JWT_TOKEN__'))

        console.log(window.localStorage.getItem('refreshingPromise'))

        return prom.then(res => {
          return new Promise((resolve, reject) => {
            config.headers['authorization'] = window.localStorage.getItem('__JWT_TOKEN__')
            return resolve(axios(config)).then(response => response)
          })
        })

      }else {
        const checkIfRefreshing = () => {
          if(window.localStorage.getItem('refreshingPromise')){
            setTimeout(checkIfRefreshing, 100)
          }else{
            return new Promise((resolve, reject) => {
              config.headers['authorization'] = window.localStorage.getItem('__JWT_TOKEN__')
              return resolve(axios(config)).then(response => response)
            })
          }
        }

        async function watcher(){
          return await checkIfRefreshing()
        }

        return watcher()

      }

      // if (!window.localStorage.refreshingPromise) {
      //   console.log('current token')
      //   console.log(window.localStorage.getItem('__JWT_TOKEN__'))
      //
      //   return axios.get(FETCH_ACCESS_WITH_REFRESH, { withCredentials: true }).then((response) => {
      //     return new Promise((resolve, reject) => {
      //       console.log('new token')
      //       console.log(window.localStorage.getItem('__JWT_TOKEN__'))
      //       config.headers['authorization'] = window.localStorage.getItem('__JWT_TOKEN__')
      //       window.localStorage.removeItem('refreshing')
      //       return resolve(axios(config)).then(response => response)
      //     });
      //   })
      // }


      break;
    default:
      return Promise.reject(error);

  }


  // if(error.response.status === 401){
  //   window.localStorage.clear()
  //   hashHistory.push('/')
  //   store.dispatch(Notifications.error({
  //     title: 'Warning',
  //     message: `Login session expired, please log in again`,
  //     position: 'tr',
  //     uid: 9999999999,
  //     autoDismiss: 0
  //   }))
  // } else {
  //   return Promise.reject(error);
  // }
})

class App extends React.Component {
  constructor(props) {
    super(props)
    //http://localhost:3000/data
    //https://acuo.herokuapp.com/json

    const mediaQuery = window.matchMedia('(min-width: 1200px)');

    if (mediaQuery.matches) {
      store.dispatch(updateScreensize(false));
    } else {
      store.dispatch(updateScreensize(true));
    }

    mediaQuery.addListener((mq) => {
      if (mq.matches) {
        store.dispatch(updateScreensize(false))
      } else {
        store.dispatch(updateScreensize(true))
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <div className={styles.globalStyles}>
          <AppWrapperContainer>
            <Router history={hashHistory}>
              <Route path="/" component={PAGES.LoginPage}/>
              <Route path="2fa" component={PAGES.TwoFA_Page}/>
              <Route path="dashboard" component={PAGES.DashboardContainer}/>
              <Route path="recon" component={PAGES.ReconcileContainer}/>
              <Route path="pledge" component={PAGES.PledgePage}/>
              <Route path="upload_portfolio" component={PAGES.UploadPortfolioPage}/>
              <Route path="deployed" component={PAGES.DeployedPageContainer}/>
              <Route path="agreements" component={PAGES.AgreementsPage}/>
              <Route path="disputes" component={PAGES.DisputePage}/>
              <Route path="analytics" component={PAGES.AnalyticsPage}/>
            </Router>
            <ChatContainer />
          </AppWrapperContainer>
          <NotificationContainer />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render((
  <App />
), document.getElementById('app'))

//Check if localStorage is available
// function storageAvailable(type) {
//     try {
//         var storage = window[type],
//             x = '__storage_test__';
//         storage.setItem(x, x);
//         storage.removeItem(x);
//         return true;
//     }
//     catch(e) {
//         return e instanceof DOMException && (
//             // everything except Firefox
//             e.code === 22 ||
//             // Firefox
//             e.code === 1014 ||
//             // test name field too, because code might not be present
//             // everything except Firefox
//             e.name === 'QuotaExceededError' ||
//             // Firefox
//             e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
//             // acknowledge QuotaExceededError only if there's something already stored
//             storage.length !== 0;
//     }
// }
// storageAvailable('localStorage') ? console.log(`#localStorage: true`) : console.error("#SystemCheck: No Local Storage Detected");
