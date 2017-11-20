/**
 * Created by Rui on 18/8/17.
 */

import React from 'react'

import styles from './analyticsGraph.css'
import {
  numberWithCommas
} from './../../../utils'

const renderCircles = (x, props, i) => {

  const xRectPadding = 10
  const yRectPadding = 20
  const xTextPadding = 15
  const yTextPadding = 20

  const { xAxis, yAxis } = props

  // console.log('cx, cy ', props.xScale(x[xAxis.key]), props.yScale(x[yAxis.key]))

  const circleProps = {
    cx: props.xScale(x[xAxis.key]),
    cy: props.yScale(x[yAxis.key]),
    r: 3,
    stroke: "black",
    strokeWidth: 1.1,
    fill: (x.disputeCode.length !== 0 ? 'rgb(255, 63, 63)' : 'rgb(63, 255, 160)')
  };

  const rectProps = {
    x: props.xScale(x[xAxis.key]) + xRectPadding,
    y: props.yScale(x[yAxis.key]) - yRectPadding,
    width: 190,
    height: (x.disputeCode.length !== 0 ? 40 : 30),
    fill: 'white',
    stroke: 'black'
  }

  const textProps = (rank) => ({
    x: props.xScale(x[xAxis.key]) + xTextPadding,
    y: props.yScale(x[yAxis.key]) - yTextPadding,
    dy: rank + 'em',
    fontSize: '11px'
  })

  return <g key={i} className={styles.circle}>
    <circle {...circleProps} />
    <g className={styles.tooltip}>
      <rect {...rectProps}></rect>
      <text {...textProps(1)}>{yAxis.label} {numberWithCommas(x[yAxis.key])}</text>
      <text {...textProps(2)}>{xAxis.label} {numberWithCommas(x[xAxis.key])}</text>
      {x.disputeCode.length &&
      <text {...textProps(3)}>Dispute codes: {x.disputeCode.reduce((str, x) => str += (x + '; '), '')}</text>
      }
    </g>
  </g>
};

export default (props) => <g>{ props.dataSet.data.map((x, i) => renderCircles(x, props, i)) }</g>