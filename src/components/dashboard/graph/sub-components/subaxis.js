import React from 'react';

export default class SubAxis extends React.Component {

  generateSubAxis() {
    const random = []
    const texts = []
    for(let i = 0; i<=24; i++){
      let coords = {
        x1: this.props.x + 50 * i,
        y1: this.props.y
      }
      coords.x2 = coords.x1
      coords.y2 = coords.y1 + 25
      let text

      random.push(<line key={i} {...coords} stroke="black" strokeWidth={2} />)
      texts.push(<text x={coords.x1 - 5} y={coords.y1 + 40} key={i} fontFamily="Verdana" fontSize="8">
    {i}
  </text>)
      // this.prepareCords(coords)

    }
    console.log(random)
    console.log(texts)
    return <svg>{random}{texts}</svg>
  }
  render() {
    // let coords = this.prepareCords();
    return (
        this.generateSubAxis()
      // <line {...coords} stroke="black" strokeWidth={1} />
    )
  }
}
