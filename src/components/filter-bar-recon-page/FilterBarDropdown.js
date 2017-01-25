import React, {PropTypes} from 'react'
import styles from './FilterBar.css'


export default class FilterDropdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedOption: props.selectedOption
    }
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleOnOptionChange = this.handleOnOptionChange.bind(this)
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

  handleOnOptionChange(selectedOption) {
    this.setState({
      selectedOption,
      isOpen: false
    })

    this.props.handleOnSelectedItemChange(selectedOption)
  }

  render() {
    // merge option 'all', with actual options and make it uppercase
    const options = [['all'], ...this.props.options].map(text => String(text).toUpperCase())

    // menu if open
    const menu = (
      <ul className={styles.filtersList}>
        {options.map(option => (
          <li key={option}
              onClick={e => {e.stopPropagation()
                             console.log("recompile!!")
                             this.handleOnOptionChange(option)}>
            option
          </li>
        ))}
      </ul>
    )

    return (
      <div className={styles.filterItem}>
        <label className={styles.filterLabel}>{this.props.title}</label>
        <div className={styles.filters} onClick={this.handleToggleDropdown} onMouseLeave={this.handleOnMouseLeave}>
          <div className={styles.selectedText}>
            {(this.state.selectedOption).toUpperCase()}
          </div>
          {this.state.isOpen? menu: null}
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
  handlerOnClick: PropTypes.func.isRequired,
  handlerResetActiveDropdown: PropTypes.func.isRequired,
  handleOnSelectedItemChange: PropTypes.func.isRequired,
}

FilterDropdown.defaultProps = {
  title: '',
  selectedOption: 'All',
  options: []
}
