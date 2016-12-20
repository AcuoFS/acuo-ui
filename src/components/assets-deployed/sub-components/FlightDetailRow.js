import React, {PropTypes} from 'react'
import styles from './FlightItemTable.css'

export default class FlightDetailRow extends React.Component {
  render() {
    const {
      propIsGroupHeader,
      propIsGroupExpanded,
      propTime,
      propAgreement,
      propFrom,
      propTo,
      propValue,
      propCcy,
      propStatus,
      propRowStyle
    } = this.props

    let rowStyle, imgDom

    // Use style from props if there is, else check if row is a group header
    if (propRowStyle) {
      rowStyle = propRowStyle
    } else {
      rowStyle = propIsGroupHeader ? styles.flightItemTableExpandRow : styles.flightItemTableRow
    }

    if (propIsGroupHeader && propIsGroupExpanded) {
      imgDom = <img src="./images/common/minusbox.png"/>
    } else if (propIsGroupHeader && !propIsGroupExpanded) {
      imgDom = <img src="./images/common/plusbox.png"/>
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
        <div className={styles.flightItemTableCell}>{imgDom}</div>
      </div>
    )
  }
}

FlightDetailRow.propTypes = {
  propTime: PropTypes.string.isRequired,
  propAgreement: PropTypes.string.isRequired,
  propFrom: PropTypes.string.isRequired,
  propTo: PropTypes.string.isRequired,
  propValue: PropTypes.string.isRequired,
  propCcy: PropTypes.string.isRequired,
  propStatus: PropTypes.string.isRequired,
  propIsGroupHeader: PropTypes.bool,
  propIsGroupExpanded: PropTypes.bool,
  propRowStyle: PropTypes.string
}

FlightDetailRow.defaultTypes = {
  propIsGroupHeader: false,
  propIsGroupExpanded: false,
  propRowStyle: null
}