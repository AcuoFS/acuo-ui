import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { FlightComponent } from '../components'
import flightGroupArrival from '../components/assets-flight/mockFlightsArrival'
import { search } from "../actions/DeployedActions.js"

const mapStateToProps = state => {
 return { departures: state.DeployedReducer.get('departures').toJS(),
         arrivals: flightGroupArrival,
         arrivals_searchText: state.DeployedReducer.get('arrivals_searchText'),
         departures_searchText: state.DeployedReducer.get('departures_searchText'),
         departureDates: getUniqueDates(state.DeployedReducer.get('departures').toJS())
        }
}

const mapDispatchToProps = dispatch => {
  return {
    arrivalSearch: (searchText)=>{ dispatch(search.arrivals(searchText))},
    departureSearch: (searchText)=>{ dispatch(search.departures(searchText))}
  }
}

const getUniqueDates = departuresList =>
  _.reduce(departuresList, (sum, x) => _.union(sum, [(new Date(x.header.time).getDate()) + ' ' + monthNames[(new Date(x.header.time).getMonth())]]), [])


const FlightContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightComponent)

export default FlightContainer
