import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import io from 'socket.io-client'

import { UploadPortfolioButton } from '../../components'
import {
  FilterContainer,
  TableContainer,
  GraphContainer,
  NavigationBarContainer
} from '../../containers'
import styles from './Dashboard.css'
import { onInitDashboard } from '../../actions'

export class Dashboard extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    if(localStorage.loginAt == undefined || localStorage.loginAt < Date.now()){ hashHistory.push('/') }
    this.props.fetchDashboardData()

    const socket = io('http://localhost:8082/uploadStream');

    const userName = 'user@acuocpty.com'

    socket.on('connect', function(){
      console.log('connected')
    });
    socket.on('event', function(data){
      console.log('event', data)
    });
    socket.on('disconnect', function(){
      console.log('dc')
    });

    socket.on(userName, data => {
      console.log(data)
    })

    // setTimeout(() => {
    //   socket.emit('test', {data: "hi from the UI"})
    // }, 500)
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
