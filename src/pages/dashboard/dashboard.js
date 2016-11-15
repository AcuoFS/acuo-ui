import React from 'react'
import { NavContainer } from '../../components/navigation/navigationBar'
import { FilterContainer } from '../../components/filter/filter'
import UploadPortfolio from '../../components/upload-portfolio/uploadPortfolio'
import { GraphContainer } from '../../components/graph/graph'
import { TableContainer } from '../../components/table/table'


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