import React from 'react'
import {UploadPortfolioButton} from '../../components'
import {
  FilterContainer,
  TableContainer,
  GraphContainer,
  NavigationBarContainer
} from '../../containers'
import styles from './Dashboard.css'


class Dashboard extends React.Component {

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <UploadPortfolioButton />
        <div className={styles.filterGraphContainer}>
          <FilterContainer/>
          <GraphContainer />
        </div>
        <TableContainer />
      </div>
    )
  }
}

export {Dashboard}