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
        this.handleChange = this.handleChange.bind(this)
        //this.getLegalEntity = this.getLegalEntity.bind(this)
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

    // getLegalEntity(){
    //     return this.getDeriv().map((derivative)=>{
    //         return derivative.get('marginStatus').map((marginStatus)=>{
    //             return marginStatus.get('timeFrames').map((timeFrames)=>{
    //                 console.log('here', timeFrames.get('actionsList'))
    //                 //return timeFrames.get('actionsList')
    //                 return timeFrames.get('actionsList').map((actionList)=>{
    //                     return actionList.get('legalEntity')
    //                })
    //             })
    //         })
    //     })
    // }

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
                <select className={styles.filters} id = "filter-legalEntity" onChange={this.handleChange}>
                    <option value="All">ALL</option>
                    {this.renderLegalEntity()}
                </select>
                <div className={styles.filterDropdownArrow}></div>
            </div>
            <div className={styles.filterItem}>
                <label className={styles.filterLabel}>Deriv Type</label>
                <select className={styles.filters} id = "filter-derivtype" onChange={this.handleChange}>
                    <option value="All">ALL</option>
                    {this.getDeriv().map(this.renderFilter)}
                </select>
                <div className={styles.filterDropdownArrow}></div>
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