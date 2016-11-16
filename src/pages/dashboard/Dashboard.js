import React from 'react'
import { NavContainer } from '../../components/navigation/NavigationBar'
import { FilterContainer } from '../../components/filter/Filter'
import UploadPortfolio from '../../components/upload-portfolio/UploadPortfolio'
import { GraphContainer } from '../../components/graph/Graph'
import { TableContainer } from '../../components/table/Table'


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