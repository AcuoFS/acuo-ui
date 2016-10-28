import React from 'react'
import {connect} from 'react-redux'
import Axis from './sub-components/axis'
import SubAxis from './sub-components/subaxis'
import Triangle from './sub-components/triangle'
import GraphBody from './sub-components/graph_body'

export default class Graph extends React.Component {
  constructor(props){
    super(props)
    this.getDeriv = this.getDeriv.bind(this)
    this.getTimeFrames = this.getTimeFrames.bind(this)
    this.getStatus = this.getStatus.bind(this)
  }

  static get defaultProps() {
    const now = new Date()
    const time = [now.getHours(), (now.getMinutes() <10 ? '0' : ' ')  + now.getMinutes()]
    const currentTime = time.join(":")

    return {
      width: 1440,
      height: 500,
      time: currentTime
    }
  }
  getDeriv(){
    // console.log(this.props.derivatives)
    return this.props.derivatives || []
  }
  getType(deriv){
    // console.log("deriv", deriv)
    // console.log(deriv.get('marginStatus'))
    return deriv.get('marginStatus')
  }
  getTimeFrames(stat){
    console.log(stat.get('status'))
    console.log("i am stat", stat.get('timeFrames').map(this.getTime))
  }
  getStatus(status){
    // console.log("status", status)
    console.log("iam get status", status.map(this.getTimeFrames))
  }
  getTime(time){
    console.log("iam time", time.get('timeRangeStart'))
    console.log()
  }
  render() {
    return (
      <svg viewBox="0 0 1440 500" preserveAspectRatio="xMaxYMax meet">
        <Axis
          x={120}
          y={this.props.height * 0.5}
          length={this.props.width - 240}
          horizontal={true}
          stroke="#9B9B9B"
          stroke="black" onClick={this.getDeriv().map(this.getType).map(this.getStatus)}
        />
        <Axis
          x={this.props.width * 0.5}
          y={50}
          length={this.props.height - 100}
          horizontal={false}
          stroke="red"
          text= {this.props.time}
        />
        <SubAxis
          x={120}
          y={this.props.height * 0.5 - 25}
          length={this.props.width - 240}
        />
        <GraphBody
          x={120}
          y={47.5}
          data={this.props.data}
        />
      </svg>
    )
  }
}

function mapStateToProps(state){
    return{
        derivatives : state.getIn(['display', 'derivatives'])
    }
}

export const GraphContainer = connect(mapStateToProps)(Graph)
