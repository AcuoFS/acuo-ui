/**
 * Created by Rui on 18/8/17.
 */

import React from 'react'

const renderCircles = (x, props, i) => {
    const circleProps = {
      cx: props.xScale(x.counterpartyAllegation),
      cy: props.yScale(x.clientAllegation),
      r: 3,
      key: i,
      stroke: "black",
      strokeWidth: 1.1,
      fill: (x.disputeCode.length !== 0 ? 'rgb(255, 63, 63)' : 'rgb(63, 255, 160)')
    };
    return <circle {...circleProps} />;
};

export default (props) => <g>{ props.data.data.map((x, i) => renderCircles(x, props, i)) }</g>