import React from 'react'
import styles from '../FilterBar.css'

export default class DropdownTimeMenu extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      timeWindowTitle: 'Today',
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
      case 'Yesterday':
        return (
          this.setState({
            timeWindowTitle: 'Yesterday',
            timeArrowLeft: styles.hide,
            timeArrowRight: styles.show
          })
        )

      case 'Tomorrow':
        return (
          this.setState({
            timeWindowTitle: 'Tomorrow',
            timeArrowLeft: styles.show,
            timeArrowRight: styles.hide
          })
        )

      default:
        return (
          this.setState({
            timeWindowTitle: 'Today',
            timeArrowLeft: styles.show,
            timeArrowRight: styles.show
          })
        )
    }
  }

  renderPrevDay() {
    if (this.state.timeWindowTitle == 'Today') {
      this.state.timeWindowTitle = 'Yesterday'
    } else {
      this.state.timeWindowTitle = 'Today'
    }
    this.checkTimeDay()
  }

  renderNextDay() {
    if (this.state.timeWindowTitle == 'Today') {
      this.state.timeWindowTitle = 'Tomorrow'
    } else {
      this.state.timeWindowTitle = 'Today'
    }
    this.checkTimeDay()
  }

  preventClose(e) {
    return e.stopPropagation()
  }

  onMenuOptionSelect(e, handleOnOptionChange){

    let currTime = new Date('Sun Oct 23 2016 13:58:04 GMT+0800 (SGT)')
    if (e.currentTarget.dataset.min == 'All') {
      handleOnOptionChange(e,
        this.state.timeWindowTitle + ": " + e.currentTarget.dataset.min,
        this.state.timeWindowTitle + ":" + e.currentTarget.dataset.min,
        null)
    }
    else {
      if (this.state.timeWindowTitle == 'Yesterday') currTime.setDate(currTime.getDate() - 1)
      else if (this.state.timeWindowTitle == 'Tomorrow') currTime.setDate(currTime.getDate() + 1)
      let minTimeRange = new Date(currTime.setHours(e.currentTarget.dataset.min, 0, 0))
      let maxTimeRange = new Date(currTime.setHours(e.currentTarget.dataset.max, 0, 0))

      handleOnOptionChange(e, this.state.timeWindowTitle + ": " + e.currentTarget.dataset.ref, minTimeRange, maxTimeRange)
    }
  }

  render(){
    const {handleOnOptionChange, options} = this.props
    // merge option 'ALL', with actual options
    const optionList = options

    return(
      <ul className={styles.filtersList + ' ' + styles.timeSlot}>

        <li className={styles.timeTitle} onClick={this.preventClose}>
          <div className={styles.timeArrowLeft + ' ' + this.state.timeArrowLeft} onClick={this.renderPrevDay}></div>
          <span>{this.state.timeWindowTitle}</span>
          <div className={styles.timeArrowRight + ' ' + this.state.timeArrowRight} onClick={this.renderNextDay}></div>
        </li>

        {optionList.map(option => (
          <li key={option.text}
              data-ref={option.text}
              data-min={option.min}
              data-max={option.max}
              onClick={ e => this.onMenuOptionSelect(e, handleOnOptionChange)}>
            {String(option.text).toUpperCase()}
          </li>
        ))}
      </ul>
    )
  }
}