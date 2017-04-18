import React from 'react'
import {
  NavigationBarContainer,
  FlightContainer,
  AssetsContainer
} from '../../containers'


class DeployedPage extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <div>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <FlightContainer/>
        <AssetsContainer/>
      </div>
    )
  }
}

export {DeployedPage}
