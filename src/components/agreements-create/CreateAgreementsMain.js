import React from 'react'
import {SimpleCenteredPopup} from '../common/SimpleCenteredPopup'
import {
  TradingEntities,
  OtherDetails,
  References,
  CSA
} from './sub-components'
import styles from './CreateAgreementsMain.css'

const giantStyle = {
  width: '1200px',
  height: '800px'
}

const bigStyle = {
  width: '1000px',
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
    }

    this.createMenuItemDom = this.createMenuItemDom.bind(this)
    this.setAgreementType = this.setAgreementType.bind(this)
    this.toggleCsa = this.toggleCsa.bind(this)
    this.toggleRegulatory = this.toggleRegulatory.bind(this)
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
    this.setState({
      currentMenu: (this.state.isCsa ? MENU_REFERENCES : SUB_CSA),
      sizeOfPopup: (this.state.isCsa ? bigStyle : giantStyle),
      isCsa: !this.state.isCsa
    })
  }

  toggleRegulatory() {
    // Switch current menu to Regulatory
    if (!this.state.isRegulatory) {
      this.setState({currentMenu: SUB_REGULATORY})
    }

    this.setState({isRegulatory: !this.state.isRegulatory})
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

                {this.createMenuItemDom('Trading Entities', MENU_TRADING_ENTITIES,
                  smallStyle, (this.state.currentMenu == MENU_TRADING_ENTITIES))}

                {this.createMenuItemDom('Agreement References', MENU_REFERENCES,
                  bigStyle, (this.state.currentMenu == MENU_REFERENCES))}

                {
                  this.state.isCsa &&
                  <div className={(this.state.currentMenu == SUB_CSA)
                    ? styles.subMenuItemSelected : styles.subMenuItem}
                       onClick={() => this.setState({
                         currentMenu: SUB_CSA,
                         sizeOfPopup: giantStyle
                       })}>CSA References</div>
                }

                {
                  this.state.isRegulatory &&
                  <div className={(this.state.currentMenu == SUB_REGULATORY)
                    ? styles.subMenuItemSelected : styles.subMenuItem}
                       onClick={() => this.setState({currentMenu: SUB_REGULATORY})}>Regulatory References</div>
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

          <TradingEntities propIsDisplay={this.state.currentMenu == MENU_TRADING_ENTITIES}
                           propSetAgreementType={this.setAgreementType}/>

          <OtherDetails propIsDisplay={this.state.currentMenu == MENU_OTHER_DETAILS}/>

          <References
            propIsCsa={this.state.isCsa}
            propIsRegulatory={this.state.isRegulatory}
            propToggleCsa={this.toggleCsa}
            propToggleRegulatory={this.toggleRegulatory}
            propIsDisplay={this.state.currentMenu == MENU_REFERENCES}/>

          <CSA propIsDisplay={this.state.currentMenu == SUB_CSA}
               propIsCsa={this.state.isCsa}
               propToggleCsa={this.toggleCsa}/>

        </div>

      </SimpleCenteredPopup>

    )
  }

}