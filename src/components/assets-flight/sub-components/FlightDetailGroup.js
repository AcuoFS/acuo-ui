import React from 'react'
import PropTypes from 'prop-types'
import FlightDetailRow from './FlightDetailRow'
import styles from './FlightItemTable.css'

export default class FlightDetailGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: props.propsIsExpanded
    }

    this.handlerPlusMinusBtn = this.handlerPlusMinusBtn.bind(this)
  }

  handlerPlusMinusBtn() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  getTime(time) {
    console.log(time.length)
    if(time.length > 5)
      return new Date(time).getHours() + ':' + new Date(time).getMinutes()
    else
      return time
  }

  render() {
    const {
      propHeaderDetail,
      propListOfFlightDetail
    } = this.props

    let flightDetailList

    // Display the flight detail list only when it's expanded
    if (propListOfFlightDetail && this.state.isExpanded) {
      flightDetailList = propListOfFlightDetail.map((flightDetail, index) => (
        <FlightDetailRow
          key={index}
          propTime={flightDetail.time}
          propAsset={flightDetail.asset}
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
          propIsGroupExpanded={this.state.isExpanded}
          propTime={this.getTime(propHeaderDetail.time)}
          propAsset={propHeaderDetail.agreement}
          propFrom={propHeaderDetail.from}
          propTo={propHeaderDetail.to}
          propValue={propHeaderDetail.value}
          propCcy={propHeaderDetail.ccy}
          propStatus={propHeaderDetail.status}
          propHandlerExpand={this.handlerPlusMinusBtn}/>

        {flightDetailList}

      </div>
    )
  }
}

FlightDetailGroup.propTypes = {
  propHeaderDetail: PropTypes.object.isRequired,
  propListOfFlightDetail: PropTypes.array,
  propsIsExpanded: PropTypes.bool
}

FlightDetailGroup.defaultProps = {
  propListOfFlightDetail: [],
  propsIsExpanded: false,
}
