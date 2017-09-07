import React from 'react'
import {UploadPortfolioButton} from '../../components'
import {
  FilterContainer,
  TableContainer,
  GraphContainer,
  NavigationBarContainer
} from '../../containers'
import { connect } from 'react-redux'
import styles from './Dashboard.css'
import { onInitDashboard } from '../../actions'
import { hashHistory } from 'react-router'

export class Dashboard extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    if(localStorage.loginAt == undefined || localStorage.loginAt < Date.now()){ hashHistory.push('/') }
    this.props.fetchDashboardData()
  }


  componentDidMount () {
    window.scrollTo(0, 0)
    if(localStorage.loginAt < Date.now()){ hashHistory.push("/") }
  }



  render() {
    return (
      <div className={styles.dashboardMinWrapper}>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <UploadPortfolioButton />
        <div className={styles.filterGraphContainer}>
          <FilterContainer/>
          <GraphContainer />
        </div>
        <TableContainer />

        <iframe src={"https://develop.symphony.com/embed/?module=im&userIds=347583113330922,347583113330926&theme=light&font=xsmall"} />
      </div>
    )
  }
}

// =============================================================================
// connect component with redux

const mapStateToProps = state => {
  return { test: 0 }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDashboardData: () => dispatch(onInitDashboard())
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)

export {DashboardContainer}
