import React from 'react'

import styles from './navbar.css'
import NavItem from './sub-components/navbar-item'

class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            clicked: false,
            uploadDropdown: styles.close
        }
        this.clickedDropdown = this.clickedDropdown.bind(this)
    }
    clickedDropdown(){
        if(!this.state.clicked){
            this.setState({
                clicked: !this.state.clicked,
                uploadDropdown: styles.open
            })
        }else{
            this.setState({
                clicked: !this.state.clicked,
                uploadDropdown: styles.close
            })
        }
    }
    render(){
        return (
            <nav className={styles.nav}>

                <div className={styles.logoContainer}>
                    <div className={styles.vertiCenter}>
                        <img className={styles.centerThis} src={'./images/dashboard/navbar/logo.png'} alt=""/>
                    </div>

                </div>

                <div className={styles.pageTitle}>
                    <div className={styles.vertiCenter}>
                        <p className={styles.centerThis}>Dashboard</p>
                    </div>
                </div>

                <NavItem label='Reconcile' />

                <NavItem label='Disputes' />

                <NavItem label='Pledge' />

                <NavItem label='Deployed' />

                <NavItem label='Analytics' />

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

                <div className={styles.uploadPortfolio}>
                    <div className={styles.uploadButtonVertiCenter}>
                        <form className={styles.centerThis} action="" onSubmit="">
                            <div className={styles.dropdown} onClick={this.clickedDropdown}>
                                <div className={styles.text}>upload portfolio</div>
                                <div className={styles.arrow}></div>

                                <ul className={styles.dropdownList + ' ' + this.state.uploadDropdown}>
                                    <li>item1</li>
                                    <li>item1</li>
                                    <li>item1</li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={styles.menuIcon}>
                    <div className={styles.vertiCenter}>
                        <p className={styles.centerThis}>
                            <img src={'./images/dashboard/navbar/settings.png'} alt=""/>
                        </p>
                    </div>
                </div>

                <div className={styles.menuIcon}>
                    <div className={styles.vertiCenter}>
                        <p className={styles.centerThis}>
                            <img src={'./images/dashboard/navbar/logout.png'} alt=""/>
                        </p>
                    </div>
                </div>

            </nav>
        )
    }
}

export default Nav