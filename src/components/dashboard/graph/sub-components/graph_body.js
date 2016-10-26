import React from 'react';

export default class GraphBody extends React.Component {

  prepareData() {

  }

  render() {
    return(
      <svg>
        <circle cx={this.props.x} cy={this.props.y} r="20" fill="gold" stroke="black" strokeWidth="1" transform='translate(25 0)' />
        <circle cx={this.props.x} cy={this.props.y} r="30" fill="gold" stroke="black" strokeWidth="1" transform='translate(25 45)'/>
        <circle cx={this.props.x} cy={this.props.y} r="20" fill="gold" stroke="black" strokeWidth="1" transform='translate(25 90)'/>
        <circle cx={this.props.x} cy={this.props.y} r="20" fill="gold" stroke="black" strokeWidth="1" transform='translate(25 135)'/>
        <circle cx={this.props.x} cy={this.props.y} r="20" fill="gold" stroke="black" strokeWidth="1" transform='translate(25 180)'/>
      </svg>
    )
  }
}
