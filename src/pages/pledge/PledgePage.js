import React from 'react'
import stylesG from '../../static/global.css'
import {
  NavigationBarContainer,
  PledgeContainer
} from '../../containers'
import { hashHistory } from 'react-router'


class PledgePage extends React.Component{
  componentDidMount () {
    window.scrollTo(0, 0)
    if(localStorage.loginAt < Date.now()){ hashHistory.push("/") }
  }

  render(){
    return (
      <div className={stylesG.globalStyles}>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <PledgeContainer />
      </div>
    )
  }
}


export { PledgePage }
