import React from 'react'
import NavigationBarItem from './NavigationBarItem'
import styles from './NavigationBar.css'
import _ from 'lodash'

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
  }

  getLastUpdatedTime() {
    let varTime = new Date(this.props.timeUpdated).toString() || 0
    return varTime.substr(16, 15) + ':' + varTime.substr(31, 2)
  }

  componentDidMount(){
    this.props.onUpdateNavbarAlert()
  }

  render() {

    const { menuNotifications, email,
      doLogout, onChatOpen } = this.props

    return (
      <nav className={styles.nav}>

        <div className={styles.menuLeft}>
          <div className={styles.logoContainer}>
            <div className={styles.vertiCenter}>
              <img className={styles.centerThis} src={'./images/dashboard/navbar/logo.png'} alt=""/>
            </div>

          </div>

          <NavigationBarItem selected={this.props.curPage === '/'}
                             label={'Dashboard'}
                             toUrl={'/dashboard'}/>
          <NavigationBarItem selected={this.props.curPage === '/recon'}
                             label={'Reconcile'}
                             toUrl={'/recon'}
                             notifications={[_.find(menuNotifications, {"item": "Unrecon"}), _.find(menuNotifications, {"item": "Expected"})]}/>
          <NavigationBarItem selected={this.props.curPage === '/disputes'}
                             label={'Disputes'}
                             toUrl={'/disputes'}
                             notifications={[_.find(menuNotifications, {"item": "ActionDispute"})]}/>
          <NavigationBarItem selected={this.props.curPage === '/pledge'}
                             label={'Pledge'}
                             toUrl={'/pledge'}
                             notifications={[_.find(menuNotifications, {"item": "Reconciled"})]}/>
          <NavigationBarItem selected={this.props.curPage === '/deployed'}
                             label={'Deployed'}
                             toUrl={'/deployed'}/>
          <NavigationBarItem selected={this.props.curPage === '/agreements'}
                             label={'Agreements'}
                             toUrl={'/agreements'}/>

          <NavigationBarItem selected={this.props.curPage === '/analytics'}
                             label={'Analytics'}
                             toUrl={'/analytics'}/>
        </div>

        {/*<div className={styles.filler} />*/}

        <div className={styles.menuRight}>
          <div className={styles.userInfo}>
            <text id={styles.userId}>{email}</text>
            <br/>
            <text>Last Updated at {this.getLastUpdatedTime()}</text>
          </div>

          <div className={styles.menuIcon}>
            <img
              src={'./images/dashboard/navbar/symphony.png'}
              alt=""
              onClick={onChatOpen} />
          </div>

          <div className={styles.menuIcon}>
            <img
              src={'./images/dashboard/navbar/settings.png'}
              title="Feature Coming Soon!"
              alt=""/>
          </div>

          <div className={styles.menuIcon}>
            <img
              src={'./images/dashboard/navbar/logout.png'}
              alt=""
              title="Logout"
              onClick={doLogout}/>
          </div>
        </div>

      </nav>


    )
  }
}
