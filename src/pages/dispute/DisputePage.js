import React from 'react'
import {
  NavigationBarContainer,
  DisputeWidgetContainer
} from '../../containers'
import { hashHistory } from 'react-router'



class DisputePage extends React.Component {

  componentWillMount(){
    if(localStorage.loginAt == undefined || localStorage.loginAt < Date.now()){ hashHistory.push('/') }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    if(localStorage.loginAt < Date.now()){ hashHistory.push("/") }

  }


  render() {
    return (
      <div>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <DisputeWidgetContainer/>
      </div>
    )
  }
}

export {DisputePage}
