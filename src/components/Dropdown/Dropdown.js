import React, {PropTypes} from 'react'
import styles from './Dropdown.css'

/**
 * Option list can be string or object(with display and value fields)
 * ['Apple','Orange',...]
 * or
 * [{display: 'Apple', value: 'apple'}, {display: 'Orange', value: 'orange'},...]
 */
export default class Dropdown extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      isOpen : false,
      selectedOption : props.selectedOption
    }
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleOnOptionChange = this.handleOnOptionChange.bind(this)
  }

  handleToggleDropdown(e){
    this.setState({
      isOpen : !this.state.isOpen
    })
  }

  handleOnMouseLeave(e){
    this.setState({
      isOpen : false
    })
  }

  handleOnOptionChange(e, option){
    this.setState({
      selectedOption : option,
      isOpen : false
    })
    this.props.handleOnSelectedItemChange(e)
  }

  render(){
    // merge option 'ALL', with actual options
    const {options, activateMouseLeaveEvent, isFixedOptionsHeight} = this.props
    let menu = null
    if(this.state.isOpen){
      menu = (
        <ul className={styles.filtersList + ' ' + (isFixedOptionsHeight && styles.maxHeightOptions)}>
          {options.map((option, index) => (
            <li key={index}
                onClick={(e) => this.handleOnOptionChange(e, option)}>
              {String(option.display || option).toUpperCase()}
            </li>
          ))}
        </ul>)
    }

    return(
      <div className={styles.filterItem + ' ' + (this.state.isOpen && styles.increaseZindex)}>
        <div className={styles.filters} onClick={this.handleToggleDropdown}
             onMouseLeave={activateMouseLeaveEvent && this.handleOnMouseLeave}>
          <div className={styles.selectedText}>
            {( this.state.selectedOption.display || this.state.selectedOption).toUpperCase()}
          </div>
          {menu}
        </div>
        <div className={styles.filterDropdownArrow}></div>
      </div>
    )
  }
}


Dropdown.propTypes = {
  selectedOption : PropTypes.string,
  options : PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  ),
  handlerOnClick : PropTypes.func.isRequired,
  handleOnSelectedItemChange : PropTypes.func.isRequired,
  activateMouseLeaveEvent: PropTypes.bool,
  isFixedOptionsHeight: PropTypes.bool
}

Dropdown.defaultProps = {
  selectedOption : '',
  options : [],
  activateMouseLeaveEvent: false,
  isFixedOptionsHeight: false
}