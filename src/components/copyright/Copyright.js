import React from 'react';
import styles from './copyRightStyles.css'

const Copyright = ()=>{
 let windowExtend = ()=>{
  window.scrollBy(0, 100);
 }

 return (
  <div className={styles.footer}
       onMouseOver={ ()=>{console.log("tada"); windowExtend()} } >
   <div className={styles.copyright}>Copyright &#169; 2017</div>
  </div>
 )
}

export default Copyright
