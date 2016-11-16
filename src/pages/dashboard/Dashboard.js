import React from 'react'
import {
    NavContainer,
    UploadPortfolio,
    GraphContainer,
} from '../../components'
import FilterContainer from '../../containers/FilterContainer'
import TableContainer from '../../containers/TableContainer'



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