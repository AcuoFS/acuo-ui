import React from 'react'

import styles from '../navbar.css'

class NavItem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className={styles.menuItem}>
                <div className={styles.vertiCenter}>
                    <p className={styles.centerThis}>{this.props.label}</p>
                </div>
            </div>
        )
    }
}

export default NavItem