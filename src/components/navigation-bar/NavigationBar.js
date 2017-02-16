import React from 'react'
import NavigationBarItem from './NavigationBarItem'
import styles from './NavigationBar.css'


export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    // }
  }

  getLastUpdatedTime() {
    let varTime = new Date(this.props.timeUpdated).toString() || 0
    return varTime.substr(16, 15) + ':' + varTime.substr(31, 2)
  }

  render() {

    return (
      <nav className={styles.nav}>

        <div className={styles.logoContainer}>
          <div className={styles.vertiCenter}>
            <img className={styles.centerThis} src={'./images/dashboard/navbar/logo.png'} alt=""/>
          </div>

        </div>

        <NavigationBarItem selected={this.props.curPage == '/'}
                           label={'Dashboard'}
                           toUrl={'/'}/>
        <NavigationBarItem selected={this.props.curPage == '/recon'}
                           label={'Reconcile'}
                           toUrl={'/recon'}/>
        <NavigationBarItem selected={this.props.curPage == '/disputes'}
                           label={'Disputes'}
                           toUrl={'/disputes'}/>
        <NavigationBarItem selected={this.props.curPage == '/pledge'}
                           label={'Pledge'}
                           toUrl={'/pledge'}/>
        <NavigationBarItem selected={this.props.curPage == '/deployed'}
                           label={'Deployed'}
                           toUrl={'/deployed'}/>
        <NavigationBarItem label={'Analytics'} toUrl={'/analytics'}/>

        {/*<div className={styles.uploadPortfolio}>*/}
        {/*<div className={styles.vertiCenter}>*/}
        {/*<form className={styles.centerThis} action="">*/}
        {/*<select className={styles.uploadDropdown} name="" id="">*/}
        {/*<option value="null">upload portfolio</option>*/}
        {/*<option value="risk">client risk</option>*/}
        {/*<option value="cptyrisk">cpty risk</option>*/}
        {/*<option value="somethingrisk">something risk</option>*/}
        {/*</select>*/}
        {/*</form>*/}
        {/*</div>*/}
        {/*</div>*/}

        <div className={styles.menuIcon} id={styles.navLogout}>
          <div className={styles.vertiCenter}>
            <div className={styles.centerThis}>
              <img src={'./images/dashboard/navbar/logout.png'} alt=""/>
            </div>
          </div>
        </div>

        <div className={styles.menuIcon} id={styles.navSetting}>
          <div className={styles.vertiCenter}>
            <div className={styles.centerThis}>
              <img src={'./images/dashboard/navbar/settings.png'} alt=""/>
            </div>
          </div>
        </div>

        <div className={styles.userInfo}>
          <text id={styles.userId}>user@acuo.com</text>
          <br/>
          <text>Last Updated at {this.getLastUpdatedTime()}</text>
        </div>

      </nav>


    )
  }
}