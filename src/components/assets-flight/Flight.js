
import React, {Proptypes} from 'react'
import FlightItem from './sub-components/FlightItem'
import {DEPARTURES, ARRIVALS} from '../../constants/FlightTypes'
import styles from './Flight.css'
import _ from 'lodash'

/************************* Helper Functions *******************************/
let Search_DepartureArrival = ( data , searchText )=>{
  /* Accronyms:
      ctpyAgmt       -> Counterparty Agreements
      agmtList       -> Agreement List
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

  return _.reduce(
   data,
   (acc, cptyAgmt)=>{
     /* within each cptyAgmt,
          loop through each agmtList,
          check if any agmtList.prop matches searchText,
            if match, return entire agmtList */
     let agmtList = cptyAgmt.flightDetailList

     let newAgmtList = _.reduce(agmtList, (acc2, agmt)=>{
       let agmtArray =  _.reduce( agmt , (acc,prop)=>_.concat(acc, toArray(prop)) , [])

       let matchingProp = _.find( agmtArray, (candidate)=>{
         let isMatch = _.toUpper(String(candidate)).match( new RegExp(_.toUpper(searchText.trim())));
         return (isMatch? true : false)
       } );

       return (matchingProp? _.concat(acc2, agmt) : acc2)
     },[]);

     if(!_.isEmpty(newAgmtList)) {
       let matchedCptyAgmt = _.pick(cptyAgmt, ['header'])
       matchedCptyAgmt.flightDetailList = newAgmtList
     }
     let matchList =  reformCptyAgmt( cptyAgmt, newAgmtList)

     return ( matchList? _.concat( acc, matchList) : acc)
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

  let { departures, arrivals, arrivals_searchText, departures_searchText } = this.props

  let searchedArrivals = Search_DepartureArrival(arrivals, arrivals_searchText)
  let searchedDepartures = Search_DepartureArrival(departures, departures_searchText)

  let arrivalActions = { arrivalSearch:  this.props.arrivalSearch}
  let departureActions = { departureSearch: this.props.departureSearch}

  return(
   <div className={styles.flightComponent}>

     <div className={styles.flight}>
        <FlightItem name={DEPARTURES}
                    data={{searchedDepartures, departures_searchText}}
                    action={departureActions}  />   </div>

     <div className={styles.flight}>
        <FlightItem name={ARRIVALS}
                    data={{searchedArrivals, arrivals_searchText }}
                    action={arrivalActions} />   </div>

   </div>
  )
 }

}
