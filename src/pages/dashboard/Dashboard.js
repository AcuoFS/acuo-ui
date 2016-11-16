import React from 'react'
import { UploadPortfolioComponent } from '../../components'
import FilterContainer from '../../containers/FilterContainer'
import TableContainer from '../../containers/TableContainer'
import GraphContainer from '../../containers/GraphContainer'
import NavigationBarContainer from '../../containers/NavigationBarContainer'


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