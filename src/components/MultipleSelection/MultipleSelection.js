import React, {PropTypes} from 'react'
import styles from './MultipleSelection.css'
import _ from 'lodash'

/**
 * Option list can be string or object(with display and value fields)
 * ['Apple','Orange',...]
 * or
 * [{display: 'Apple', value: 'apple'}, {display: 'Orange', value: 'orange'},...]
 */
export default class MultipleSelection extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      isOpen : false,
      selectedOption : []
    }
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleOnOptionChange = this.handleOnOptionChange.bind(this)
    this.removeSelected = this.removeSelected.bind(this)

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
    let selectedOptions = this.state.selectedOption

    if(!_.includes(selectedOptions, option)) {
      selectedOptions.push(option)
      this.setState({
        selectedOption: selectedOptions
      })
    }

    this.props.handleOnSelectedItemChange(e)
  }

  removeSelected(option){
    this.setState({
      selectedOption: this.state.selectedOption.filter((x) => x != option)
    })
  }

  renderSelectedOptions(selectedOptions, removeSelected){
    return selectedOptions.map((x, i) => (<div key={i}>{x} <span className={styles.close} onClick={(e) => {removeSelected(x); e.stopPropagation();}}></span></div>))
  }

  render(){
    // merge option 'ALL', with actual options
    const {options, activateMouseLeaveEvent, isFixedOptionsHeight} = this.props
    let menu = null
    if(this.state.isOpen && (options.filter((option) => !_.includes(this.state.selectedOption, option)).length > 1)){
      menu = (
        <ul className={styles.filtersList + ' ' + (isFixedOptionsHeight && styles.maxHeightOptions)}>
          {options.filter((option) => !_.includes(this.state.selectedOption, option)).map((option, index) => (
            <li key={index}
                onClick={(e) => this.handleOnOptionChange(e, option)}>
              {String(option.display || option).toUpperCase()}
            </li>
          ))}
        </ul>)
    }
    console.log(options)
    return(
      <div className={styles.filterItem + ' ' + (this.state.isOpen && styles.increaseZindex)}>
        <div className={styles.filters} onClick={this.handleToggleDropdown}>
             {/*onMouseLeave={activateMouseLeaveEvent && this.handleOnMouseLeave}>*/}
          <div className={styles.selectedText}>
            {this.renderSelectedOptions(this.state.selectedOption, this.removeSelected)}
            {menu}
          </div>

        </div>
        <div className={styles.filterDropdownArrow}></div>
      </div>
    )
  }
}


MultipleSelection.propTypes = {
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

MultipleSelection.defaultProps = {
  selectedOption : '',
  options : [],
  activateMouseLeaveEvent: false,
  isFixedOptionsHeight: false
}