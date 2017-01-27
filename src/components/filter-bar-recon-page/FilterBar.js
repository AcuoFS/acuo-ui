import React, {PropTypes} from 'react'
import {Set, Map} from 'immutable'
import FilterBarDropdown from './sub-components/FilterBarDropdown'

import styles from './FilterBar.css'

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

  render () {
    return  <div className={styles.filterContainer}>
              <div className={styles.filterBarName + ' ' + this.state.filterBar} onClick={this.toggleFilter}>
                <span>Filter</span>
                <div className={styles.switchArrow}>
                  <div className={styles.arrowLine} id={styles.line1}></div>
                  <div className={styles.arrowLine} id={styles.line2}></div>
                </div>
              </div>

              <div className={styles.filterItemWrap + ' ' + this.state.filterItems}>
                {this.props.filters.map(filter => (
                  <FilterBarDropdown key={filter.attr}
                                     {...filter}
                                     setFilter={this.props.setFilter}/>
                ))}
              </div>
            </div>
  }
}
