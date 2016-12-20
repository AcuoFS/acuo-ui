import React, {PropTypes} from 'react'
import FlightDetailRow from './FlightDetailRow'
import styles from './FlightItemTable.css'

export default class FlightDetailGroup extends React.Component {
  render() {
    return (
      <div className={styles.flightItemTableRowGroup}>
        <FlightDetailRow
          propIsGroupHeader
          propTime={"g cell 1"}
          propAgreement={"g cell 2"}
          propFrom={"g cell 3"}
          propTo={"g cell 4"}
          propValue={"g cell 5"}
          propCcy={"g cell 6"}
          propStatus={"g cell 7"}/>

        <FlightDetailRow
          propTime={"cell 1"}
          propAgreement={"cell 2"}
          propFrom={"cell 3"}
          propTo={"cell 4"}
          propValue={"cell 5"}
          propCcy={"cell 6"}
          propStatus={"cell 7"}/>

        <FlightDetailRow
          propTime={"cell 8"}
          propAgreement={"cell 9"}
          propFrom={"cell 10"}
          propTo={"cell 11"}
          propValue={"cell 12"}
          propCcy={"cell 13"}
          propStatus={"cell 14"}/>
      </div>
    )
  }
}