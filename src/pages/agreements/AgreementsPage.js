import React from 'react'
import {
  NavigationBarContainer,
  AgreementsContainer
} from '../../containers'
import { hashHistory } from 'react-router'



class AgreementsPage extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    if(localStorage.loginAt < Date.now()){ hashHistory.push("/")}

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
