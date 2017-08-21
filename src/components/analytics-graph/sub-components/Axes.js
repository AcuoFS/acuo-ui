/**
 * Created by Rui on 17/8/17.
 */

import React from 'react'
import * as d3 from 'd3'
import data from './data.json'

const max_x = (dataset) => d3.max(dataset.data, (d) => d.counterpartyAllegation)
const max_y = (dataset) => d3.max(dataset.data, (d) => d.clientAllegation)
const max_t = (a, b) => (a > b ? a : b)

const xScale = (xPadding, leftPan, w, data) =>
  d3.scaleLinear()
    .domain([0, max_t(max_x(data), max_y(data))])
    .range([xPadding + leftPan, w - xPadding])

const yScale = (yPadding, h, data) =>
  d3.scaleLinear()
    .domain([0, max_t(max_x(data), max_y(data))])
    .range([h - yPadding, yPadding])

const xAxis = (xPadding, leftPan, w, data) => d3.axisBottom()
  .scale(xScale(xPadding, leftPan, w, data))
  .ticks(5)

const yAxis = (yPadding, h, data) => d3.axisLeft()
  .scale(yScale(yPadding, h, data))
  .ticks(5)

export default class Axes extends React.Component {

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
      w = 600 + leftPan - margin.left - margin.right,
      h = 600 - margin.top - margin.bottom;

    var xPadding = 50;
    var yPadding = 50;

    const xAx  = this.refs.xaxis
    const yAx = this.refs.yaxis
    d3.select(xAx).call(xAxis(xPadding, leftPan, w, data))
    d3.select(yAx).call(yAxis(yPadding, h, data))
  }

  render() {
    const
      margin = {top: 20, right: 20, bottom: 20, left: 20},
      leftPan = 0,
      w = 600 + leftPan - margin.left - margin.right,
      h = 600 - margin.top - margin.bottom;
    var xPadding = 50
    var yPadding = 50

    return (
      <g>
        {/*svg.append('g')*/}
        {/*.attr('class', 'axis')*/}
        {/*.attr("transform", "translate(0," + (h - xPadding) + ")")*/}
        {/*.call(xAxis);*/}

        {/*svg.append('g')*/}
        {/*.attr('class', 'axis')*/}
        {/*.attr("transform", "translate(" + (leftPan + yPadding) + ",0)")*/}
        {/*.call(yAxis);*/}
        <g ref="xaxis" transform={"translate(0, " + (h - xPadding) + ")"}></g>
        <g ref="yaxis" transform={"translate(50, " + (leftPan + yPadding - 50) + ")"}></g>
      </g>
    )
  }
}