/**
 * Created by Rui on 26/9/17.
 */
import React from 'react'
import styles from './Chat.css'

export default ({minimised, opened, onToggleMinimise, onToggleOpen}) => (
  <div className={styles.container + ' ' + (!opened ? styles.closed : '')}>
    <div className={styles.chatWindow + ' ' + (minimised ? styles.minimised : '')} >
      <div className={styles.controlBar} onClick={onToggleMinimise}>
        <div>
          <img className={styles.logo} src={'./images/dashboard/navbar/symphony.png'} alt=""/>
        </div>
        <div className={styles.controls}>
          <div>_</div>
          <div onClick={onToggleOpen}>X</div>
        </div>

      </div>
      <div className={styles.tempIframe}>
        <iframe className={styles.iframe} src={"https://develop.symphony.com/embed/?module=im&userIds=347583113330922,347583113330926&theme=light&font=xsmall"} />
      </div>
    </div>
  </div>
)