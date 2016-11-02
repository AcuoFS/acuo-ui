import React from 'react';

export default class SubAxis extends React.Component {

  generateSubAxis() {
    const random = []
    const texts = []
    const Time = []

    const then = new Date("2016-10-23T06:00:00.000Z")

    for(let i = -12; i <= 12; i++) {
      Time.push(new Date(Date.parse(then) + 3.6e+6 * i))
    }
    const Hours = Time.map((time) => time.getHours())

    for(let i = 0; i<=24; i++){
      let coords = {
        x1: this.props.x + 60 * i - 1 * then.getMinutes()
      }
      coords.x2 = coords.x1
        if(Hours[i]%3 == 0){
        coords.y1 = this.props.y - 5
        coords.y2 = coords.y1 + 15
        } else {
          coords.y1 = this.props.y + 2.5
          coords.y2 = coords.y1 + 7.5
        }

      let text

      random.push(<line key={i} {...coords} stroke={ i == 0 ? 'white' : '#9B9B9B'} strokeWidth={ Hours[i]%3 == 0? 2:1}/>)
      texts.push(<text x={coords.x1 - 5} y={coords.y1 + 30} key={i} fontFamily="helvetica" fontSize="13" stroke="#9B9B9B">
    { (i == 0 || Hours[i]%3 != 0) ? ' ' : Hours[i]}
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
