import React, {Proptypes} from 'react'
import FlightItem from './sub-components/FlightItem'
import {DEPARTURES, ARRIVALS} from '../../constants/FlightTypes'
import styles from './Flight.css'


export default class Flight extends React.Component {
  render() {
    return (
      <div className={styles.flightComponent}>
        <div className={styles.flight}><FlightItem name={DEPARTURES}/></div>
        <div className={styles.flight}><FlightItem name={ARRIVALS}/></div>
      </div>
    )
  }
}
