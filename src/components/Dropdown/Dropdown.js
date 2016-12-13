import React, {PropTypes} from 'react'
import styles from './Dropdown.css'


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

  handleOnOptionChange(e){
    this.setState({
      selectedOption : e.currentTarget.textContent,
      isOpen : false
    })
    this.props.handleOnSelectedItemChange(e)
  }

  render(){
    // merge option 'ALL', with actual options
    const options = this.props.options
    let menu = null
    if(this.state.isOpen){
      menu = (
        <ul className={styles.filtersList}>
          {options.map(option => (
            <li key={option}
                data-ref={option}
                onClick={this.handleOnOptionChange}>
              {String(option).toUpperCase()}
            </li>
          ))}
        </ul>)
    }

    return(
      <div className={styles.filterItem + ' ' + (this.state.isOpen ? styles.increaseZindex : '')}>
        <div className={styles.filters} onClick={this.handleToggleDropdown} >
          <div className={styles.selectedText}>
            {( this.state.selectedOption ).toUpperCase()}
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
  options : PropTypes.arrayOf(PropTypes.string),
  handlerOnClick : PropTypes.func.isRequired,
  handleOnSelectedItemChange : PropTypes.func.isRequired,
}

Dropdown.defaultProps = {
  title : '',
  selectedOption : '',
  options : []
}