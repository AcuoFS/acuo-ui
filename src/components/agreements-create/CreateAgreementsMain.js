import React from 'react'
import {SimpleCenteredPopup} from '../common/SimpleCenteredPopup'
import TradingEntities from './sub-components/TradingEntities'
import styles from './CreateAgreementsMain.css'


const bigStyle = {
  width: '850px',
  height: '800px'
}

const mediumStyle = {
  width: '850px',
  height: '500px'
}

const smallStyle = {
  width: '600px',
  height: '500px'
}

const MENU_TRADING_ENTITIES = 'MENU_TRADING_ENTITIES'
const MENU_IDENTIFIERS = 'MENU_IDENTIFIERS'
const SUB_CSA = 'SUB_CSA'
const SUB_REGULATORY = 'SUB_REGULATORY'
const MENU_WORKFLOW_OPTIONS = 'MENU_WORKFLOW_OPTIONS'
const MENU_OTHER_DETAILS = 'MENU_OTHER_DETAILS'
const MENU_ASSIGNMENT_DETAILS = 'MENU_ASSIGNMENT_DETAILS'

export class CreateAgreementsMain extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sizeOfPopup: smallStyle,
      isShowExtraDetails: false,
      currentMenu: MENU_TRADING_ENTITIES
    }

    this.handlerMenuItemClick = this.handlerMenuItemClick.bind(this)
  }

  handlerMenuItemClick(menu, windowStyle, showExtra) {
    this.setState({
      sizeOfPopup: windowStyle,
      isShowExtraDetails: showExtra,
      currentMenu: menu
    })
  }

  render() {
    const {propHandlerClosePopup} = this.props
    return (
      <SimpleCenteredPopup handlerClosePopup={propHandlerClosePopup}
                           overridePopupStyle={this.state.sizeOfPopup}>
        <div className={styles.popupBody}>
          <div className={styles.createMenu}>
            <div className={styles.compTitle}>Agreement Details</div>
            <div className={styles.menuBody}>
              <div className={styles.menuItemContainer}>
                <div className={styles.menuItem + ' ' +
                ((this.state.currentMenu == MENU_TRADING_ENTITIES)
                && styles.menuItemSelected)}
                     onClick={() => this.handlerMenuItemClick(MENU_TRADING_ENTITIES, smallStyle, false)}>
                  Trading Entities
                </div>
                <div className={styles.menuItem + ' ' +
                ((this.state.currentMenu == MENU_IDENTIFIERS)
                && styles.menuItemSelected)}
                     onClick={() => this.handlerMenuItemClick(MENU_IDENTIFIERS, mediumStyle, true)}>
                  Identifiers
                </div>

                <div className={styles.subMenuItem}>CSA References</div>
                <div className={styles.subMenuItem}>Regulatory References</div>

                <div className={styles.menuItem + ' ' +
                ((this.state.currentMenu == MENU_WORKFLOW_OPTIONS)
                && styles.menuItemSelected)}
                     onClick={() => this.handlerMenuItemClick(MENU_WORKFLOW_OPTIONS, bigStyle, true)}>
                  Workflow Options
                </div>
                <div className={styles.menuItem}>Other Details</div>
                <div className={styles.menuItem}>Assignment Details</div>
              </div>

              <div className={styles.btnContainer}>
                <button className={styles.createBtnStyle}>Create Agreement</button>
                <button className={styles.resetBtnStyle}>Reset</button>
              </div>

            </div>

          </div>

          {
            <TradingEntities/>
          }

          {
            this.state.isShowExtraDetails &&
            <TradingEntities/>
          }

        </div>

      </SimpleCenteredPopup>

    )
  }

}