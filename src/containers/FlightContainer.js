import React from 'react'
import {connect} from 'react-redux'
import {FlightComponent} from '../components'
import flightGroupArrival from '../components/assets-flight/mockFlightsArrival'

const mapStateToProps = state => ({
  departures: state.DeployedReducer.get('departures').toJS(),
  arrivals: flightGroupArrival
})

const mapDispatchToProps = dispatch => ({

})

const FlightContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightComponent)

export default FlightContainer