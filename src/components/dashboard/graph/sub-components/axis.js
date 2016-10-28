import React from 'react';

export default class Axis extends React.Component {
  prepareCords() {
    let coords = {
      x1: this.props.x,
      y1: this.props.y
    }

    if(this.props.horizontal) {
      coords.x2 = coords.x1 + this.props.length;
      coords.y2 = coords.y1;
    } else {
      coords.x2 = coords.x1;
      coords.y2 = coords.y1 + this.props.length;
    }

    return coords;
  }

  render(i) {
    let coords = this.prepareCords();
    return (
      <svg>
        <line {...coords} stroke={this.props.stroke} strokeWidth={ this.props.stroke == "#F91233" ? 1 : 2} />
        <text x={coords.x2} y={coords.y1 + 0.5 } key={i} fontFamily="Verdana" fontSize="12">{this.props.text}</text>
      </svg>
    )
  }
}
