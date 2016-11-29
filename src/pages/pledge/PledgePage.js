import React from 'react'
import stylesG from '../../static/global.css'
import {
  NavigationBarContainer,
  PledgeContainer
} from '../../containers'
import { updateCollateral } from '../../actions'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'


class PledgePage extends React.Component{
  constructor(props){
    super(props)

    // fetch('http://localhost:3000/collateral').then((response) => {
      fetch('http://52.74.186.112:8081/init-collateral').then((response) => {
      return response.json()
    }).then((obj) => {
      this.props.onCollateralDataAvailable(fromJS(obj.data))
    })
  }

  render(){
    return (
      <div className={stylesG.globalStyles}>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <PledgeContainer />
      </div>
    )
  }
}


const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  onCollateralDataAvailable: (collateralData) => {
    dispatch(updateCollateral(collateralData))
  }
})

const PledgePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PledgePage)

export { PledgePageContainer }