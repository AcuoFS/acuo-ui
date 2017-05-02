import React from 'react'
import sharedStyles from '../../pledge/Pledge.css'
import styles from '../OptimisationWidget.css'
import {checkNegative} from '../../../utils'

class AnalysisWidget extends React.Component {
  render() {
    return (
      <div className={styles.row + ' ' + (this.props.isActive ? styles.active : styles.inactive) } onClick={(e) => this.props.toggle(this.props.name)}>
          <label>
            <div className={styles.cell}>
                <input type="radio" value={this.props.name} name="settings" className={styles.radioButton}/>
                <span className={styles.indicator}></span>
            </div>
            <div className={styles.cell}>
              {this.props.name}
            </div>
            <div className={styles.cell}>
              {checkNegative(this.props.cost)}
            </div>
            <div className={styles.cell}>
              {checkNegative(this.props.savings)}
            </div>
            <div className={styles.cell}>
              {this.props.ratio}
            </div>
            <div className={styles.cell}>
              &nbsp;
            </div>
          </label>
      </div>
    )
  }
}

export default AnalysisWidget
