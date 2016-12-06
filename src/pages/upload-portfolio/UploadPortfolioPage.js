import React from 'react'
import {
  NavigationBarContainer
} from '../../containers'


class UploadPortfolioPage extends React.Component {
  render() {
    return (
      <div>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <div>UPLOAD</div>
        <div>MARGIN CALL</div>
      </div>
    )
  }
}

export { UploadPortfolioPage }