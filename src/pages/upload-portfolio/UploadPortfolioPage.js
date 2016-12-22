import React from 'react'
import {
  NavigationBarContainer,
  MarginCallContainer
} from '../../containers'

import { UploadWidgetComponent } from '../../components'


class UploadPortfolioPage extends React.Component {
  render() {
    return (
      <div>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <UploadWidgetComponent/>
        <MarginCallContainer/>
      </div>
    )
  }
}

export { UploadPortfolioPage }