/**
 * Created by achalkagwad on 28/10/16.
 */
import React from 'react';


export default class Pointer extends React.Component {

    render(){
        return(
            <g >
                <rect x={this.props.xrec} y={this.props.yrec} width={this.props.recwidth} height={this.props.recheight} rx="3" ry="3" fill={this.props.color}    />
                <polygon points={this.props.triangle1} fill={this.props.color} />
                <text x={this.props.xtext} y={this.props.ytext} fill="white" fontFamily="helvetica" fontSize="13">{this.props.text == "12:00" ? "NOON" : this.props.text}</text>
                <polygon points={this.props.triangle2} fill={this.props.color} />
            </g>
        )
    }
}
