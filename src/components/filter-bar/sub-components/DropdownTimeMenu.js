import React from 'react'
import styles from '../FilterBar.css'

export default class DropdownTimeMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      timeWindowTitle: 'today',
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
          })
        )

      case 'tomorrow':
        return (
          this.setState({
            timeWindowTitle: 'tomorrow',
          })
        )

      default:
        return (
          this.setState({
            timeWindowTitle: 'today',
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

  onMenuOptionSelect(handleOnOptionChange, minTime, maxTime, string) {
    handleOnOptionChange(this.state.timeWindowTitle + ": " + string, minTime, maxTime)
  }

  checkShow(day, stateDay) {
    if (day == stateDay)
      return styles.timeShow
    else
      return ''
  }

  checkTimesList(obj) {
    if (obj)
      if (obj.times.length)
        return styles.show
      else
        return styles.hide
    else return styles.hide
  }

  render() {
    const {handleOnOptionChange, options} = this.props
    // merge option 'ALL', with actual options
    const optionList = options

    return (
      <div>
        {optionList.map((option, index) => {

          if (option.times.length > 0)
            return (
              <ul key={index}
                  className={styles.filtersList + ' ' + styles.timeSlot + ' ' + this.checkShow(option.day, this.state.timeWindowTitle)}>

                <li className={styles.timeTitle} onClick={this.preventClose}>
                  <div className={styles.timeArrowLeft + ' ' + this.checkTimesList(optionList[index - 1])}
                       onClick={this.renderPrevDay}></div>
                  <span>{this.state.timeWindowTitle}</span>
                  <div className={styles.timeArrowRight + ' ' + this.checkTimesList(optionList[index + 1])}
                       onClick={this.renderNextDay}></div>
                </li>

                <li
                  onClick={ e => this.onMenuOptionSelect(handleOnOptionChange, option.minTime, option.maxTime, 'All')}>
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