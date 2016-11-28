import React from 'react'
import styles from './FilterBar.css'

export default class DropdownMultiSelectMenu extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      filterEntity: '',
      selectedItems : props.selectedOptionList
    }
    this.filterEntities = this.filterEntities.bind(this)
    this.onMenuOptionSelect = this.onMenuOptionSelect.bind(this)
  }

  filterEntities(e) {
    this.setState({
      filterEntity : e.currentTarget.value
    })
  }

  onMenuOptionSelect(e, option, handleOnOptionChange){
    let selectedOptionText = "All"
    let selectedItems = this.state.selectedItems

    if(option == "All" ){
      selectedItems = []
    }else if (this.state.selectedItems.length == 0) {
      selectedOptionText = option
      selectedItems = [...selectedItems, option]
    }
    else if (this.state.selectedItems.length > 0){
      if(selectedItems.indexOf(option) >= 0){
        selectedItems.splice(selectedItems.indexOf(option), 1)
        if(selectedItems.length == 0){
          selectedOptionText = "All"
        }
        else if(selectedItems.length == 1){
          selectedOptionText = selectedItems[0].toUpperCase()
        }else{
          selectedOptionText = "Multiple"
        }
      }
      else{
        selectedItems = [...selectedItems, option]
        selectedOptionText = "Multiple"
      }
    }

    this.setState((prevState) => ({
      selectedItems: selectedItems
    }))
    handleOnOptionChange(e, selectedOptionText, selectedItems)
  }

  isSelectedOption(option){
    return (this.state.selectedItems.indexOf(option) >= 0) ? styles.selectedList : null;
  }

  render(){
    const {handleOnOptionChange, options} = this.props
    let optionList = options
    if(this.state.filterEntity){
      optionList = options.filter(option => option.includes(this.state.filterEntity.toUpperCase()))
    }
    // merge option 'ALL', with actual options
    optionList = [[], 'All', ...optionList]

    return(
      <ul className={styles.filtersList}>
        <li className={styles.paddingless} onClick={(e) => e.stopPropagation()}><input type="text"
                                                                                       className={styles.filterSearchBox}
                                                                                       onChange={this.filterEntities}
                                                                                       placeholder="Search..."/>
        </li>
        {optionList.map(option => (
          <li key={option}
              data-ref={option}
              className={this.isSelectedOption(option)}
              onClick={ e => this.onMenuOptionSelect(e, option, handleOnOptionChange)}>
            {String(option).toUpperCase()}
          </li>
        ))}
      </ul>
    )
  }
}

