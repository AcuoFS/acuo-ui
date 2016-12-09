import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './UploadPortfolio.css'


export default class UploadPortfolioButton extends React.Component{
  render(){
    return(
      <div className={styles.titleBar}>
        <div className={styles.uploadPortfolio}>
          <div className={styles.uploadButtonVertiCenter}>
            <div className={styles.centerThis} >
              <Link to={'/upload_portfolio'} className={styles.dropdown + " " +styles.removeUnderLine} >
                <div className={styles.text}>upload portfolio</div>
                <div className={styles.arrow}>
                  <img src={'./images/dashboard/upload_portfolio/arrow_up.png'} alt=""/>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
