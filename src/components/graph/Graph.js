import React from 'react'
import { cloneDeep, map } from 'lodash'

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
      scrollLeft: false,
      open: false
    }

    this.toggle = this.toggle.bind(this)
    this.leaveToggle = this.leaveToggle.bind(this)

  }

  leaveToggle() {
    this.setState({
      open: false
    })
  }

  toggle(){
    this.setState({
      open: !this.state.open
    })
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
    console.log('scroll event')
    console.log(cloneDeep(this.state.scrollLeft))
    this.setState({scrollLeft: event.currentTarget.scrollLeft})
    console.log(cloneDeep(this.state.scrollLeft))
  }

  componentDidMount() {
  }

  render() {
    // console.log(this.props.currency)
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
        <div className={styles.currencySelector} onClick={this.toggle} onMouseLeave={this.leaveToggle}>
          {this.props.selectedCurrency}
          <div className={styles.list + ' ' + (this.state.open ? styles.show : '')}>
            { this.state.open && map(this.props.currency,
              (x, i) => <div key={i} className={styles.listItem} onClick={() => this.props.onUpdateSelectedCurrency(x.ccy)}>
                {x.ccy}
              </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
