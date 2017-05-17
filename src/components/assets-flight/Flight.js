import React, {Proptypes} from 'react'
import FlightItem from './sub-components/FlightItem'
import {DEPARTURES, ARRIVALS} from '../../constants/FlightTypes'
import styles from './Flight.css'


const Flight = (props)=>{
  let { departures, arrivals } = props
  console.log("Arrivals |-> ", arrivals);

  return(
   <div className={styles.flightComponent}>
     <div className={styles.flight}><FlightItem name={DEPARTURES} data={departures}/></div>
     <div className={styles.flight}><FlightItem name={ARRIVALS} data={arrivals}/></div>
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
