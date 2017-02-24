import React from 'react'
import {
  NavigationBarContainer,
  AgreementsContainer
} from '../../containers'


class AgreementsPage extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <AgreementsContainer/>
      </div>
    )
  }
}

export {AgreementsPage}