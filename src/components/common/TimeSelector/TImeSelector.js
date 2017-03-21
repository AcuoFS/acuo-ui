import React, {PropTypes} from 'react'
import styles from './TimeSelector.css'
import { getDate } from '../../../utils'

export default class TimeSelector extends React.Component{
  constructor(props){
    super(props)
    const date = getDate()

    this.state = {
      hrs: date.getHours(),
      mins: date.getMinutes()
    }
  }

  pad(s, size) {
    while (String(s).length < (size || 2)) {s = "0" + s}
    return s
  }

  hourChange(val, updateHour){
    const hrs = parseInt(val)
    if(hrs <= 24 && hrs >= 0)
      this.setState({
       hrs: hrs
      })
    else if(hrs > 24)
      this.setState({
        hrs: 24
      })
    else if(hrs < 0)
      this.setState({
        hrs: 0
      })

    updateHour(hrs)
  }

  minChange(val, updateMin){
    const mins = parseInt(val)
    if(mins <= 59 && mins >= 0)
      this.setState({
        mins: mins
      })
    else if(mins > 59)
      this.setState({
        mins: 59
      })
    else if(mins < 0)
      this.setState({
        mins: 0
      })

    updateMin(mins)
  }

  reset(){
    const date = getDate()

    this.setState({
      hrs: date.getHours(),
      mins: date.getMinutes()
    })
  }

  render(){

    const {
      updateHour,
      updateMin
    } = this.props

    return (
      <div className={styles.timeSelector}>
        <input type="number" value={this.pad(this.state.hrs, 2)} onChange={(e) => this.hourChange(e.target.value, updateHour)} /> : <input type="number" value={this.pad(this.state.mins, 2)} onChange={(e) => this.minChange(e.target.value, updateMin)}/><br/>
        <div className={styles.clear} onClick={() => this.reset()}>clear</div>
      </div>
    )
  }
}

TimeSelector.PropTypes = {
  updateHour: PropTypes.func.isRequired,
  updateMin: PropTypes.func.isRequired
}