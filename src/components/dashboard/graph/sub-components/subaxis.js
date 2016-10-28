import React from 'react';

export default class SubAxis extends React.Component {

  generateSubAxis() {
    const random = []
    const texts = []
    const Time = []

    const now = new Date()
    const then = new Date("2016-10-23T18:00:00.000Z")

    for(let i = -12; i <= 12; i++) {
      Time.push(new Date(Date.parse(now) + 3.6e+6 * i))
    }
    const Hours = Time.map((time) => time.getHours())
    // console.log(Time)

    for(let i = 0; i<=24; i++){
      let coords = {
        x1: this.props.x + 50 * i - 0.8333 * now.getMinutes(),
        y1: this.props.y
      }
      coords.x2 = coords.x1
      coords.y2 = coords.y1 + 25
      let text

      random.push(<line key={i} {...coords} stroke={ i == 0 ? 'white' : "#9B9B9B"} strokeWidth={2}/>)
      texts.push(<text x={coords.x1 - 5} y={coords.y1 + 40} key={i} fontFamily="Verdana" fontSize="8">
    { i == 0 ? ' ' : Hours[i]}
  </text>)

    }
    return <svg>{random}{texts}</svg>
  }
  render() {
    return (
        this.generateSubAxis()
    )
  }
}
