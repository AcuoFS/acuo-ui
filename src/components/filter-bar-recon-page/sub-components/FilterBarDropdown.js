import React, {PropTypes} from 'react'

// sub components
import DropdownMenu from './DropdownMenu'
import DropdownTimeMenu from './DropdownTimeMenu'
import DropdownMultiSelectMenu from './DropdownMultiSelectMenu'

// styles
import styles from '../FilterBar.css'

export default class FilterDropdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {isOpen: false}

    this.handleToggleDropdown = this.handleToggleDropdown.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)

    this.handleOnOptionChangeMultiSelect = this.handleOnOptionChangeMultiSelect.bind(this)
    this.handleOnOptionChangeTimeSelect = this.handleOnOptionChangeTimeSelect.bind(this)
  }

  handleToggleDropdown(e) {
    e.preventDefault()
    this.setState({isOpen: !this.state.isOpen})
  }

  handleOnMouseLeave(e) {
    e.preventDefault()
    this.setState({isOpen: false})
  }

  handleSelectChange(selected) {
    this.setState({selected, isOpen: false})
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

  renderMenu(menuType = 'default', props) {
    let Menu

    switch (menuType) {
      case 'multi':
        Menu = DropdownMultiSelectMenu
        break
      case 'time':
        Menu = DropdownTimeMenu
        break
      default:
        Menu = DropdownMenu
    }

    return <Menu options={this.props.options}
                 selected={this.props.selected}
                 handleOnSelectChange={this.handleSelectChange} />
  }

  render() {
    const menu = this.renderMenu(this.props.dropdownType, this.props)

    const displaySeletedAsText = (text = 'all') => {
      const displayedText = ((typeof text) === 'string')
                            ? text
                            : 'multiple'

      return displayedText.toUpperCase()
    }

    return (
      <div className={styles.filterItem}>
        <label className={styles.filterLabel}>{this.props.title}</label>
        <div className={styles.filters} onClick={this.handleToggleDropdown} onMouseLeave={this.handleOnMouseLeave}>
          <div className={styles.selectedText}>
            {displaySeletedAsText(this.state.selected)}
          </div>
          {this.state.isOpen? menu: null}
        </div>
        <div className={styles.filterDropdownArrow}></div>
      </div>
    )
  }
}


FilterDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.arrayOf(PropTypes.string),
            ]),
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  dropdownType: PropTypes.string,
  handleSelectChange: PropTypes.func.isRequired,
}
