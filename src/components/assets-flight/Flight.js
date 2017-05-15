import React, {Proptypes} from 'react'
import FlightItem from './sub-components/FlightItem'
import {DEPARTURES, ARRIVALS} from '../../constants/FlightTypes'
import styles from './Flight.css'


export default class Flight extends React.Component {
  render() {
    const { departures, arrivals } = this.props

    return (
      <div className={styles.flightComponent}>
        <div className={styles.flight}><FlightItem name={DEPARTURES} data={departures}/></div>
        <div className={styles.flight}><FlightItem name={ARRIVALS} data={arrivals}/></div>
      </div>
    )
  }
}
