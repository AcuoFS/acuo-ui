import React from 'react'
import {NavContainer} from '../../components/shared/navbar/navbar'
import {FilterContainer} from '../shared/filters/filter'
import {GraphContainer} from './graph/graph'
import {TableContainer} from './table/table-component'
import UploadPortfolio from '../../components/dashboard/uploadPortfolio/upload_portfolio'

class Dashboard extends React.Component{
    render(){
        return (<div>
            <NavContainer curPage={this.props.location.pathname}/>
            <UploadPortfolio />
            <FilterContainer/>
            <GraphContainer />
            <TableContainer />
        </div>)
    }
}

export default Dashboard