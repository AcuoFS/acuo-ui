import React from 'react'
import styles from './Selection.css'

export default class Selection extends React.Component{
  render(){
    return(
      <div className={styles.panel}>

        <div className={styles.columnContainer}>
          <div className={styles.leftColumn}>

            <div className={styles.panelTitle}>Abc Securities FCM</div>
          </div>
          <div className={styles.rightColumn}>
            something
          </div>
        </div>

      </div>
    )
  }
}
