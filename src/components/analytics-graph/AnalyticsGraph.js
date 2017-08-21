/**
 * Created by Rui on 16/8/17.
 */

import React from 'react'
import * as d3 from 'd3'

import data from './sub-components/data.json'
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
//
// const xAxis = (xPadding, leftPan, w) => d3.axisBottom()
//   .scale(xScale(xPadding, leftPan, w))
//   .ticks(5)
//
// const yAxis = (yPadding, h) => d3.axisLeft()
//   .scale(yScale(yPadding, h))
//   .ticks(5)

// var max_x = d3.max(dataset.data, function (d) {
//     return d.counterpartyAllegation;
//   }),
//   max_y = d3.max(dataset.data, function (d) {
//     return d.clientAllegation;
//   }),
//   max_t = function (a, b) {
//     if (a > b) {
//       return a;
//     }
//     else {
//       return b;
//     }
//   };
//
// var xScale = d3.scaleLinear()
//   .domain([0, max_t(max_x, max_y)])
//   .range([xPadding + leftPan, w - xPadding]);
//
// var yScale = d3.scaleLinear()
//   .domain([0, max_t(max_x, max_y)])
//   .range([h - yPadding, yPadding]);
//
// var xAxis = d3.axisBottom()
//   .scale(xScale)
//   .ticks(5)
//
// var yAxis = d3.axisLeft()
//   .scale(yScale)
//   .ticks(5)

