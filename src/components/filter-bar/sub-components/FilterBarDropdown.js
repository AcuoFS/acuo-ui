import React, {PropTypes} from 'react'
import DropdownMenu from './DropdownMenu'
import DropdownTimeMenu from './DropdownTimeMenu'
import DropdownMultiSelectMenu from './DropdownMultiSelectMenu'
import styles from '../FilterBar.css'
import {
  DROPDOWN_TYPE_NORMAL,
  DROPDOWN_TYPE_MULTI_SELECT,
  DROPDOWN_TYPE_TIME_SELECT
}from '../../../constants/ComponentConstants'


export default class FilterDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedOption: props.selectedOption,
      selectedOptionList: props.selectedOptionList
    }
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleOnOptionChange = this.handleOnOptionChange.bind(this)
    this.handleOnOptionChangeMultiSelect = this.handleOnOptionChangeMultiSelect.bind(this)
    this.handleOnOptionChangeTimeSelect = this.handleOnOptionChangeTimeSelect.bind(this)
    this.displaySelectedText = this.displaySelectedText.bind(this)
  }

  handleToggleDropdown(e) {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleOnMouseLeave(e) {
    this.setState({
      isOpen: false
    })
  }

  handleOnOptionChange(e, selectedOption) {
    this.setState({
      selectedOption: selectedOption,
      isOpen: false
    })
    this.props.handleOnSelectedItemChange(e)
  }

  handleOnOptionChangeTimeSelect(selectedOption, timeWindowMin, timeWindowMax) {
    this.setState({
      selectedOption: selectedOption,
      isOpen: false
    })
    this.props.handleOnSelectedItemChange(timeWindowMin, timeWindowMax, selectedOption)
  }

  handleOnOptionChangeMultiSelect(e, displayOptionText, selectedOptionList) {
    this.setState({
      selectedOption: displayOptionText,
      selectedOptionList: selectedOptionList,
      isOpen: true
    })
    this.props.handleOnSelectedItemChange(e)
  }

  dropdownMenu() {
    let menu = null
    if (this.state.isOpen) {
      switch (this.props.dropdownType) {
        case DROPDOWN_TYPE_MULTI_SELECT:
          menu = (
            <DropdownMultiSelectMenu
              options={this.props.options}
              handleOnOptionChange={this.handleOnOptionChangeMultiSelect}
              selectedOptionList={this.props.selectedOptionList}/>
          )
          break;
        case DROPDOWN_TYPE_TIME_SELECT:
          menu = (
            <DropdownTimeMenu
              options={this.props.optionList}
              handleOnOptionChange={this.handleOnOptionChangeTimeSelect}/>
          )
          break;
        default:
          menu = (
            <DropdownMenu
              options={this.props.options}
              handleOnOptionChange={this.handleOnOptionChange}/>
          )
          break;
      }
    }
    return menu;
  }

  displaySelectedText(selectedOption, selectedOptionList) {
    // selected list is used and length is 1
    if (selectedOptionList.length == 1) {
      return selectedOptionList[0].toUpperCase()
    }
    // selected list is used and length is more than 1
    else if (selectedOptionList.length > 1) {
      return 'MULTIPLE'
    }
    // selected list is not used. Use selected option
    else {
      return selectedOption.toUpperCase()
    }
  }

  render() {
    let menu = this.dropdownMenu()
    return (
      <div className={styles.filterItem}>
        <label className={styles.filterLabel}>{this.props.title}</label>
        <div className={styles.filters} onClick={this.handleToggleDropdown} onMouseLeave={this.handleOnMouseLeave}>
          <div className={styles.selectedText}>
            {this.displaySelectedText(this.state.selectedOption, this.state.selectedOptionList)}
          </div>
          {menu}
        </div>
        <div className={styles.filterDropdownArrow}></div>
      </div>
    )
  }
}


FilterDropdown.propTypes = {
  title: PropTypes.string,
  selectedOption: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  optionList: PropTypes.arrayOf(PropTypes.object),
  selectedOptionList: PropTypes.arrayOf(PropTypes.string),
  dropdownType: PropTypes.string,
  handleOnSelectedItemChange: PropTypes.func.isRequired,
}

FilterDropdown.defaultProps = {
  title: '',
  selectedOption: 'All',
  dropdownType: DROPDOWN_TYPE_NORMAL,
  options: [],
  optionList: [],
  selectedOptionList: []
}