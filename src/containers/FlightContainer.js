import React from 'react'
import {connect} from 'react-redux'
import {FlightComponent} from '../components'
import flightGroupArrival from '../components/assets-flight/mockFlightsArrival'
import {search} from "../actions/DeployedActions.js"

const mapStateToProps = state => {
 return{ departures: state.DeployedReducer.get('departures').toJS(),
         arrivals: flightGroupArrival,
         arrivals_searchText: state.DeployedReducer.get('arrivals_searchText'),
         departures_searchText: state.DeployedReducer.get('departures_searchText')
        }
}

const mapDispatchToProps = dispatch => {
  return {
    arrivalSearch: (searchText)=>{ dispatch(search.arrivals(searchText))},
    departureSearch: (searchText)=>{ dispatch(search.departures(searchText))}
  }
}

const FlightContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightComponent)

export default FlightContainer
