import React, {PropTypes} from 'react'
import * as FLIGHT_STATUS from '../../../constants/FlightStatuses'
import styles from './FlightItemTable.css'
import {checkNegative} from '../../../utils'

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
    return statusCell
  }

  renderSecondRow(value){
    if(value)
      return (<div className={styles.secondRow}>{value}</div>)
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

    statusCell = propStatus.main
    statusCell = this.getDomForStatus(propIsGroupHeader, propStatus.main, statusCell);

    return (
      <div className={rowStyle}>
        <div className={styles.flightItemTableCell}>
          <div>{propTime.main}</div>
          {this.renderSecondRow(propTime.secondary)}
        </div>
        <div className={styles.flightItemTableCell}>
          <div>{propAgreement.main}</div>
          {this.renderSecondRow(propAgreement.secondary)}
        </div>
        <div className={styles.flightItemTableCell}>
          <div>{propFrom.main}</div>
          {this.renderSecondRow(propFrom.secondary)}
        </div>
        <div className={styles.flightItemTableCell}>
          <div>{propTo.main}</div>
          {this.renderSecondRow(propTo.secondary)}
        </div>
        <div className={styles.flightItemTableCell}>
          <div>{propRowStyle ? propValue.main
            : checkNegative(parseFloat(propValue.main))}</div>
          {this.renderSecondRow(propValue.secondary)}
        </div>
        <div className={styles.flightItemTableCell}>
          <div>{propCcy.main}</div>
          {this.renderSecondRow(propCcy.secondary)}
        </div>
        <div className={styles.flightItemTableCell}>
          <div>{statusCell}</div>
        </div>
        <div className={styles.flightItemTableCell}>{imgDom}</div>
      </div>
    )
  }
}

FlightDetailRow.propTypes = {
  propTime: PropTypes.object.isRequired,
  propAgreement: PropTypes.object.isRequired,
  propFrom: PropTypes.object.isRequired,
  propTo: PropTypes.object.isRequired,
  propValue: PropTypes.object.isRequired,
  propCcy: PropTypes.object.isRequired,
  propStatus: PropTypes.object.isRequired,
  propIsGroupHeader: PropTypes.bool,
  propIsGroupExpanded: PropTypes.bool,
  propRowStyle: PropTypes.string
}

FlightDetailRow.defaultTypes = {
  propIsGroupHeader: false,
  propIsGroupExpanded: false,
  propRowStyle: null
}