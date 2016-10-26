/**
 * Created by vikassaryal on 26/10/16.
 */
import React from 'react'
import {connect} from 'react-redux'

import * as actionCreators from '../../../action_creators'

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
        <div>
            <select id = "filter-dropdown" onChange={this.handleChange}>
                <option value="1">ALL</option>
                {this.getDeriv().map(this.renderFilter)}
            </select>

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