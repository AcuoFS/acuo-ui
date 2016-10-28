import React from 'react';

export default class GraphBody extends React.Component {

  prepareData() {

  }

  render() {
    return(
      <svg>
        <circle cx={this.props.x} cy={this.props.y} r="20" fill="#FFCD2D" stroke="black" strokeWidth="1" transform='translate(25 0)' />
        <circle cx={this.props.x} cy={this.props.y} r="20" fill="#FF7D26" stroke="black" strokeWidth="1" transform='translate(25 45)'/>
        <circle cx={this.props.x} cy={this.props.y} r="20" fill="#26DA6E" stroke="black" strokeWidth="1" transform='translate(25 90)'/>
        <circle cx={this.props.x} cy={this.props.y} r="20" fill="#58B6FF" stroke="black" strokeWidth="1" transform='translate(25 135)'/>
        <circle cx={this.props.x} cy={this.props.y} r="20" fill="#FF1E25" stroke="black" strokeWidth="1" transform='translate(25 180)'/>
      </svg>
    )
  }
}
