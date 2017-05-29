import React from 'react';
import PropTypes from 'prop-types'
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

    this.toggleFilter = this.toggleFilter.bind(this)
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
                {this.props.filters.filter(filter => !filter.hide).map(filter => (
                  <FilterBarDropdown key={filter.attr}
                                     {...filter}
                                     setFilter={this.props.setFilter}/>
                ))}
              </div>
            </div>
  }
}
