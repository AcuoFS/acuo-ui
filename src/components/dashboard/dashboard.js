import React from 'react'

import {GraphContainer} from './graph/graph'
import {TableContainer} from './table/table-component'

class Dashboard extends React.Component{
    render(){
        return (<div>
            <GraphContainer />
            <TableContainer />
        </div>)
    }
}

export default Dashboard