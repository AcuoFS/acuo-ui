import React, {PropTypes} from 'react'
import FlightDetailGroup from './FlightDetailGroup'
import FlightDetailRow from './FlightDetailRow'
import * as FLIGHT_COL from '../../../constants/FlightDetailColumns'
import flightGroupDeparture from '../mockFlights'
import flightGroupArrival from '../mockFlightsArrival'
import styles from './FlightItemTable.css'


export default class FlightItemTable extends React.Component {

  jsonMocker(isArrival){
    if(isArrival)
      return flightGroupArrival
    else
      return flightGroupDeparture

  }

  render() {

    let flightGroup = this.jsonMocker(this.props.isArrival)

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
                             propListOfFlightDetail={flightGroup[0].flightDetailList}
                             propHeaderDetail={flightGroup[0].header}/>

          <FlightDetailGroup propListOfFlightDetail={flightGroup[1].flightDetailList}
                             propHeaderDetail={flightGroup[1].header}/>

          <FlightDetailGroup propsIsExpanded
                             propListOfFlightDetail={flightGroup[2].flightDetailList}
                             propHeaderDetail={flightGroup[2].header}/>

        </div>
      </div>
    )
  }
}