import React from 'react'
import { UploadPortfolioComponent } from '../../components'
import {
    FilterContainer,
    TableContainer,
    GraphContainer,
    NavigationBarContainer
} from '../../containers'


class Dashboard extends React.Component{

    render(){
        return (
            <div>
                <NavigationBarContainer curPage={this.props.location.pathname}/>
                <UploadPortfolioComponent />
                <FilterContainer/>
                <GraphContainer />
                <TableContainer />
            </div>
        )
    }
}

export { Dashboard }