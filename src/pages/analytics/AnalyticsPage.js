/**
 * Created by Rui on 16/8/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import {
  AnalyticsGraphContainer,
  NavigationBarContainer
} from './../../containers'
import { sagaAnalyticsData } from '../../actions/AnalyticsActions'
import {hashHistory} from 'react-router'

class AnalyticsComp extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    if(localStorage.loginAt > Date.now()) {
      hashHistory.push('analytics') }
  }

  componentDidMount(){
    this.props.fetchAnalyticsData()
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

const mapStateToProps = state => {
  return { test: 0 }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAnalyticsData: () => dispatch(sagaAnalyticsData())
  }
}

const AnalyticsPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnalyticsComp)


export { AnalyticsPage }
