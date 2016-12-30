import React, {PropTypes} from 'react'
import * as FLIGHT_STATUS from '../../../constants/FlightStatuses'
import styles from './FlightItemTable.css'

export default class FlightDetailRow extends React.Component {
  // Additional styling for status on header row
  getDomForStatus(propIsGroupHeader, propStatus, statusCell) {
    if (propIsGroupHeader) {
      switch (propStatus) {
        case FLIGHT_STATUS.IN_FLIGHT:
          statusCell =
            <div className={styles.flightStatus + " " + styles.flightStatusBlue}>
              {propStatus}
            </div>
          break
        case FLIGHT_STATUS.DELAYED:
          statusCell =
            <div className={styles.flightStatus + " " + styles.flightStatusRed}>
              {propStatus}
            </div>
          break
        case FLIGHT_STATUS.CANCELLED:
          statusCell =
            <div className={styles.flightStatus + " " + styles.flightStatusGrey}>
              {propStatus}
            </div>
          break
        default:
          statusCell = propStatus
      }
    }
    return statusCell;
  }

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
      propRowStyle,
      propHandlerExpand
    } = this.props

    let rowStyle, imgDom, statusCell

    // Use style from props if there is, else check if row is a group header
    if (propRowStyle) {
      rowStyle = propRowStyle
    } else {
      rowStyle = propIsGroupHeader ? styles.flightItemTableExpandRow : styles.flightItemTableRow
    }

    if (propIsGroupHeader && propIsGroupExpanded) {
      imgDom = <img className={styles.imageCursor}
                    src="./images/common/minusbox.png"
                    onClick={propHandlerExpand}/>
    } else if (propIsGroupHeader && !propIsGroupExpanded) {
      imgDom = <img className={styles.imageCursor}
                    src="./images/common/plusbox.png"
                    onClick={propHandlerExpand}/>
    }

    statusCell = propStatus
    statusCell = this.getDomForStatus(propIsGroupHeader, propStatus, statusCell);

    return (
      <div className={rowStyle}>
        <div className={styles.flightItemTableCell}>{propTime}</div>
        <div className={styles.flightItemTableCell}>{propAgreement}</div>
        <div className={styles.flightItemTableCell}>{propFrom}</div>
        <div className={styles.flightItemTableCell}>{propTo}</div>
        <div className={styles.flightItemTableCell}>{propValue}</div>
        <div className={styles.flightItemTableCell}>{propCcy}</div>
        <div className={styles.flightItemTableCell}>{statusCell}</div>
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