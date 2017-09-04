import React from 'react'

import styles from './Graph.css'
import { getDate } from '../../utils'
import SVGWrapper from './sub-components/SVGWrapper'


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

  scrollEvent = (event) => {
    this.setState({scrollLeft: event.currentTarget.scrollLeft})
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.graphWrapper}>
        <div className={styles.moneyIcon + ' ' + styles.moneyOut}>OUT</div>
        <div className={styles.graphCont}
             ref={
              (graphCont) => {
                if(graphCont && this.state.scrollLeft === false) this.setState({scrollLeft : 1440 - ((graphCont.getBoundingClientRect().width - 1440) / 2)})
                graphCont && (graphCont.scrollLeft = this.state.scrollLeft)
              }}
              onMouseDown={this.onMouseDown}
              onScroll={this.scrollEvent}>

          <SVGWrapper {...this.props}/>
        </div>
        <div className={styles.moneyIcon}>IN</div>
      </div>
    )
  }
}
