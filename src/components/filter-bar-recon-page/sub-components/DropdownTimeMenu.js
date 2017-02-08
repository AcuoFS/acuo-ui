import React from 'react'
import _ from 'lodash'
import clearTime from '../../../utils/clearTime'
import styles from '../FilterBar.css'

export default class DropdownTimeMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMenu: 'today',

      // today's date can be hacked
      // during development, the data from backend is all 2017-01-13
      today: new Date("2017-01-13T08:00:00.000Z"),
      // this should be the real config if backend data is correct
      // today: new Date(),
    }

    this.setCurrentMenu = this.setCurrentMenu.bind(this)
    this.select = this.select.bind(this)
  }

  select(selected) {
    this.props.handleOnSelectChange(selected)
  }

  setCurrentMenu(menu) {
    this.setState(state => _.set(state, 'currentMenu', menu))
  }

  // if this menu is shown, yesterdaySlots MUST NOT be empty
  yesterdayMenu(yesterdaySlots, todaySlots, tomorrowSlots) {
    const day = _.toUpper('yesterday')

    return (
    <ul className={styles.filtersList + ' ' + styles.center}>
      <li className={styles.timeTitle} onClick={e => e.stopPropagation()}>
        <span>{day}</span>
        <div className={styles.timeArrowRight}
             onClick={e => {e.stopPropagation()
                            this.setCurrentMenu('today')}}></div>
      </li>

      <li onClick={() => this.select({
                           label: day + ': ALL',
                           value: yesterdaySlots[0].getTime(),
                           type: 'sameDay',
                         })}>
        ALL
      </li>

      {yesterdaySlots.map(time => (
        <li key={time.getTime()}
            onClick={() => this.select({
              label: day +': ' + time.getHours() + ':00 HRS',
              value: time.getTime(),
            })}>
          {time.getHours()}:00 HRS
        </li>
      ))}
    </ul>
    )
  }

  // it MIGHT BE empty for todaySlots, it will be shown as the entry point
  todayMenu(yesterdaySlots, todaySlots, tomorrowSlots) {
    const day = _.toUpper('today')

    return (
    <ul className={styles.filtersList + ' ' + styles.center}>
      <li className={styles.timeTitle} onClick={e => e.stopPropagation()}>
        {(yesterdaySlots.length > 0)
         &&
         <div className={styles.timeArrowLeft}
              onClick={e => {e.stopPropagation()
                            this.setCurrentMenu('yesterday')}}></div>}
        <span>{day}</span>
        {(tomorrowSlots.length > 0)
         &&
         <div className={styles.timeArrowRight}
              onClick={e => {e.stopPropagation()
                            this.setCurrentMenu('tomorrow')}}></div>}
      </li>

      {(todaySlots.length > 0)
       &&
       <li onClick={() => this.select({
             label: day + ': ALL',
             value: todaySlots[0].getTime(),
             type: 'sameDay',
           })}>
        ALL
      </li>}

      {todaySlots.map(time => (
        <li key={time.getTime()}
            onClick={() => this.select({
              label: day +': ' + time.getHours() + ':00 HRS',
              value: time.getTime(),
            })}>
          {time.getHours()}:00 HRS
        </li>
      ))}
    </ul>
    )
  }

  // if this menu is shown, tomorrowSlots MUST NOT be empty
  tomorrowMenu(yesterdaySlots, todaySlots, tomorrowSlots) {
    const day = _.toUpper('tomorrow')

    return (
    <ul className={styles.filtersList + ' ' + styles.center}>
      <li className={styles.timeTitle} onClick={e => e.stopPropagation()}>
        <div className={styles.timeArrowLeft}
             onClick={e => {e.stopPropagation()
                            this.setCurrentMenu('today')}}></div>
        <span>{day}</span>
      </li>

      <li onClick={() => this.select({
                           label: day + ': ALL',
                           value: tomorrowSlots[0].getTime(),
                           type: 'sameDay',
                         })}>
        ALL
      </li>

      {tomorrowSlots.map(time => (
        <li key={time.getTime()}
            onClick={() => this.select({
              label: day +': ' + time.getHours() + ':00 HRS',
              value: time.getTime(),
            })}>
          {time.getHours()}:00 HRS
        </li>
      ))}
    </ul>
    )
  }

  render() {
    const { options } = this.props
    const { today } = this.state
    const optionsInDate = _.map(options, o => new Date(o))

    const yesterdaySlots = _.sortBy(filterDates(optionsInDate, this.state.today, -1))
    const todaySlots     = _.sortBy(filterDates(optionsInDate, this.state.today))
    const tomorrowSlots  = _.sortBy(filterDates(optionsInDate, this.state.today, 1))

    let menu
    switch (this.state.currentMenu) {
      case 'yesterday':
        menu = this.yesterdayMenu(yesterdaySlots, todaySlots, tomorrowSlots)
        break

      case 'tomorrow':
        menu = this.tomorrowMenu(yesterdaySlots, todaySlots, tomorrowSlots)
        break

      default:
        menu = this.todayMenu(yesterdaySlots, todaySlots, tomorrowSlots)
    }

    return <div>{menu}</div>
  }
}


/*
 offset will be 0: (today),
               -1: (yesterday)
                1: (tomorrow)
    d-1     d     d+1    d+2
-----*------*------*------*-------
     |      |      |      |
     |      |      |      |
     |y'day |today |t'rrow|
     |-1    |0     |1     |
*/
const filterDates = (dates, baseDate, offset = 0) => {
  const oneDayTime = 24 * 60 * 60 * 1000

  // create critical points
  const d = clearTime(baseDate)
  const dMinusOne = new Date(d.getTime() - oneDayTime)
  const dPlusOne = new Date(d.getTime() + oneDayTime)
  const dPlusTwo = new Date(d.getTime() + 2 * oneDayTime)

  switch (offset) {
    // yesterday [d-1, d)
    case -1:
      return _.filter(dates, date => (
        _.inRange(date.getTime(), dMinusOne.getTime(), d.getTime())
      ))

    // tomorrow [d, d+1)
    case 1:
      return _.filter(dates, date => (
        _.inRange(date.getTime(), dPlusOne.getTime(), dPlusTwo.getTime())
      ))

    // today [d+1, d+2)
    default:
      return _.filter(dates, date => (
        _.inRange(date.getTime(), d.getTime(), dPlusOne.getTime())
      ))
  }
}
