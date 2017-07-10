
import React from 'react';
import PropTypes from 'prop-types'
import FlightItem from './sub-components/FlightItem'
import {DEPARTURES, ARRIVALS} from '../../constants/FlightTypes'
import styles from './Flight.css'
import _ from 'lodash'

/************************* Helper Functions *******************************/
let Search_DepartureArrival = ( data , searchText )=>{
  /* Accronyms:
      ctpyAgmt       -> Counterparty Agreements
      agmt           -> agmts
      acc            -> reduce function's accumulator
      matchingProp   -> Matching Property
      reformCptyAgmt -> Reform Counterparty Agreement           */

  let toArray = obj => _.map( obj, val=>val )
  let reformCptyAgmt = ( cptyAgmt , newList )=>{
    let matchedCptyAgmt = undefined;
    if(!_.isEmpty(newList)) {
      matchedCptyAgmt = _.pick(cptyAgmt, ['header'])
      matchedCptyAgmt.flightDetailList = newList
    }
    return matchedCptyAgmt
  }
  let searchHeaderProp = (agreementObject, mainAccumulator)=>{
    let foundInHeader = _.find(toArray(agreementObject.header), (candidate)=>{
        let matchFound = _.toUpper(String(candidate)).match( new RegExp(_.toUpper(searchText.trim())));
        return (matchFound ? true : false)
      })
    return (foundInHeader? _.concat(mainAccumulator, agreementObject) : mainAccumulator )
  }

  return _.reduce(
   data,
   (acc, cptyAgmt)=>{

     let newAgmtList = _.reduce(cptyAgmt.flightDetailList, (acc2, agmt)=>{
       let agreementsArray =  _.reduce( agmt , (acc,prop)=>_.concat(acc, toArray(prop)) , [])
       let foundInAgreementAssets = _.find( agreementsArray, (candidate)=>{
         let matchFound = _.toUpper(String(candidate)).match( new RegExp(_.toUpper(searchText.trim())));
         return (matchFound? true : false)
       } );

       return (foundInAgreementAssets? _.concat(acc2, agmt) : acc2)
     },[]);
     let matchList =  reformCptyAgmt( cptyAgmt, newAgmtList)

     return ( matchList? _.concat( acc, matchList) : searchHeaderProp(cptyAgmt, acc))
   },
   [])

}
/**************************************************************************/

export default class Flight extends React.Component{

 componentWillUnmount(){
  let { arrivalSearch, departureSearch } = this.props
  arrivalSearch("")
  departureSearch("")
 }

 render(){

  let { departures, arrivals, arrivals_searchText, departures_searchText, departureDatesList } = this.props

  let searchedArrivals = Search_DepartureArrival(arrivals, arrivals_searchText)
  let searchedDepartures = Search_DepartureArrival(departures, departures_searchText)

  let arrivalActions = { arrivalSearch:  this.props.arrivalSearch}
  let departureActions = { departureSearch: this.props.departureSearch}

  return(
   <div className={styles.flightComponent}>

     <div className={styles.flight}>
        <FlightItem name={DEPARTURES}
                    data={{searchedDepartures, departures_searchText}}
                    action={departureActions}
                    departureDatesList={departureDatesList} />   </div>

     <div className={styles.flight}>
        <FlightItem name={ARRIVALS}
                    data={{searchedArrivals, arrivals_searchText }}
                    action={arrivalActions} />   </div>

   </div>
  )
 }

}
