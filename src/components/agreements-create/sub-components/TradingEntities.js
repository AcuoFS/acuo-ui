import React from 'react'
import Dropdown from '../../Dropdown/Dropdown'
import moment from 'moment'
import {formatDate} from '../../../utils'
import styles from './ContentBody.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import '../../../static/react-datepicker/react-datepicker.css'


class TradingEntities extends React.Component {
  constructor(props){
    super(props)
    // console.log((new Date()).getTime())
    this.state = {
      activeDate: moment()
    }

    this.changeDate = this.changeDate.bind(this)
    this.textboxClick = this.textboxClick.bind(this)
  }

  changeDate = (date) => this.setState({
    activeDate: date
  })

  textboxClick = (e) => this.refs.datepicker.setOpen(e)

  render() {
    const props = this.props

    const toggleDropDown = (e) => {
    }

    const onDropdownItemChange = (e) => {
    }

    return <div className={props.propIsDisplay ? styles.createContent : styles.hideForm}>
      <div className={styles.rowGroup}>
        <div className={styles.line}>Our Legal Entity</div>
        <div className={styles.line}>
          <div className={styles.dropDown}>
            <Dropdown
              handlerOnClick={toggleDropDown}
              handleOnSelectedItemChange={onDropdownItemChange}
              selectedOption={'Acuo'}
              options={['Acuo', 'Palo IT']}
              activateMouseLeaveEvent/>
          </div>
        </div>
      </div>
      <div className={styles.rowGroup}>
        <div className={styles.line}>Counterparty Organization</div>
        <div className={styles.line}>
          <div className={styles.dropDown}>
            <Dropdown
              handlerOnClick={toggleDropDown}
              handleOnSelectedItemChange={onDropdownItemChange}
              selectedOption={'Counterparty A'}
              options={['Counterparty A', 'Counterparty B']}
              activateMouseLeaveEvent/>
          </div>
        </div>
      </div>
      <div className={styles.rowGroup}>
        <div className={styles.line}>Counterparty Entity</div>
        <div className={styles.line}>
          <div className={styles.dropDown}>
            <Dropdown
              handlerOnClick={toggleDropDown}
              handleOnSelectedItemChange={onDropdownItemChange}
              selectedOption={'Counterparty A1'}
              options={['Counterparty A1', 'Counterparty A7']}
              activateMouseLeaveEvent/>
          </div>
        </div>
      </div>

      <div className={styles.rowGroup}>
        <div className={styles.line}>Agreement Type</div>
        <div className={styles.line}>
          <div className={styles.dropDown}>
            <Dropdown
              handlerOnClick={toggleDropDown}
              handleOnSelectedItemChange={onDropdownItemChange}
              selectedOption={'Select'}
              options={['Group']}
              activateMouseLeaveEvent/>
          </div>
        </div>
      </div>
      <div className={styles.rowGroup}>
        <div className={styles.line + ' ' + styles.calenderGroup}>
          <span>Active Date</span>
          <span className={styles.datepickerWrapper}>
            <DatePicker className={styles.datepicker}
                        selected={this.state.activeDate}
                        customInput={<img src={'./images/agreements/calendar-icon.png'}/>}
                        onChange={this.changeDate}
                        ref="datepicker"/>
          </span>
        </div>
        <div className={styles.line}>
          <input type="text"
                 className={styles.inputTextBox}
                 readOnly
                 value={formatDate(this.state.activeDate)}
                 onClick={this.textboxClick}/>
        </div>
      </div>

    </div>

  }
}

export default TradingEntities