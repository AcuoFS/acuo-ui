import React from 'react'
import styles from '../FilterBar.css'

export default class DropdownTimeMenu extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      timeWindowTitle: 'today',
      timeArrowLeft: styles.show,
      timeArrowRight: styles.show
    }
    this.renderPrevDay = this.renderPrevDay.bind(this)
    this.renderNextDay = this.renderNextDay.bind(this)
    this.preventClose = this.preventClose.bind(this)
    this.onMenuOptionSelect = this.onMenuOptionSelect.bind(this)
  }

  checkTimeDay() {
    switch (this.state.timeWindowTitle) {
      case 'yesterday':
        return (
          this.setState({
            timeWindowTitle: 'yesterday',
            timeArrowLeft: styles.hide,
            timeArrowRight: styles.show
          })
        )

      case 'tomorrow':
        return (
          this.setState({
            timeWindowTitle: 'tomorrow',
            timeArrowLeft: styles.show,
            timeArrowRight: styles.hide
          })
        )

      default:
        return (
          this.setState({
            timeWindowTitle: 'today',
            timeArrowLeft: styles.show,
            timeArrowRight: styles.show
          })
        )
    }
  }

  renderPrevDay() {
    if (this.state.timeWindowTitle == 'today') {
      this.state.timeWindowTitle = 'yesterday'
    } else {
      this.state.timeWindowTitle = 'today'
    }
    this.checkTimeDay()
  }

  renderNextDay() {
    if (this.state.timeWindowTitle == 'today') {
      this.state.timeWindowTitle = 'tomorrow'
    } else {
      this.state.timeWindowTitle = 'today'
    }
    this.checkTimeDay()
  }

  preventClose(e) {
    return e.stopPropagation()
  }

  onMenuOptionSelect(handleOnOptionChange, minTime, maxTime, string){

    // let currTime = new Date('2017-01-13T08:00:00.000Z')
    // if (e.currentTarget.dataset.min == 'All') {
    //   handleOnOptionChange(e,
    //     this.state.timeWindowTitle + ": " + e.currentTarget.dataset.min,
    //     this.state.timeWindowTitle + ":" + e.currentTarget.dataset.min,
    //     null)
    // }
    // else {
    //   if (this.state.timeWindowTitle == 'yesterday') currTime.setDate(currTime.getDate() - 1)
    //   else if (this.state.timeWindowTitle == 'tomorrow') currTime.setDate(currTime.getDate() + 1)
    //   let minTimeRange = new Date(currTime.setHours(e.currentTarget.dataset.min, 0, 0))
    //   let maxTimeRange = new Date(currTime.setHours(e.currentTarget.dataset.max, 0, 0))

      handleOnOptionChange(this.state.timeWindowTitle + ": " + string, minTime, maxTime)
    //}
  }

  checkShow(day, stateDay){
    if(day == stateDay)
      return styles.timeShow
    else
      return ''
  }

  render(){
    const {handleOnOptionChange, options} = this.props
    // merge option 'ALL', with actual options
    const optionList = options

    return(
      <div>
      {optionList.map((option, index) => {

        if(option.times.length > 0)
          return (<ul key={index} className={styles.filtersList + ' ' + styles.timeSlot + ' ' + this.checkShow(option.day, this.state.timeWindowTitle)}>

            <li className={styles.timeTitle} onClick={this.preventClose}>
              <div className={styles.timeArrowLeft + ' ' + this.state.timeArrowLeft} onClick={this.renderPrevDay}></div>
              <span>{this.state.timeWindowTitle}</span>
              <div className={styles.timeArrowRight + ' ' + this.state.timeArrowRight} onClick={this.renderNextDay}></div>
            </li>

            <li onClick={ e => this.onMenuOptionSelect(handleOnOptionChange, option.minTime, option.maxTime, 'All')}>
              All
            </li>

            {option.times.map((time, index) => (
              <li key={index}
                  onClick={ e => this.onMenuOptionSelect(handleOnOptionChange, time.min, time.max, String((new Date(time.min)).getHours() + ':00 Hrs').toUpperCase())}>
                {String((new Date(time.min)).getHours() + ':00 Hrs').toUpperCase()}
              </li>
            ))}
          </ul>)

      })}
      </div>
    )
  }
}