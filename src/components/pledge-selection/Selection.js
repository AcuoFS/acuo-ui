import React from 'react'
import styles from './Selection.css'

export default class Selection extends React.Component{
  render(){
    return(
      <div className={styles.panel}>

        <div className={styles.columnContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.titleHolder}>
              <span><img src="./images/pledge/checkbox.png" /></span>
              <span className={styles.panelTitle}>Abc Securities FCM</span>
              <div className={styles.subtitle}>
                ACUO SG - ABC Securities FCM Global Fund
              </div>
            </div>
            <div className={styles.callTitle}>
              Calls Due
            </div>

            <div>
              <div className={styles.group}>

                <div className={styles.firstLevel}>
                  <div className={styles.assetName}>
                    Net Total IM Call
                  </div>
                  <div className={styles.amount}>
                    400,000
                  </div>
                </div>

                <div className={styles.firstLevel}>
                  <div className={styles.assetName}>
                    Net Total IM Call
                  </div>
                  <div className={styles.amount}>
                    400,000
                  </div>
                </div>

              </div>

              <div className={styles.group}>

                <div className={styles.firstLevel}>
                  <div className={styles.assetName}>
                    Net Total IM Call
                  </div>
                  <div className={styles.amount}>
                    400,000
                  </div>
                </div>

                <div className={styles.firstLevel}>
                  <div className={styles.assetName}>
                    Net Total IM Call
                  </div>
                  <div className={styles.amount}>
                    400,000
                  </div>
                </div>

              </div>
            </div>

            <div className={styles.total}>
              <div className={styles.firstLevel}>
                <div className={styles.assetName}>
                  Total
                </div>
                <div className={styles.amount}>
                  400,000
                </div>
              </div>
            </div>

          </div>
          <div className={styles.rightColumn}>
            <div className={styles.rightColHeading}>
              <div className={styles.rightColumnTitle}>
                Selection
              </div>
              <div className={styles.imageRight}>
                <img src={this.props.sideways} onClick={this.props.clicked} alt=""/>
              </div>
            </div>

            <div className={styles.rightColSubSection}>

            </div>

          </div>
        </div>

      </div>
    )
  }
}
