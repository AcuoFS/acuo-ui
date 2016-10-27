/**
 * Created by vikassaryal on 26/10/16.
 */
import React from 'react'
import {connect} from 'react-redux'

import * as actionCreators from '../../../action_creators'

import styles from './filter.css'

class Filter extends React.Component{
    constructor(props){
        super(props)
        this.getDeriv = this.getDeriv.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }
    getDeriv(){
        return this.props.derivatives || []
    }

    handleChange(e){
       this.props.filterState(e.target.value)
    }

    renderFilter(deriv){
        return (
            <option value={deriv.get('type')}>{deriv.get('type').toUpperCase()} </option>)

    }
    render(){
        return(
        <div className={styles.filterContainer}>
            <div className={styles.filterItem}>
                <label className={styles.filterLabel}>Deriv Type</label>
                <select className={styles.filters} id = "filter-derivtype" onChange={this.handleChange}>
                    <option value="All">ALL</option>
                    {this.getDeriv().map(this.renderFilter)}
                </select>
            </div>
            <div className={styles.filterItem}>
                <label className={styles.filterLabel}>Deriv Type</label>
                <select className={styles.filters} id = "filter-derivtype" onChange={this.handleChange}>
                    <option value="All">ALL</option>
                    {this.getDeriv().map(this.renderFilter)}
                </select>
            </div>
        </div>
        )

    }
}

function mapStateToProps(state){
    return{
        derivatives : state.getIn(['data', 'derivatives'])
    }
}

export const FilterContainer = connect(mapStateToProps, actionCreators)(Filter)