import React from 'react'
import Axis from './sub-components/axis'
import SubAxis from './sub-components/subaxis'
import GraphBody from './sub-components/graph_body'

export default class Graph extends React.Component {

  static get defaultProps() {
    return {
      width: 1440,
      height: 500
    }
  }
  render() {
    return (
      <svg viewBox="0 0 1440 500" preserveAspectRatio="xMaxYMax meet">
        <Axis
          x={120}
          y={this.props.height * 0.5}
          length={this.props.width - 240}
          horizontal={true}
        />
        <Axis
          x={this.props.width * 0.5}
          y={25}
          length={this.props.height - 50}
          horizontal={false}
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