class AnalyticsGraphComponent extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      data: [
        {
          "id": 0,
          "clientAllegation": 978.85,
          "counterpartyAllegation": 697.96,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 1,
          "clientAllegation": 390.33,
          "counterpartyAllegation": 114.57,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 2,
          "clientAllegation": 517.72,
          "counterpartyAllegation": 552.3,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 3,
          "clientAllegation": 412.06,
          "counterpartyAllegation": 507.18,
          "disputed": 0,
          "disputeCode": []
        },
        {
          "id": 4,
          "clientAllegation": 425.32,
          "counterpartyAllegation": 102.65,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 5,
          "clientAllegation": 461.98,
          "counterpartyAllegation": 124.38,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 6,
          "clientAllegation": 211.79,
          "counterpartyAllegation": 716.68,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 7,
          "clientAllegation": 443.13,
          "counterpartyAllegation": 181.6,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 8,
          "clientAllegation": 111.97,
          "counterpartyAllegation": 897.65,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 9,
          "clientAllegation": 111.37,
          "counterpartyAllegation": 102.69,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 10,
          "clientAllegation": 638.3,
          "counterpartyAllegation": 673.94,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 11,
          "clientAllegation": 796.62,
          "counterpartyAllegation": 208.56,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 12,
          "clientAllegation": 397.38,
          "counterpartyAllegation": 570.13,
          "disputed": 0,
          "disputeCode": []
        },
        {
          "id": 13,
          "clientAllegation": 893.36,
          "counterpartyAllegation": 177.18,
          "disputed": 0,
          "disputeCode": []
        },
        {
          "id": 14,
          "clientAllegation": 194.03,
          "counterpartyAllegation": 546.49,
          "disputed": 0,
          "disputeCode": []
        },
        {
          "id": 15,
          "clientAllegation": 918.02,
          "counterpartyAllegation": 939.83,
          "disputed": 0,
          "disputeCode": []
        },
        {
          "id": 16,
          "clientAllegation": 493.85,
          "counterpartyAllegation": 833.99,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 17,
          "clientAllegation": 413.44,
          "counterpartyAllegation": 628.81,
          "disputed": 0,
          "disputeCode": []
        },
        {
          "id": 18,
          "clientAllegation": 178.55,
          "counterpartyAllegation": 576.63,
          "disputed": 1,
          "disputeCode": [
            9001,
            9002
          ]
        },
        {
          "id": 19,
          "clientAllegation": 286.67,
          "counterpartyAllegation": 206.85,
          "disputed": 0,
          "disputeCode": []
        }
      ]
    }
  }

  drawgraph(dataset) {

    // var xPadding = 50;
    // var yPadding = 50;
    // var circ = 3;
    // var numDataPoints = 20
    // var xRectPadding = 10
    // var yRectPadding = 20
    // var xTextPadding = 20
    // var yTextPadding = 50

    var title = d3.select('body')
      .append('h2')
      .text('Margin requirement allegations (in millions of dollars)')
    /*						  .style('text-align', 'center') */

    // var svg = d3.select('body').append('svg')
    //   .attr('width', w + cheat)
    //   .attr('height', h);




    // svg.append('g')
    //   .attr('class', 'axis')
    //   .attr("transform", "translate(0," + (h - xPadding) + ")")
    //   .call(xAxis);
    //
    // svg.append('g')
    //   .attr('class', 'axis')
    //   .attr("transform", "translate(" + (leftPan + yPadding) + ",0)")
    //   .call(yAxis);
    //
    // svg.append("text")
    //   .attr("y", h - yPadding / 4)
    //   .attr("x", leftPan + (w - leftPan) / 2)
    //   .attr("font-size", 16)
    //   .style("text-anchor", "middle")
    //   .text("Counterpart estimation");
    //
    //

    //


    // var circles = svg.selectAll('circle')
    //   .data(dataset.data)
    //   .enter()
    //   .append('circle')
    //   .attr('cx', function (d) {
    //     return xScale(d.counterpartyAllegation);
    //   })
    //   .attr('cy', function (d) {
    //     return yScale(d.clientAllegation);
    //   })
    //   .attr('r', circ)
    //   .attr('fill', function (d) {
    //     if (d.disputeCode.length !== 0) {
    //       return 'rgb(255, 63, 63)'
    //     }
    //     else {
    //       return 'rgb(63, 255, 160)'
    //     }
    //   })
    //   .attr('stroke', 'black')
    //   .attr('stroke-width', 1.1);

    function id_func(d) {
      return d.id;
    };

    function showDispute(id) {
      var filtered = dataset.data.filter(function (d) {
        return d.id === id;
      });

      var square = svg.selectAll('rect')
        .data(filtered, id_func)
        .enter()
        .insert('rect')
        .attr('x', function (d) {
          return xScale(d.counterpartyAllegation + xRectPadding);
        })
        .attr('y', function (d) {
          return yScale(d.clientAllegation - yRectPadding);
        })
        .attr('width', 190)
        .attr('height', function (d) {
          if (d.disputeCode.length !== 0) {
            return 40;
          }
          else {
            return 30;
          }
        })
        .attr('fill', 'white')
        .attr('stroke', 'black');

      function add_line(string, rank) {
        svg.select('text.textQuadrant')
          .append('tspan')
          .attr('x', function (d) {
            return xScale(d.counterpartyAllegation + xTextPadding);
          })
          .attr('y', function (d) {
            return yScale(d.clientAllegation - yTextPadding);
          })
          .attr("dy", function () {
            return rank + "em";
          })
          .text(string);
      }

      var init = svg.selectAll('text.textQuadrant')
        .data(filtered, id_func)
        .enter()
        .append('text')
        .attr('class', 'textQuadrant')
        .attr('font-size', '11px')

      add_line(function (d) {
        return 'ACUO estimation ' + d.clientAllegation;
      }, 0)

      add_line(function (d) {
        return 'Counterparty estimation ' + d.counterpartyAllegation;
      }, 1)

      if (filtered[0].disputeCode.length !== 0) {
        var disputeCodeString = 'Dispute codes : '
        for (let i = 0; i < filtered[0].disputeCode.length; i++) {
          disputeCodeString += filtered[0].disputeCode[i] + ', '
        }
        add_line(disputeCodeString.substr(0, disputeCodeString.length - 2), 2)
      }

    }

    circles.on('mouseover', function (d) {

      d3.select(this)
        .transition()
        .duration(500)
        .style('stroke-width', 1.3)
        .attr('r', circ + 0.8)

      showDispute(d.id)

    })

    circles.on('mouseout', function (d) {

      d3.select(this)
        .transition()
        .duration(500)
        .style('stroke-width', 1.1)
        .attr('r', circ);

      d3.select('text.textQuadrant')
        .remove();

      d3.select('rect')
        .remove()

    })

  }

  render() {
    const
      margin = {top: 20, right: 20, bottom: 20, left: 20},
      leftPan = 0,
      w = 600 + leftPan - margin.left - margin.right,
      cheat = 200,
      h = 600 - margin.top - margin.bottom;

    var xPadding = 50;
    var yPadding = 50;
    var circ = 3;
    var numDataPoints = 20
    var xRectPadding = 10
    var yRectPadding = 20
    var xTextPadding = 20
    var yTextPadding = 50

    const scales = { xScale: xScale(xPadding, leftPan, w, data), yScale: yScale(yPadding, h, data) }

    const lineSettings = {
      x1: scales.xScale(0),
      y1: scales.yScale(0),
      x2: scales.xScale(max_t(max_x(data), max_y(data))),
      y2: scales.yScale(max_t(max_x(data), max_y(data))),
      stroke: "black",
      strokeWidth: 1.2
    }

    const xAxisLabel = {
      y:  h - yPadding / 4,
      x: leftPan + (w - leftPan) / 2,
      style:{
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


    // svg.append("text")
    // /*			   .attr('transform', "rotate("+(height/2)+")deg)")*/
    //   .attr('transform', 'rotate(-90)')
    //   .attr("y", leftPan + yPadding / 4)
    //   .attr("x", -(h) / 2)
    //   .attr("font-size", 16)
    //   .style("text-anchor", "middle")
    //   .text("ACUO estimation");

    // svg.append("text")
    //   .attr("y", h - yPadding / 4)
    //   .attr("x", leftPan + (w - leftPan) / 2)
    //   .attr("font-size", 16)
    //   .style("text-anchor", "middle")
    //   .text("Counterpart estimation");
    //

    return (
      <svg height={h} width={w + cheat}>
        <Axes />
        <Circles {...scales} data={data} />
        <line {...lineSettings} />
        <text {...xAxisLabel}>Counterpart estimation</text>
        <text {...yAxisLabel}>ACUO estimation</text>

        {/*svg.append("text")*/}
        {/*.attr("y", h - yPadding / 4)*/}
        {/*.attr("x", leftPan + (w - leftPan) / 2)*/}
        {/*.attr("font-size", 16)*/}
        {/*.style("text-anchor", "middle")*/}
        {/*.text("Counterpart estimation");*/}

        {/*svg.append("text")*/}
        {/*/*			   .attr('transform', "rotate("+(height/2)+")deg)")*/}
        {/*.attr('transform', 'rotate(-90)')*/}
        {/*.attr("y", leftPan + yPadding / 4)*/}
        {/*.attr("x", -(h) / 2)*/}
        {/*.attr("font-size", 16)*/}
        {/*.style("text-anchor", "middle")*/}
        {/*.text("ACUO estimation");*/}

        {/*svg.append("line")*/}
        {/*.attr("x1", xScale(0))*/}
        {/*.attr("y1", yScale(0))*/}
        {/*.attr("x2", xScale(max_t(max_x, max_y)))*/}
        {/*.attr("y2", yScale(max_t(max_x, max_y)))*/}
        {/*.attr("stroke", "black")*/}
        {/*.attr("stroke-width", 1.2);*/}
      </svg>
    )
  }

}

export default AnalyticsGraphComponent