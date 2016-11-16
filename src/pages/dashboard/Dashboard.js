import React from 'react'
import {
    NavContainer,
    FilterContainer,
    UploadPortfolio,
    GraphContainer,
    TableContainer,
} from '../../components'



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