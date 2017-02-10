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
    const { attr, setFilter } = this.props

    setFilter({
      attr,
      selected,
    })
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

    return <Menu options={_.sortBy(this.props.options)}
                 selected={this.props.selected}
                 handleOnSelectChange={this.handleOnSelectChange} />
  }

  render() {
    const { type, selected, label } = this.props
    const menu = this.renderMenu(type, this.props)

    return (
      <div className={styles.filterItem}>
        <label className={styles.filterLabel}>{label}</label>
        <div className={styles.filters}
             onClick={this.handleToggleDropdown}
             onMouseLeave={this.handleOnMouseLeave}>

          <div className={styles.selectedText}>
            {selected? (selected.label || 'ALL') : 'ALL'}
          </div>

          {this.state.isOpen && menu}

        </div>
        <div className={styles.filterDropdownArrow}></div>
      </div>
    )
  }
}
