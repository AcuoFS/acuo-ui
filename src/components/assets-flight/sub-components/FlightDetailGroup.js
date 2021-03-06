import React from 'react'
import PropTypes from 'prop-types'
import FlightDetailRow from './FlightDetailRow'
import styles from './FlightItemTable.css'
import transitions from './transition.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

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
    // console.log(time.length)
    const padTime = foo => foo < 10 ? '0' + foo : foo

    if(time.length > 5)
      return padTime(new Date(time * 1000).getHours()) + ':' + padTime(new Date(time * 1000).getMinutes())
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
      <ReactCSSTransitionGroup
        component="div"
        className={styles.flightItemTableRowGroup}
        transitionName={transitions}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>

        <div className={styles.spacer}></div>

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

      </ReactCSSTransitionGroup>
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
