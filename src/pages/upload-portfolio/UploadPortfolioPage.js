import React from 'react'
import {
  NavigationBarContainer
} from '../../containers'

import { UploadWidgetComponent } from '../../components'


class UploadPortfolioPage extends React.Component {
  render() {
    return (
      <div>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <UploadWidgetComponent/>
        <div>MARGIN CALL</div>
      </div>
    )
  }
}

export { UploadPortfolioPage }