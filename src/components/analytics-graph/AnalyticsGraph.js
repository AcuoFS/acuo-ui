/**
 * Created by Rui on 16/8/17.
 */

import React from 'react'
import * as d3 from 'd3'

import Axes from './sub-components/Axes'
import Circles from './sub-components/Circles'

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

const AnalyticsGraphComponent = (props) => {
  const
    margin = {top: 20, right: 20, bottom: 20, left: 20},
    leftPan = 0,
    w = 600 + leftPan - margin.left - margin.right,
    cheat = 200,
    h = 600 - margin.top - margin.bottom;

  const xPadding = 50;
  const yPadding = 50;

  const scales = {xScale: xScale(xPadding, leftPan, w, props.dataSet), yScale: yScale(yPadding, h, props.dataSet)}

  const lineSettings = {
    x1: scales.xScale(0),
    y1: scales.yScale(0),
    x2: scales.xScale(max_t(max_x(props.dataSet), max_y(props.dataSet))),
    y2: scales.yScale(max_t(max_x(props.dataSet), max_y(props.dataSet))),
    stroke: "black",
    strokeWidth: 1.2
  }

  const xAxisLabel = {
    y: h - yPadding / 4,
    x: leftPan + (w - leftPan) / 2,
    style: {
      textAnchor: "middle"
    }
  }

  const yAxisLabel = {
    y: leftPan + yPadding / 4,
    x: -(h) / 2,
    style: {
      textAnchor: "middle"
    },
    transform: 'rotate(-90)',
    fontSize: 16
  }

  // console.log(props.dataSet)

  return (
    <div>
      <svg height={h} width={w + cheat}>
        <Axes {...props} />
        <line {...lineSettings} />
        <text {...xAxisLabel}>{props.xAxis.label}</text>
        <text {...yAxisLabel}>{props.yAxis.label}</text>
        <Circles {...scales} {...props} />
      </svg>
      <div style={{paddingLeft: '50px'}}>
        <button onClick={props.onFlipAxes}>flip</button>
      </div>
    </div>
  )
}


export default AnalyticsGraphComponent