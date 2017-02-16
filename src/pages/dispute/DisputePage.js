import React from 'react'
import {
  NavigationBarContainer,
  DisputeWidgetContainer
} from '../../containers'


class DisputePage extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
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