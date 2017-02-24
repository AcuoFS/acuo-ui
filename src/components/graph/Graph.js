import React from 'react'
import Axis from './sub-components/Axis'
import SubAxis from './sub-components/SubAxis'
import GraphBody from './sub-components/GraphBody'
import Pointer from './sub-components/Pointer'
import styles from './Graph.css'
import { getDate } from '../../utils'


export default class Graph extends React.Component {
  static get defaultProps() {
    const now = getDate()
    const time = [now.getHours(), (now.getMinutes() <10 ? '0' : ' ')  + now.getMinutes()]
    const currentTime = time.join(":")

    return {
      width: 1440,
      height: 460,
      now: now,
      time: currentTime
    }
  }
  constructor(props){
    super(props)
  }
  render() {
    return (
    <div className={styles.graphCont}>
      <svg viewBox="0 0 1440 460" preserveAspectRatio="xMaxYMax meet">
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
        <Pointer
          xrec={this.props.width * 0.5 -50} //670
          yrec={0}
          recwidth={(this.props.width-240) / 12} //100
          recheight={20}
          xtext={this.props.width * 0.5 - 17.5} //680
          ytext={15}
          triangle1={"710,20 730,20 720,30"}
          triangle2={"720,450 710,460 730,460"}
          color="#F91233"
          text= {this.props.time}
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
        />

      </svg>
      <div className={styles.moneyIcon + " " + styles.moneyOutIcon}>OUT</div>
      <div className={styles.moneyIcon + " " + styles.moneyInIcon}>IN</div>
    </div>
    )
  }
}
