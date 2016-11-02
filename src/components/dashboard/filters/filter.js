/**
 * Created by vikassaryal on 26/10/16.
 */
import React from 'react'
import {connect} from 'react-redux'
import {List, Set} from 'immutable'

import * as actionCreators from '../../../action_creators'

import styles from './filter.css'

class Filter extends React.Component{
    constructor(props){
        super(props)
        this.getDeriv = this.getDeriv.bind(this)
        this.handleLegalEntityChange = this.handleLegalEntityChange.bind(this)
        this.handleDerivChange = this.handleDerivChange.bind(this)

    }
    getDeriv(){
        return this.props.derivatives || []
    }

    handleLegalEntityChange(e){
       this.props.filterStateLegal(e.target.value)
    }

    handleDerivChange(e){
        this.props.filterStateDeriv(e.target.value)
    }

    renderFilter(deriv, index){
        return (
            <option key={index} value={deriv.get('type')}>{deriv.get('type').toUpperCase()} </option>)
    }

    renderLegalEntity(){

        return this.getDeriv().reduce((listSumZ, derivative)=>{
            return listSumZ.union(derivative.get('marginStatus').reduce((listSumY, marginStatus)=>{
                return listSumY.union(marginStatus.get('timeFrames').reduce((listSumX, timeFrames)=>{
                    return listSumX.union(timeFrames.get('actionsList').reduce((listSum, x) => {
                        return (!listSum.includes(x.get('legalEntity')) ? listSum.add(x.get('legalEntity')) : listSum)
                    }, Set()))
                }, Set()))
            }, Set()))
        }, Set()).toList().map((x) => {
            return (<option value={x}>{x} </option>)
        })

    }

    render(){
        return(
        <div className={styles.filterContainer}>
            <div className={styles.filterItem}>
                <label className={styles.filterLabel}>Legal Entity</label>
                <select className={styles.filters} id = "filter-legalEntity" onChange={this.handleLegalEntityChange}>
                    <option value="All">ALL</option>
                    {this.renderLegalEntity()}
                </select>
                <div className={styles.filterDropdownArrow}></div>
            </div>
            {/*<div className={styles.filterItem}>*/}
                {/*<label className={styles.filterLabel}>Deriv Type</label>*/}
                {/*<select className={styles.filters} id = "filter-derivtype" onChange={this.handleDerivChange}>*/}
                    {/*<option value="All">ALL</option>*/}
                    {/*{this.getDeriv().map(this.renderFilter)}*/}
                {/*</select>*/}
                {/*<div className={styles.filterDropdownArrow}></div>*/}
            {/*</div>*/}
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
