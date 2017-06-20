/**
 * Created by Rui on 7/6/17.
 */
import React from 'react'
import Axis from './Axis'
import SubAxis from './SubAxis'
import GraphBody from './GraphBody'
import Pointer from './Pointer'
import _ from 'lodash'

class SVGWrapper extends React.Component{
  shouldComponentUpdate(nextProps){
    return !_.isEqual(this.props.derivatives.toJS(), nextProps.derivatives.toJS())
  }

  render() {
    return (
      <svg viewBox="0 0 4320 460" preserveAspectRatio="xMidYMin slice"
           style={{'width': '4320px',
                   'paddingBottom': '10px',
                   'height': '100%',
                   'overflow': 'hidden',
                   'userSelect': 'none',
                   'cursor': 'grab',

                  }}>
        {/*<svg viewBox="0 0 1440 460" preserveAspectRatio="xMaxYMax meet">*/}
        <Axis
          x={0}
          y={this.props.height * 0.5}
          length={this.props.width}
          horizontal={true}
          stroke={"#9B9B9B" }
        />
        <Axis
          x={this.props.width * 0.5}
          y={0}
          length={this.props.height}
          horizontal={false}
          stroke="#F91233"
        />

        <SubAxis
          x={0}
          y={this.props.height * 0.5 - 10}
          length={this.props.width }
        />
        <GraphBody
          x={this.props.width * 0.5}
          y={this.props.height * 0.5}
          time={this.props.now}
          data={this.props.derivatives}
          onUnreconBubbleClick={this.props.onUnreconBubbleClick}
          onReconBubbleClick={this.props.onReconBubbleClick}
        />
        <Pointer
          xrec={this.props.width * 0.5 -50} //670
          yrec={0}
          recwidth={((this.props.width / 3)-240) / 12} //100
          recheight={20}
          xtext={this.props.width * 0.5 - 17.5} //680
          ytext={15}
          triangle1={"2150,20 2170,20 2160,30"}
          triangle2={"2160,450 2150,460 2170,460"}
          color="#F91233"
          text= {this.props.time}
        />
      </svg>
    )
  }
}

export default SVGWrapper
