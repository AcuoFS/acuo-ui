import React from 'react'
import styles from './DeselectionPopup.css'


export default class DeselectionPopup extends React.Component {
  render() {
    const {
      propOpenedDeselectionPopup,
      propHandlerClearPopup
    } = this.props

    return (
      <div className={styles.popupPanel + ' ' +
      ((propOpenedDeselectionPopup == '') ? '' : styles.popupShow)}>
        <div className={styles.closeButton} onClick={propHandlerClearPopup}>
          x
        </div>
        <div className={styles.popupBody}>
          Exclude this asset from:
          <div className={styles.popupRow}>
            <div className={styles.rowRadio}>
              <input type="radio" name="excludeOption" value="current"/>
            </div>
            <div className={styles.rowText}>This margin call only</div>
          </div>
          <div className={styles.popupRow}>
            <div className={styles.rowRadio}>
              <input type="radio" name="excludeOption" value="all"/>
            </div>
            <div className={styles.rowText}>All margin calls</div>
          </div>

          <div>
            <button type="submit" className={styles.buttonStyle}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }
}