import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {fromJS} from 'immutable'

import reducer from './reducer'
import {initState} from './action_creators'

import styles from './global.css'

import HelloWorld from './components/sample-component/sample-component'
import Table from './components/table/table-component'
import Nav from './components/navbar/navbar'

const store = createStore(reducer)

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
      <div className={styles.globalStyles}>
          <Nav />
          <HelloWorld />
          <Table title={"Margin"}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
