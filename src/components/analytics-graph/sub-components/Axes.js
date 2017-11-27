/**
 * Created by Rui on 17/8/17.
 */

import React from 'react'
import * as d3 from 'd3'

const max_x = (dataset, axisKey) => d3.max(dataset.data, (d) => d[axisKey])
const max_y = (dataset, axisKey) => d3.max(dataset.data, (d) => d[axisKey])
const max_t = (a, b) => (a > b ? a : b)

const xScale = (xPadding, leftPan, w, data, axisKey) =>
  d3.scaleLinear()
    .domain([0, max_t(max_x(data, axisKey), max_y(data, axisKey))])
    .range([xPadding + leftPan, w - xPadding])

const yScale = (yPadding, h, data, axisKey) =>
  d3.scaleLinear()
    .domain([0, max_t(max_x(data, axisKey), max_y(data, axisKey))])
    .range([h - yPadding, yPadding])

const xAxis = (xPadding, leftPan, w, data, axisKey) => d3.axisBottom()
  .scale(xScale(xPadding, leftPan, w, data, axisKey))
  .ticks(5)

const yAxis = (yPadding, h, data, axisKey) => d3.axisLeft()
  .scale(yScale(yPadding, h, data, axisKey))
  .ticks(5)

export default class Axes extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis() {
    const
      margin = {top: 20, right: 20, bottom: 20, left: 20},
      leftPan = 0,
      w = 700 + leftPan - margin.left - margin.right,
      h = 700 - margin.top - margin.bottom;

    const xPadding = 100;
    const yPadding = 100;

    const xAx  = this.refs.xaxis
    const yAx = this.refs.yaxis
    d3.select(xAx).call(xAxis(xPadding, leftPan, w, this.props.dataSet, this.props.xAxis.key))
    d3.select(yAx).call(yAxis(yPadding, h, this.props.dataSet, this.props.yAxis.key))
  }

  render() {
    const
      margin = {top: 20, right: 20, bottom: 20, left: 20},
      leftPan = 0,
      w = 700 + leftPan - margin.left - margin.right,
      h = 700 - margin.top - margin.bottom;
    const xPadding = 100
    const yPadding = 100

    return (
      <g>
        <g ref="xaxis" transform={"translate(0, " + (h - xPadding) + ")"}></g>
        <g ref="yaxis" transform={"translate(100, " + (leftPan + yPadding - 100) + ")"}></g>
      </g>
    )
  }
}