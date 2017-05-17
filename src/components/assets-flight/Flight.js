import React, {Proptypes} from 'react'
import FlightItem from './sub-components/FlightItem'
import {DEPARTURES, ARRIVALS} from '../../constants/FlightTypes'
import styles from './Flight.css'
import _ from 'lodash'

/************************* Helper Functions *******************************/
let SearchArrivals = ( data, searchText )=>{
  /* Accronyms:
     ctpyAgmt     -> Counterparty Agreements
     agmtList     -> Agreement List
     agmt         -> agmts
     acc          -> reduce function's accumulator
     matchingProp -> Matching Property            */

  console.log("@SearchArrivals() |-> ", searchText);
  let toArray = obj => _.map( obj, val=>val )

  return _.reduce(
   data,
   (acc, cptyAgmt)=>{
     // console.log("---Conterparty Agreement---");
     // console.log(cptyAgmt);

     /* within each cptyAgmt,
          loop through each agmtList,
          check if any agmtList.prop matches searchText,
            if match, return entire agmtList */
     let agmtList = cptyAgmt.flightDetailList

     let newAgmtList = _.reduce(agmtList, (acc2, agmt)=>{
       // console.log( "acc2|->", acc2, "  agmt|->", agmt);
       let agmtArray =  _.reduce( agmt , (acc,prop)=>_.concat(acc, toArray(prop)) , []) //; console.log(agmtArray);

       let matchingProp = _.find( agmtArray, (candidate)=>{
         let isMatch = _.toUpper(String(candidate)).match( new RegExp(_.toUpper(searchText.trim())));// if(isMatch) console.log(_.toUpper(String(candidate)) ,  new RegExp(_.toUpper(searchText.trim())) , isMatch)
         return (isMatch? true : false)
       } )  //; console.log("matchingProp |->", (matchingProp? _.concat(acc, agmt) : acc))

       return (matchingProp? _.concat(acc2, agmt) : acc2)
     },[])
     // console.log("newAgmtList|->", newAgmtList);

     let matchedCptyAgmt = _.pick(cptyAgmt, ['header'])
     if(!_.isEmpty(newAgmtList)) { matchedCptyAgmt.flightDetailList = newAgmtList }

     // console.log("matchedCptyAgmt|->", matchedCptyAgmt);
     return _.concat( acc, matchedCptyAgmt )
   },
   [])

}
/**************************************************************************/

const Flight = (props)=>{
  // console.log("@FlightComponent|-> ",props);
  let { departures, arrivals, arrivals_searchText } = props
  let searchedArrivals = SearchArrivals(arrivals, arrivals_searchText)
  let arrivalActions = { arrivalSearch:  props.arrivalSearch}

  return(
   <div className={styles.flightComponent}>
     <div className={styles.flight}><FlightItem name={DEPARTURES} data={departures}/></div>
     <div className={styles.flight}><FlightItem name={ARRIVALS} data={{searchedArrivals, arrivals_searchText }} action={arrivalActions} /></div>
   </div>
  )
}

export default Flight


/* Class Component */
// export default class Flight extends React.Component {
//   render() {
//     const { departures, arrivals } = this.props
//
//     return (
//       <div className={styles.flightComponent}>
//         <div className={styles.flight}><FlightItem name={DEPARTURES} data={departures}/></div>
//         <div className={styles.flight}><FlightItem name={ARRIVALS} data={arrivals}/></div>
//       </div>
//     )
//   }
// }
