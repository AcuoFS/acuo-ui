import React from 'react'
import {
  NavigationBarContainer,
  MarginCallContainer,
  UploadWidgetContainer
} from '../../containers'

class UploadPortfolioPage extends React.Component {

  /** DEMO PURPOSES ONLY **/
  constructor(props){
    super(props)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  /** END **/
  render() {
    return (
      <div>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <UploadWidgetContainer />
        <MarginCallContainer />
      </div>
    )
  }
}

export { UploadPortfolioPage }