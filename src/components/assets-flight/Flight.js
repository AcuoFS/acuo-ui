import React, {Proptypes} from 'react'
import FlightItem from './sub-components/FlightItem'
import {DEPARTURES, ARRIVALS} from '../../constants/FlightTypes'
import styles from './Flight.css'
import _ from 'lodash'

/************************* Helper Functions *******************************/
let SearchArrivals = ( data, searchText )=>{
  /* Accronyms:
     ctpyAgmt -> Counterparty Agreements
     agmtList -> Agreement List
     agmt     -> agmts                  */

  let toArray = obj => _.map( obj, val=>val )  /* #helper */
  // return _.filter(data, (ctpyAgmt)=>{
  //
  //  let agmtList = ctpyAgmt.flightDetailList //; console.log(agmtList);
  //
  //  let readyToFilterList = _.reduce(
  //   agmtList,
  //   (acc, agmts)=>{
  //    console.log(agmts);
  //    let agmtArray = _.reduce( agmts , (acc, content)=>_.concat(acc, toArray(content)) , [] )
  //    return _.concat(acc, agmtArray)
  //   },
  //   []
  //  )
  //
  //  let isThereAMatch = _.find( readyToFilterList , ( candidate )=>{
  //     let isMatch = _.toUpper(String(candidate)).match( new RegExp(_.toUpper(searchText.trim())))
  //     return (isMatch? true : false)
  //  })
  //
  //  // console.log("isTheresAMatch|-> ", isThereAMatch);
  //  return (isThereAMatch? true : false)
  // })

  return _.reduce(
   data,
   (acc, cptyAgmt)=>{
     console.log("---Conterparty Agreement---");
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
         let isMatch = _.toUpper(String(candidate)).match( new RegExp(_.toUpper(searchText.trim()))) ; if(isMatch) console.log(_.toUpper(String(candidate)) ,  new RegExp(_.toUpper(searchText.trim())) , isMatch)
         return (isMatch? true : false)
       } )  //; console.log("matchingProp |->", (matchingProp? _.concat(acc, agmt) : acc))

       return (matchingProp? _.concat(acc2, agmt) : acc2)
     },[])
     // console.log("newAgmtList|->", newAgmtList);

     let matchedCptyAgmt = _.pick(cptyAgmt, ['header'])
     if(!_.isEmpty(newAgmtList)) { matchedCptyAgmt.flightDetailList = newAgmtList }

     console.log("matchedCptyAgmt|->", matchedCptyAgmt);
     return _.concat( acc, matchedCptyAgmt )
   },
   [])

}
/**************************************************************************/

const Flight = (props)=>{
  let { departures, arrivals } = props
  let searchedArrivals = SearchArrivals(arrivals, "   euro  ")
  console.log("Arrivals Data|-> ", arrivals);
  console.log("Searched Arrivals |-> ", searchedArrivals);

  return(
   <div className={styles.flightComponent}>
     <div className={styles.flight}><FlightItem name={DEPARTURES} data={departures}/></div>
     <div className={styles.flight}><FlightItem name={ARRIVALS} data={searchedArrivals}/></div>
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
