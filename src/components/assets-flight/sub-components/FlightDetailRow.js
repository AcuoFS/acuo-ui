import React from 'react'
import PropTypes from 'prop-types'
import * as FLIGHT_STATUS from '../../../constants/FlightStatuses'
import styles from './FlightItemTable.css'
import {checkNegative} from '../../../utils'
import _ from 'lodash'
import { maxLengthToEllipsis } from './../../../utils'

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
        case FLIGHT_STATUS.DEPARTED:
          statusCell =
            <div className={styles.flightStatus + " " + styles.flightStatusGreen}>
              {propStatus}
            </div>
          break
        default:
          statusCell = propStatus
      }
    }
    return statusCell
  }

  renderSecondRow(value) {
    if (value)
      return (<div className={styles.secondRow} title={value}>{maxLengthToEllipsis(value, 12)}</div>)
  }

  getTextFromObjectOrStr(property) {
    return _.isObject(property) ? property.main : property
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

    statusCell = this.getTextFromObjectOrStr(propStatus)
    statusCell = this.getDomForStatus(propIsGroupHeader,
      this.getTextFromObjectOrStr(propStatus), statusCell)

    return (
      <div className={rowStyle}>
        <div className={styles.flightItemTableCell}>
          <div>{this.getTextFromObjectOrStr(propTime)}</div>
        </div>
        <div className={styles.flightItemTableCell}>
          <div>{this.getTextFromObjectOrStr(propAgreement)}</div>
          {this.renderSecondRow(propAgreement.secondary)}
        </div>
        <div className={styles.flightItemTableCell}>
          <div>{this.getTextFromObjectOrStr(propFrom)}</div>
          {this.renderSecondRow(propFrom.secondary)}
        </div>
        <div className={styles.flightItemTableCell}>
          <div>{this.getTextFromObjectOrStr(propTo)}</div>
          {this.renderSecondRow(propTo.secondary)}
        </div>
        <div className={styles.flightItemTableCell}>
          <div> {propRowStyle ? propValue :
            checkNegative(Math.round(parseFloat(this.getTextFromObjectOrStr(propValue))))}
            {/*{propRowStyle ? propValue.main*/}
            {/*: checkNegative(parseFloat(propValue.main))}*/}
          </div>
          {this.renderSecondRow(propValue.secondary)}
        </div>
        <div className={styles.flightItemTableCell}>
          <div>{this.getTextFromObjectOrStr(propCcy)}</div>
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
  propTime: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  propAgreement: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  propFrom: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  propTo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  propValue: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  propCcy: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  propStatus: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  propIsGroupHeader: PropTypes.bool,
  propIsGroupExpanded: PropTypes.bool,
  propRowStyle: PropTypes.string
}

FlightDetailRow.defaultTypes = {
  propIsGroupHeader: false,
  propIsGroupExpanded: false,
  propRowStyle: null
}
