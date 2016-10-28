import React from 'react'
import {connect} from 'react-redux'
import Axis from './sub-components/axis'
import SubAxis from './sub-components/subaxis'
import GraphBody from './sub-components/graph_body'
import Pointer from './sub-components/pointer'

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
          stroke="black" onClick={this.getDeriv().map(this.getType).map(this.getStatus)}
        />
        <Axis
          x={this.props.width * 0.5}
          y={30}
          length={this.props.height - 60}
          horizontal={false}
          stroke="red"
        />
          <Pointer
              xrec={this.props.width * 0.5 -50} //670
              yrec={30}
              recwidth={(this.props.width-240) / 12} //100
              recheight={20}
              xtext={this.props.width * 0.5 -40} //680
              ytext={45}
              triangle1={"710,50 730,50 720,60"}
              triangle2={"720,470 710,480 730,480"}
              color="#F91233"
              text= {this.props.time}
          />
        <SubAxis
          x={120}
          y={this.props.height * 0.5 - 10}
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
