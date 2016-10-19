import React from 'react'

import styles from './navbar.css'

class Nav extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <nav className={styles.nav}>
                <img src={''} alt=""/>
            </nav>
        )
    }
}

export default Nav