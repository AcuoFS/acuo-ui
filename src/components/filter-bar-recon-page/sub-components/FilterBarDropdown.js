import React, {PropTypes} from 'react'
import _ from 'lodash'

// sub components
import DropdownMenu from './DropdownMenu'
import DropdownTimeMenu from './DropdownTimeMenu'
import DropdownMultiSelectMenu from './DropdownMultiSelectMenu'

// styles
import styles from '../FilterBar.css'

export default class FilterDropdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }

    this.handleToggleDropdown = this.handleToggleDropdown.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleOnSelectChange = this.handleOnSelectChange.bind(this)
  }

  handleToggleDropdown(e) {
    e.stopPropagation()
    this.setState({isOpen: !this.state.isOpen})
  }

  handleOnMouseLeave(e) {
    e.stopPropagation()
    // close it if it is open
    if(this.state.isOpen) this.setState({isOpen: false})
  }

  // this function will handle selectChange from subComponent
  handleOnSelectChange(selected) {
    const { attr, setFilter, type } = this.props

    if(type === 'multi') {
      // if it is multi-value filter
      setFilter([{attr, selected}])
    } else {
      // if it is single-value filter
      setFilter([{
        attr,
        selected: (_.toUpper(selected) === 'ALL')
                  ? ""
                  : selected
      }])
    }
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
                 handleOnSelectChange={this.handleOnSelectChange} />
  }

  render() {
    const { type, selected, label } = this.props
    const menu = this.renderMenu(type, this.props)

    // as selected might be undefined, which is illegal
    // make it legal according to type
    const legalSelected = selected || 'all'

    const seletedAsText = (
      (_.isString(legalSelected))
      // if it is string
      ? legalSelected
      // if it is array (not string)
      : _.isEmpty(legalSelected)
        // if it is empty array
        ? 'all'
        // if it is non-empty array
        : (legalSelected.length === 1)
          // 1 element array
          ? _.head(legalSelected)
          // multi elements array
          : 'multiple'
    )

    return (
      <div className={styles.filterItem}>
        <label className={styles.filterLabel}>{label}</label>
        <div className={styles.filters}
             onClick={this.handleToggleDropdown}
             onMouseLeave={this.handleOnMouseLeave}>

          <div className={styles.selectedText}>
            {_.toUpper(seletedAsText)}
          </div>

          {this.state.isOpen && menu}

        </div>
        <div className={styles.filterDropdownArrow}></div>
      </div>
    )
  }
}
