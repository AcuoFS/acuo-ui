import React from 'react'
import styles from './popup-allocate.css'


export default class AllocatePopup extends React.Component{

 render(){
  return(
   <div className={styles.bgScreen}>
    <div className={styles.popupHolder} >
      <div className={styles.popup}>
       Allocate Popup
      </div>
    </div>
   </div>
  )
 }

}
