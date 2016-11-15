import React from 'react'

//import {NavContainer} from '../../components/shared/navbar/navbar'

import { NavContainer } from '../../components_new/navigation/navigation'

import {FilterContainer} from '../../components/shared/filters/filter'
import {GraphContainer} from '../../components/dashboard/graph/graph'
import {TableContainer} from '../../components/dashboard/table/table-component'
import UploadPortfolio from '../../components/dashboard/uploadPortfolio/upload_portfolio'

class Dashboard extends React.Component{

    render(){
        return (
            <div>
                <NavContainer curPage={this.props.location.pathname}/>
                <UploadPortfolio />
                <FilterContainer/>
                <GraphContainer />
                <TableContainer />
            </div>
        )
    }
}

export { Dashboard }