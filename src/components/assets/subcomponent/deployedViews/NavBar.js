import React from 'react'
import styles from './NavBar.css'

export const NavBarDeployed = (props)=>{
   return(
    <div className={styles.navbar}>
      {props.children}
    </div>
   )
}

export const NavBarHome = (props)=>{
   return(
    <div className={styles.navbarHome}>
      {props.children}
    </div>
   )
}

// export default NavBar
