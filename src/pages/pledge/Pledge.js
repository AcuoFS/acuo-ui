import React from 'react'
import stylesG from '../../static/global.css'
import {
  NavigationBarContainer,
  PledgeContainer
} from '../../containers'


class Pledge extends React.Component{

  render(){
    return (
      <div className={stylesG.globalStyles}>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <PledgeContainer />
      </div>
    )
  }
}

export { Pledge }