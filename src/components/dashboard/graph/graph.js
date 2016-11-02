import React from 'react'
import {connect} from 'react-redux'
import Axis from './sub-components/axis'
import SubAxis from './sub-components/subaxis'
import GraphBody from './sub-components/graph_body'
import Pointer from './sub-components/pointer'

class Graph extends React.Component {
  static get defaultProps() {
    const now = new Date("2016-10-23T06:00:00.000Z")
    const time = [now.getHours(), (now.getMinutes() <10 ? '0' : ' ')  + now.getMinutes()]
    const currentTime = time.join(":")

    return {
      width: 1440,
      height: 500,
      now: now,
      time: currentTime
    }
  }
  constructor(props){
    super(props)
  }
  render() {
    return (
      <svg viewBox="0 0 1440 500" preserveAspectRatio="xMaxYMax meet">
        <Axis
          x={0}
          y={this.props.height * 0.5}
          length={this.props.width}
          horizontal={true}
          stroke={"#9B9B9B" }
          />
        <Axis
          x={this.props.width * 0.5}
          y={30}
          length={this.props.height - 60}
          horizontal={false}
          stroke="#F91233"
          />
        <Pointer
          xrec={this.props.width * 0.5 -50} //670
          yrec={30}
          recwidth={(this.props.width-240) / 12} //100
          recheight={20}
          xtext={this.props.width * 0.5 - 20} //680
          ytext={45}
          triangle1={"710,50 730,50 720,60"}
          triangle2={"720,470 710,480 730,480"}
          color="#F91233"
          text= {this.props.time}
          />
        <SubAxis
          x={0}
          y={this.props.height * 0.5 - 10}
          length={this.props.width }
          />
        <GraphBody
          x={this.props.width * 0.5}
          y={this.props.height * 0.5}
          time={this.props.now}
          data={this.props.derivatives}
          />
      </svg>
    )
  }
}

function mapStateToProps(state){
    return{
        currentTime : state.getIn(['display', 'timeUpdated']),
        derivatives : state.getIn(['display', 'derivatives'])
    }
}

export const GraphContainer = connect(mapStateToProps)(Graph)
