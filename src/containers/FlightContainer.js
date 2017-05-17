import React from 'react'
import {connect} from 'react-redux'
import {FlightComponent} from '../components'
import flightGroupArrival from '../components/assets-flight/mockFlightsArrival'
import {search} from "../actions/DeployedActions.js"

const mapStateToProps = state => {
 // console.log("@mapStateToProps |->", state.DeployedReducer.get('arrivals_searchText');
 return{ departures: state.DeployedReducer.get('departures').toJS(),
         arrivals: flightGroupArrival,
         arrivals_searchText: state.DeployedReducer.get('arrivals_searchText')
        }
}

const mapDispatchToProps = dispatch => {
  // console.log(search);
  return {
    arrivalSearch: (searchText)=>{ dispatch(search.arrivals(searchText))}
  }
}

const FlightContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightComponent)

export default FlightContainer
