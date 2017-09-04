/**
 * Created by Rui on 16/8/17.
 */
import React from 'react'
// import { connect } from 'react-redux'
import {
  AnalyticsGraphContainer,
  NavigationBarContainer
} from './../../containers'
// import styles from './LoginPage.css'
import {hashHistory} from 'react-router'

class AnalyticsPage extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    if(localStorage.loginAt > Date.now()) {
      hashHistory.push('analytics') }
  }

  render(){
    return(
      <div>
        <NavigationBarContainer />
        <AnalyticsGraphContainer />
      </div>
    )
  }
}



// const AnalyticsPage = connect()(Analytics)

export { AnalyticsPage }
