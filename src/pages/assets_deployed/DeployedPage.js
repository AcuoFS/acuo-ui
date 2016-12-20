import React from 'react'
import {
  NavigationBarContainer,
  FlightContainer
} from '../../containers'


class DeployedPage extends React.Component {
  render() {
    return (
      <div>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <FlightContainer/>
        <div>Deployed</div>
      </div>
    )
  }
}

export {DeployedPage}