import React from 'react'
import ReactDOM from 'react-dom'
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
      width: 4320,
      height: 460,
      now: now,
      time: currentTime
    }
  }
  constructor(props){
    super(props)
    this.state = {
      isScrolling: false,
      scrollLeft: false
    }
  }

  componentWillUpdate = (nextProps, nextState) =>{
    if(this.state.isScrolling !== nextState.isScrolling ) {
      this.toggleScrolling(nextState.isScrolling)
    }
  }

  toggleScrolling = (isEnable) => {
    if (isEnable) {
      window.addEventListener('mousemove', this.onMouseMove)
      window.addEventListener('mouseup', this.onMouseUp)
    } else {
      window.removeEventListener('mousemove', this.onMouseMove)
      window.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  onMouseMove = (event) => {
    const {clientX, scrollLeft} = this.state
    this.setState({scrollLeft: this.checkBoundings(scrollLeft + ((clientX - event.clientX)*2.5)), clientX: event.clientX})
  }

  checkBoundings = (result) => {
    if(result > 2740)
      return 2740
    if(result < 0)
      return 0
    return result
  }

  onMouseUp = () => {
    this.setState({isScrolling: false,
      clientX: 0})
  }

  onMouseDown = (event) => {
    this.setState({isScrolling:true, clientX:event.clientX})
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.graphWrapper}>
        <div className={styles.graphCont}
             ref={
              (graphCont) => {
                if(graphCont && this.state.scrollLeft === false) this.setState({scrollLeft : 1440 - ((graphCont.getBoundingClientRect().width - 1440) / 2)})
                graphCont && (graphCont.scrollLeft = this.state.scrollLeft)
              }}
              onMouseDown={this.onMouseDown}>
          <svg viewBox="0 0 4320 460" preserveAspectRatio="xMidYMin slice"
               style={{'width': '4320px', 'paddingBottom': '455px', 'height': '1px', 'overflow': 'visible', 'userSelect': 'none', 'cursor': 'grab'}}>
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
        </div>
        <div className={styles.moneyIcon + " " + styles.moneyOutIcon}>OUT</div>
        <div className={styles.moneyIcon + " " + styles.moneyInIcon}>IN</div>
      </div>
    )
  }
}
