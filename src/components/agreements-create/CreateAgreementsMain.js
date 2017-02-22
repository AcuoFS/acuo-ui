import React from 'react'
import {SimpleCenteredPopup} from '../common/SimpleCenteredPopup'
import styles from './CreateAgreementsMain.css'


const CreateAgreementsMain = (props) => (
  <SimpleCenteredPopup handlerClosePopup={props.propHandlerClosePopup}>

    <div className={styles.popupBody}>

      <div className={styles.createMenu}>
        <div className={styles.compTitle}>Agreement Details</div>
        <div className={styles.menuItem + ' ' + styles.menuItemSelected}>Trading Entities</div>
        <div className={styles.menuItem}>Identifiers</div>
        <div className={styles.menuItem}>Workflow Options</div>
        <div className={styles.menuItem}>Other Details</div>
        <div className={styles.menuItem}>Assignment Details</div>

        <div className={styles.btnContainer}>
          <button className={styles.createBtnStyle}>Create Agreement</button>
          <button className={styles.resetBtnStyle}>Reset</button>
        </div>

      </div>
      <div className={styles.createContent}>
        <div className={styles.rowGroup}>
          <div className={styles.line}>Our Legal Entity</div>
          <div className={styles.line}>
            <select className={styles.dropDownStyle}>
              <option value="acuo">Acuo</option>
              <option value="palo">Palo IT</option>
            </select>
          </div>
        </div>
        <div className={styles.rowGroup}>
          <div className={styles.line}>Counterparty Organization</div>
          <div className={styles.line}>
            <select className={styles.dropDownStyle}>
              <option value="a">Counterparty A</option>
              <option value="b">Counterparty B</option>
            </select>
          </div>
        </div>
        <div className={styles.rowGroup}>
          <div className={styles.line}>Counterparty Entity</div>
          <div className={styles.line}>
            <select className={styles.dropDownStyle}>
              <option value="a1">Counterparty A1</option>
              <option value="a7">Counterparty A7</option>
            </select>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>Agreement Type</div>
          <div className={styles.line}>
            <select className={styles.dropDownStyle}>
              <option value="select">Select</option>
              <option value="jpm">JP MORGAN</option>
            </select>
          </div>
        </div>

      </div>
    </div>

  </SimpleCenteredPopup>
)

export {CreateAgreementsMain}