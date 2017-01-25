/**
 * Created by vikassaryal on 26/10/16.
 */
import React, {PropTypes} from 'react'
import {Set, Map} from 'immutable'
import styles from './FilterBar.css'
import FilterDropdown from './sub-components/FilterBarDropdown'
import {
  DROPDOWN_TYPE_MULTI_SELECT,
  DROPDOWN_TYPE_TIME_SELECT
}from '../../constants/ComponentConstants'



export default class FilterBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterBarNameClicked: true,
      filterBar: styles.open,
      filterItems: styles.show,
    }

    this.handleCPTYEntityChange = this.handleCPTYEntityChange.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.selectFilteredEntities = this.selectFilteredEntities.bind(this)
  }

  handleCPTYEntityChange(e) {
    if (!this.props.filters.getIn(['cptyEntityFilter', 'filter']) || e.currentTarget.dataset.ref == "All") {
      this.props.onCPTYEntityChange(Set().add(e.currentTarget.dataset.ref), e)
    }
    else {
      this.selectFilteredEntities(e)
    }
    e.stopPropagation()
  }

  toggleFilter() {
    if (!this.state.filterBarNameClicked) {
      this.setState({
        filterBarNameClicked: !this.state.filterBarNameClicked,
        filterBar: styles.open,
        filterItems: styles.show
      })
    } else {
      this.setState({
        filterBarNameClicked: !this.state.filterBarNameClicked,
        filterBar: styles.close,
        filterItems: styles.hide
      })
    }
  }

  selectFilteredEntities(e) {
    let filterSet = this.props.filters.getIn(['cptyEntityFilter', 'filter'])

    if (!filterSet.includes(e.currentTarget.dataset.ref)) {
      this.props.onCPTYEntityChange(filterSet.add(e.currentTarget.dataset.ref).remove("All"), e)
    }
    else {
      if (filterSet.size == 1)
        this.props.onCPTYEntityChange(filterSet.remove(e.currentTarget.dataset.ref).add("All"), e)
      else
        this.props.onCPTYEntityChange(filterSet.remove(e.currentTarget.dataset.ref).remove("All"), e)
    }
  }

  render() {
    return (
      <div className={styles.filterContainer}>
        <div className={styles.filterBarName + ' ' + this.state.filterBar} onClick={this.toggleFilter}>
          <span>Filter</span>
          <div className={styles.switchArrow}>
            <div className={styles.arrowLine} id={styles.line1}></div>
            <div className={styles.arrowLine} id={styles.line2}></div>
          </div>
        </div>

        <div className={styles.filterItemWrap + ' ' + this.state.filterItems}>

          <FilterDropdown
            title={'Legal Entity'}
            handleOnSelectedItemChange={this.props.onLegalEntityChange}
            options={this.props.legalEntityList}
            selectedOption={
              this.props.filters.getIn(['legalEntityFilter', 'filter'])}/>

          <FilterDropdown
            title={'Deriv Type'}
            handleOnSelectedItemChange={this.props.onDerivChange}
            options={this.props.derivativeType}
            selectedOption={
              this.props.filters.getIn(['typeFilter', 'filter'])}/>

          <FilterDropdown
            title={'Time Window'}
            handleOnSelectedItemChange={this.props.onFilterTimeWindowStatus}
            optionList={this.props.timeWindowList}
            dropdownType={DROPDOWN_TYPE_TIME_SELECT}
            selectedOption={
              this.props.filters.getIn(['timeWindowFilter', 'timeRangeText']) ?
                this.props.filters.getIn(['timeWindowFilter', 'timeRangeText']) : 'Today: ALL'}/>

          <FilterDropdown
            title={'CPTY Organisation'}
            handleOnSelectedItemChange={this.props.onCptyOrgChange}
            options={this.props.cptyOrganisation}
            selectedOption={
              this.props.filters.getIn(['cptyOrgFilter', 'filter'])}/>

          <FilterDropdown
            title={'CPTY Entity'}
            handleOnSelectedItemChange={this.handleCPTYEntityChange}
            dropdownType={DROPDOWN_TYPE_MULTI_SELECT}
            options={this.props.cptyEntity}
            selectedOptionList={this.props.filters.getIn(['cptyEntityFilter', 'filter']) ? this.props.filters.getIn(['cptyEntityFilter', 'filter']).toArray() : []}/>

        </div>

      </div>
    )
  }
}


FilterBar.propTypes = {
  onLegalEntityChange: PropTypes.func.isRequired,
  onDerivChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onCptyOrgChange: PropTypes.func.isRequired,
  onCPTYEntityChange: PropTypes.func.isRequired,
  onFilterTimeWindowStatus: PropTypes.func.isRequired,
  legalEntityList: PropTypes.arrayOf(PropTypes.string),
  // filters : PropTypes.array
}

FilterBar.defaultProps = {
  filters: Map()
}
