import React from 'react'
import styles from './FlightItemTable.css'

export default class FlightDetailRow extends React.Component {
  render() {
    const {
      propIsGroupHeader,
      propTime,
      propAgreement,
      propFrom,
      propTo,
      propValue,
      propCcy,
      propStatus,
      propRowStyle
    } = this.props

    // Use style from props if there is, else check if row is a group header
    let rowStyle
    if(propRowStyle){
      rowStyle = propRowStyle
    }else{
      rowStyle = propIsGroupHeader ? styles.flightItemTableExpandRow : styles.flightItemTableRow
    }
    return (
      <div className={rowStyle}>
        <div className={styles.flightItemTableCell}>{propTime}</div>
        <div className={styles.flightItemTableCell}>{propAgreement}</div>
        <div className={styles.flightItemTableCell}>{propFrom}</div>
        <div className={styles.flightItemTableCell}>{propTo}</div>
        <div className={styles.flightItemTableCell}>{propValue}</div>
        <div className={styles.flightItemTableCell}>{propCcy}</div>
        <div className={styles.flightItemTableCell}>{propStatus}</div>
        <div className={styles.flightItemTableCell}>
          {propIsGroupHeader ? <img src="./images/common/plusbox.png"/> : null}
        </div>
      </div>
    )
  }
}