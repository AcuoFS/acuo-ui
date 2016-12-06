import React from 'react'
import { UploadPortfolioButton, UploadPortfolioComponent } from '../../components'
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
                <UploadPortfolioButton />
                <FilterContainer/>
                <GraphContainer />
                <TableContainer />
            </div>
        )
    }
}

export { Dashboard }