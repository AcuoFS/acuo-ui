import React from 'react'
import {
  NavigationBarContainer,
  MarginCallContainer
} from '../../containers'

import { UploadWidgetComponent } from '../../components'


class UploadPortfolioPage extends React.Component {

  /** DEMO PURPOSES ONLY **/
  constructor(props){
    super(props)

    this.state = {
      showMarginCall: true
    }

    this.showMarginCall = this.showMarginCall.bind(this)
  }

  showMarginCall(){
    this.setState({
      showMarginCall: true
    })
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  renderMarginCall(call){
    if(call)
      return (<MarginCallContainer/>)
  }

  /** END **/
  render() {
    return (
      <div>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <UploadWidgetComponent showMarginCall={this.showMarginCall}/>
        {this.renderMarginCall(this.state.showMarginCall)}
      </div>
    )
  }
}

export { UploadPortfolioPage }