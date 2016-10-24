import React from 'react'
import {connect} from 'react-redux'

import * as actionCreators from "../../action_creators"
import TableHead from './table-subcomponent/tablehead-component'
import styles from './table.css'

export class Table extends React.Component{
    constructor(props){
        super(props)

        console.log(this.props)
    }
  render() {
    return (
      <div>
        <TableHead deriv={this.props} marginType={"ETD"}/>
        <TableHead marginType={"OTC Cleared"}/>
        <TableHead marginType={"OTC Bilateral Reg"}/>
        <TableHead marginType={"OTC Bilateral Leg"}/>
      </div>
    );
  }
}

function mapStateToProps(state){
    return{
        derivatives : state
    }

}
export const TableContainer = connect(mapStateToProps)(Table)
