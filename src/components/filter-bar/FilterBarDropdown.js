import React, {PropTypes} from 'react'
import DropdownMenu from './DropdownMenu'
import DropdownTimeMenu from './DropdownTimeMenu'
import DropdownMultiSelectMenu from './DropdownMultiSelectMenu'
import styles from './FilterBar.css'
import {
    DROPDOWN_TYPE_NORMAL,
    DROPDOWN_TYPE_MULTI_SELECT,
    DROPDOWN_TYPE_TIME_SELECT
}from '../../constants/ComponentConstants'


export default class FilterDropdown extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isOpen : false,
            selectedOption : props.selectedOption,
            selectedOptionList : []
        }
        this.handleToggleDropdown = this.handleToggleDropdown.bind(this)
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
        this.handleOnOptionChange = this.handleOnOptionChange.bind(this)
        this.handleOnOptionChangeMultiSelect = this.handleOnOptionChangeMultiSelect.bind(this)
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

    handleOnOptionChange(e, selectedOption){
        this.setState({
            selectedOption : selectedOption,
            isOpen : false
        })
        this.props.handleOnSelectedItemChange(e)
    }

    handleOnOptionChangeMultiSelect(e, displayOptionText, selectedOptionList){
        this.setState({
            selectedOption : displayOptionText,
            selectedOptionList : selectedOptionList,
            isOpen : true
        })
        this.props.handleOnSelectedItemChange(e)
    }

    dropdownMenu(){
        let menu = null
        if(this.state.isOpen){
            switch (this.props.dropdownType){
                case DROPDOWN_TYPE_MULTI_SELECT:
                    menu = (
                      <DropdownMultiSelectMenu
                        option={this.props.options}
                        handleOnOptionChange={this.handleOnOptionChangeMultiSelect}
                        selectedOptionList={this.props.selectedOptionList}/>
                    )
                    break;
                case DROPDOWN_TYPE_TIME_SELECT:
                    menu = (
                      <DropdownTimeMenu
                        option={this.props.optionList}
                        handleOnOptionChange={this.handleOnOptionChange}/>
                    )
                    break;
                default:
                    menu = (
                      <DropdownMenu
                        option={this.props.options}
                        handleOnOptionChange={this.handleOnOptionChange}/>
                    )
                    break;
            }
        }
        return menu;
    }

    render(){
        let menu = this.dropdownMenu()
        return(
            <div className={styles.filterItem}>
                <label className={styles.filterLabel}>{this.props.title}</label>
                <div className={styles.filters} onClick={this.handleToggleDropdown} onMouseLeave={this.handleOnMouseLeave}>
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


FilterDropdown.propTypes = {
    title : PropTypes.string,
    selectedOption : PropTypes.string,
    options : PropTypes.arrayOf(PropTypes.string),
    optionList : PropTypes.arrayOf(PropTypes.object),
    selectedOptionList : PropTypes.arrayOf(PropTypes.string),
    dropdownType : PropTypes.string,
    handlerOnClick : PropTypes.func.isRequired,
    handlerResetActiveDropdown : PropTypes.func.isRequired,
    handleOnSelectedItemChange : PropTypes.func.isRequired,
}

FilterDropdown.defaultProps = {
    title : '',
    selectedOption : 'All',
    dropdownType : DROPDOWN_TYPE_NORMAL,
    options : [],
    optionList : [],
    selectedOptionList : []
}