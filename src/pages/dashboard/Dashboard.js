import React from 'react'
import {
    NavContainer,
    UploadPortfolio
} from '../../components'
import FilterContainer from '../../containers/FilterContainer'
import TableContainer from '../../containers/TableContainer'
import GraphContainer from '../../containers/GraphContainer'


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