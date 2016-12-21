import React, {PropTypes} from 'react'
import FlightDetailGroup from './FlightDetailGroup'
import FlightDetailRow from './FlightDetailRow'
import * as FLIGHT_COL from '../../../constants/FlightDetailColumns'
import flightGroup from '../mockFlights'
import styles from './FlightItemTable.css'


export default class FlightItemTable extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.flightItemTable}>
          <FlightDetailRow
            propTime={FLIGHT_COL.FLIGHT_TIME}
            propAgreement={FLIGHT_COL.FLIGHT_AGREEMENT}
            propFrom={FLIGHT_COL.FLIGHT_FROM}
            propTo={FLIGHT_COL.FLIGHT_TO}
            propValue={FLIGHT_COL.FLIGHT_VALUE}
            propCcy={FLIGHT_COL.FLIGHT_CCY}
            propStatus={FLIGHT_COL.FLIGHT_STATUS}
            propRowStyle={styles.flightItemTableHeader}/>

          <FlightDetailGroup propsIsExpanded
                             propListOfFlightDetail={flightGroup.flightDetailList}
                             propHeaderDetail={flightGroup.header}/>

          <FlightDetailGroup propListOfFlightDetail={flightGroup.flightDetailList}
                             propHeaderDetail={flightGroup.header}/>

          <FlightDetailGroup propsIsExpanded
                             propListOfFlightDetail={flightGroup.flightDetailList}
                             propHeaderDetail={flightGroup.header}/>

        </div>
      </div>
    )
  }
}