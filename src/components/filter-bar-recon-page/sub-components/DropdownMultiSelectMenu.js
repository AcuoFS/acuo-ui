import React from 'react'
import _ from 'lodash'
import styles from '../FilterBar.css'

/*
  This component is a multi select component
  It will look like below
  ==========
  filter
  ----------
  selected
  ----------
  unselected
  ==========

*/

export default class DropdownMultiSelectMenu extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      filter: '',
    }

    this.setFilter = this.setFilter.bind(this)
    this.select = this.select.bind(this)
    this.deselect = this.deselect.bind(this)
    this.deselectAll = this.deselectAll.bind(this)
  }

  setFilter(value) {
    this.setState(state => _.set(state, 'filter', value))
  }

  select(option) {
    // prev selected coule be undefined, make it an array in that case
    const prevSelected = this.props.selected || []
    const selected = _.concat(prevSelected, option)

    this.props.handleOnSelectChange(selected)
  }

  deselect(option) {
    // prev selected must be an non-empty array
    const prevSelected = this.props.selected
    const selected = _.filter(prevSelected, o => (o != option))

    this.props.handleOnSelectChange(selected)
  }

  deselectAll() {
    this.props.handleOnSelectChange([])
  }

  render() {
    const { options, selected } = this.props

    // calculate unselected
    const unselected = _.difference(options, selected)

    // filter feature
    const filterRegExp = new RegExp(_.toUpper(this.state.filter))
    const filteredUnselected = _.filter(unselected, o => _.toUpper(o).match(filterRegExp))

    // sort them
    const sortedSelected = _.orderBy(selected)
    const sortedUnselected = _.orderBy(filteredUnselected)

    return(
      <ul className={styles.filtersList}>
        <li className={styles.paddingless}
            onClick={e => e.stopPropagation()}>
          <input className={styles.filterSearchBox}
                 onInput={e => this.setFilter(e.currentTarget.value)}
                 placeholder="Search..."/>
        </li>

        <li onClick={e => {e.stopPropagation()
                           this.deselectAll()}}>
          ALL
        </li>

        {sortedSelected.map(option => (
          <li key={'selected_' + option}
              className={styles.selectedList}
              onClick={e => {e.stopPropagation()
                             this.deselect(option)}}>
            {_.toUpper(option)}
          </li>
        ))}

        {sortedUnselected.map(option => (
          <li key={'unselected_' + option}
              onClick={e => {e.stopPropagation()
                             this.select(option)}}>
            {_.toUpper(option)}
          </li>
        ))}
      </ul>
    )
  }
}
