import React, {PropTypes} from 'react'
import FlightDetailRow from './FlightDetailRow'
import styles from './FlightItemTable.css'

export default class FlightDetailGroup extends React.Component {
  render() {
    const {
      propHeaderDetail,
      propListOfFlightDetail
    } = this.props

    let flightDetailList

    if (propListOfFlightDetail) {
      flightDetailList = propListOfFlightDetail.map((flightDetail, index) => (
        <FlightDetailRow
          key={index}
          propTime={flightDetail.time}
          propAgreement={flightDetail.agreement}
          propFrom={flightDetail.from}
          propTo={flightDetail.to}
          propValue={flightDetail.value}
          propCcy={flightDetail.ccy}
          propStatus={flightDetail.status}/>
      ))
    }

    return (
      <div className={styles.flightItemTableRowGroup}>
        <FlightDetailRow
          propIsGroupHeader
          propIsGroupExpanded={this.props.propsIsExpanded}
          propTime={propHeaderDetail.time}
          propAgreement={propHeaderDetail.agreement}
          propFrom={propHeaderDetail.from}
          propTo={propHeaderDetail.to}
          propValue={propHeaderDetail.value}
          propCcy={propHeaderDetail.ccy}
          propStatus={propHeaderDetail.status}/>

        {flightDetailList}

      </div>
    )
  }
}

FlightDetailGroup.propTypes = {
  propHeaderDetail: PropTypes.object.isRequired,
  propListOfFlightDetail: PropTypes.array
}

FlightDetailGroup.defaultProps = {
  propListOfFlightDetail: []
}