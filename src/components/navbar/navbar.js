import React from 'react'

import styles from './navbar.css'

class Nav extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <nav className={styles.nav}>
                <div className={styles.logoContainer}>
                    <img src={'./images/dashboard/navbar/logo.png'} alt=""/>
                </div>
                <div className={styles.pageTitle}>
                    <p className={styles.centerThis}>Dashboard</p>
                </div>
                <div className={styles.menuItem}>
                    Reconcile
                </div>
                <div className={styles.menuItem}>
                    Disputes
                </div>
                <div className={styles.menuItem}>
                    Pledge
                </div>
                <div className={styles.menuItem}>
                    Deployed
                </div>
                <div className={styles.menuItem}>
                    Analytics
                </div>
            </nav>
        )
    }
}

export default Nav