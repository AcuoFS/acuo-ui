import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { FlightComponent } from '../components'
import flightGroupArrival from '../components/assets-flight/mockFlightsArrival'
import { search } from "../actions/DeployedActions.js"
import { updateSelectedDepartureDate, fetchDepartures } from './../actions/DeployedActions'

const mapStateToProps = state => {
  // console.log(state.DeployedReducer.getIn(['selectedDepartureDate', 'label']))
  // console.log(state.DeployedReducer.get('departures').toJS())
  // console.log(state.DeployedReducer.get('departureDatesList'))
 return {
          departures: state.DeployedReducer.get('departures').toJS(),
          arrivals_searchText: state.DeployedReducer.get('arrivals_searchText'),
          arrivals: flightGroupArrival,
          departures_searchText: state.DeployedReducer.get('departures_searchText'),
          departureDatesList: state.DeployedReducer.get('departureDatesList').toJS(),
          selectedDepartureDate: (state.DeployedReducer.getIn(['selectedDepartureDate', 'label']) ? state.DeployedReducer.get('selectedDepartureDate').toJS() : state.DeployedReducer.get('departureDatesList').toJS()[0])
        }
}

const mapDispatchToProps = dispatch => {
  return {
    initDepartures: () => dispatch(fetchDepartures()),
    arrivalSearch: (searchText)=>{ dispatch(search.arrivals(searchText))},
    departureSearch: (searchText)=>{ dispatch(search.departures(searchText))},
    onUpdateSelectedDepartureDate: date => dispatch(updateSelectedDepartureDate(date))
  }
}

const mergeProps = (stateProps, dispatchProps) => ({
  filteredDepartures: stateProps.departures.filter(x => _.inRange(new Date(x.header.time * 1000).getTime(), stateProps.selectedDepartureDate.min, stateProps.selectedDepartureDate.max)),
  ...stateProps, ...dispatchProps
})

const FlightContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(FlightComponent)

export default FlightContainer
