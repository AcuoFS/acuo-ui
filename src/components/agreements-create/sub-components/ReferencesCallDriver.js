import React from 'react'
import styles from './ContentBody.css'


export default class ReferencesCallDriver extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCallDriverExpanded: false
    }
  }

  render(){
    return (
      <div>
        <div className={styles.rowGroup}>
          <div className={styles.line}>
            <span className={styles.agreementsSectionHeader}>Call Driver Details</span>
            <span className={this.state.isCallDriverExpanded
              ? styles.upArrow : styles.downArrow}
                  onClick={() => this.setState({
                    isCallDriverExpanded: !this.state.isCallDriverExpanded
                  })}/>
          </div>
        </div>

        {
          this.state.isCallDriverExpanded &&
          <div className={styles.agreementsSectionContainer}>
            <div className={styles.agreementsSectionLeft}>
              Shared Details
              <hr/>
            </div>
            <div className={styles.agreementsSectionRight}>
              Local Details
              <hr/>
            </div>
          </div>
        }
      </div>

    )
  }
}