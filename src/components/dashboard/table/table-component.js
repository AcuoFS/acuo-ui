import React from 'react'
import {connect} from 'react-redux'

import TableHead from './table-subcomponent/tablehead-component'
import styles from './table.css'

export class Table extends React.Component{
    constructor(props){
        super(props)
        this.getDeriv = this.getDeriv.bind(this)
    }
    renderTable(deriv){
        return (<TableHead key={deriv.get('type')} deriv={deriv}/>)
    }
    getDeriv(){
        return this.props.derivatives || []
    }
    render() {
        //console.log('update', this.props.derivatives)
        return (
          <div>
              {this.getDeriv().map(this.renderTable)}
          </div>
        );
    }
}

function mapStateToProps(state){
    //console.log('map state to props', state.getIn(['display', 'derivatives']))
    return{
        derivatives : state.getIn(['display', 'derivatives'])
    }
}
export const TableContainer = connect(mapStateToProps)(Table)
