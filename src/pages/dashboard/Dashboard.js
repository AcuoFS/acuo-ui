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

const socket = io('http://localhost:8081/uploadStream');

export class Dashboard extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    if(localStorage.loginAt == undefined || localStorage.loginAt < Date.now()){ hashHistory.push('/') }
    this.props.fetchDashboardData()

    const userName = 'user@acuocpty.com'
    // socket.on('connection', toServer => {
    //   console.log(socket.io.engine.id)
    //
    //   toServer.join(socket.io.engine.id)
    // })

    socket.on('connect', function(){
      console.log('connected')
      // console.log(socket.io.engine.id)
      // socket.on(socket.io.engine.id, data => {
      //   console.log(socket.io.engine.id)
      //   console.log('event', data)
      // })
      //
      // socket.on('test', () => {
      //   console.log('test event')
      // })
      // socket.join(socket.io.engine.id)
      // socket.emit('room', userName)
    })

    socket.on('disconnect', function(){
      console.log('dc')
    });

    socket.on('message', data => {
      console.log(data)
    })

    // console.log(socket)
    // setTimeout(() => {
    //   socket.emit('test', {data: "hi from the UI"})
    // }, 500)
  }


  componentDidMount () {
    window.scrollTo(0, 0)
    if(localStorage.loginAt < Date.now()){ hashHistory.push("/") }
  }

  componentWillUnmount() {
    socket.disconnect()
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
