import React from 'react'
import {SimpleCenteredPopup} from '../common/SimpleCenteredPopup'
import {
  TradingEntities,
  OtherDetails,
  References,
  CSA
} from './sub-components'
import styles from './CreateAgreementsMain.css'
import tempStyles from './sub-components/ContentBody.css'


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
const MENU_REFERENCES = 'MENU_IDENTIFIERS'
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
      currentMenu: MENU_TRADING_ENTITIES,
      isAgreementTypeSelected: false,
      isCsa: false,
      isRegulatory: false,
      curCreationScreen: ''
    }

    this.createMenuItemDom = this.createMenuItemDom.bind(this)
    this.setAgreementType = this.setAgreementType.bind(this)
    this.toggleCsa = this.toggleCsa.bind(this)
  }

  createMenuItemDom(menuDisplay, menu, styleOfPoppup, isSelected) {
    return (
      <div className={styles.menuItem + ' ' + (isSelected && styles.menuItemSelected)}
           onClick={() => this.setState({
             sizeOfPopup: styleOfPoppup,
             currentMenu: menu
           })}>
        {menuDisplay}
      </div>)
  }

  setAgreementType() {
    this.setState({
      isAgreementTypeSelected: true
    })
  }

  toggleCsa() {
    // Switch current menu to CSA
    if (!this.state.isCsa) {
      this.setState({currentMenu: SUB_CSA})
    }

    this.setState({isCsa: !this.state.isCsa})
  }

  render() {
    const {propHandlerClosePopup} = this.props

    let curCreationScreen

    switch (this.state.currentMenu) {
      case MENU_TRADING_ENTITIES:
        curCreationScreen = <TradingEntities propSetAgreementType={this.setAgreementType}/>
        break
      case MENU_OTHER_DETAILS:
        curCreationScreen = <OtherDetails/>
        break
      case MENU_REFERENCES:
        curCreationScreen = <References
          propIsCsa={this.state.isCsa}
          propIsRegulatory={this.state.isRegulatory}
          propToggleCsa={this.toggleCsa}
          propToggleRegulatory={() => this.setState({isRegulatory: !this.state.isRegulatory})}/>
        break
      case SUB_CSA:
        curCreationScreen = <CSA/>
        break
      default:
        curCreationScreen = <div className={tempStyles.createContent}>WIP</div>
    }


    return (
      <SimpleCenteredPopup handlerClosePopup={propHandlerClosePopup}
                           overridePopupStyle={this.state.sizeOfPopup}>
        <div className={styles.popupBody}>
          <div className={styles.createMenu}>
            <div className={styles.compTitle}>Agreement Details</div>
            <div className={styles.menuBody}>
              <div className={styles.menuItemContainer}>

                {this.createMenuItemDom('Trading Entities', MENU_TRADING_ENTITIES,
                  smallStyle, (this.state.currentMenu == MENU_TRADING_ENTITIES))}

                {this.createMenuItemDom('Agreement References', MENU_REFERENCES,
                  bigStyle, (this.state.currentMenu == MENU_REFERENCES))}

                {
                  this.state.isCsa &&
                  <div className={(this.state.currentMenu == SUB_CSA)
                    ? styles.subMenuItemSelected : styles.subMenuItem}
                       onClick={() => this.setState({currentMenu: SUB_CSA})}>CSA References</div>
                }

                {this.createMenuItemDom('Workflow Options', MENU_WORKFLOW_OPTIONS,
                  bigStyle, (this.state.currentMenu == MENU_WORKFLOW_OPTIONS))}

                {this.createMenuItemDom('Other Details', MENU_OTHER_DETAILS,
                  bigStyle, (this.state.currentMenu == MENU_OTHER_DETAILS))}

                {this.createMenuItemDom('Assignment Details', MENU_ASSIGNMENT_DETAILS,
                  bigStyle, (this.state.currentMenu == MENU_ASSIGNMENT_DETAILS))}

              </div>

              <div className={styles.btnContainer}>
                <button className={styles.createBtnStyle}>Create Agreement</button>
                <button className={styles.resetBtnStyle}>Reset</button>
              </div>

            </div>

          </div>

          {
            curCreationScreen
          }

        </div>

      </SimpleCenteredPopup>

    )
  }

}