import React from 'react'
import {SimpleCenteredPopup} from '../common/SimpleCenteredPopup'
import {
  TradingEntities,
  OtherDetails,
  References,
  CSA,
  Regulatory,
  WorkflowOptions
} from './sub-components'
import styles from './CreateAgreementsMain.css'

const giantStyle = {
  width: '1200px',
  height: '800px'
}

const bigStyle = {
  width: '1000px',
  height: '900px'
}

const mediumStyle = {
  width: '600px',
  height: '720px'
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
      sizeOfPopup: mediumStyle,
      currentMenu: MENU_TRADING_ENTITIES,
      isAgreementTypeSelected: false,
      isCsa: false,
      isRegulatory: false,
    }

    this.createMenuItemDom = this.createMenuItemDom.bind(this)
    this.toggleCsa = this.toggleCsa.bind(this)
    this.toggleRegulatory = this.toggleRegulatory.bind(this)
  }

  createMenuItemDom(menuDisplay, menu, styleOfPopup, isSelected) {
    return (
      <div className={styles.menuItem + ' ' + (isSelected && styles.menuItemSelected)}
           onClick={() => this.setState({
             sizeOfPopup: styleOfPopup,
             currentMenu: menu
           })}>
        {menuDisplay}
      </div>)
  }

  toggleCsa() {
    // Switch current menu to CSA
    this.toggleReferencesSub('isCsa', SUB_CSA)
  }

  toggleRegulatory() {
    // Switch current menu to Regulatory
    this.toggleReferencesSub('isRegulatory', SUB_REGULATORY)
  }

  toggleReferencesSub(type, menuConst) {
    this.setState({
      currentMenu: (this.state[type] ? MENU_REFERENCES : menuConst),
      sizeOfPopup: (this.state[type] ? bigStyle : giantStyle),
      [type]: !this.state[type]
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

                {this.createMenuItemDom('Trading Entities', MENU_TRADING_ENTITIES,
                  mediumStyle, (this.state.currentMenu == MENU_TRADING_ENTITIES))}

                {this.createMenuItemDom('Agreement References', MENU_REFERENCES,
                  bigStyle, (this.state.currentMenu == MENU_REFERENCES))}

                {this.state.isCsa &&
                <div className={(this.state.currentMenu == SUB_CSA)
                  ? styles.subMenuItemSelected : styles.subMenuItem}
                     onClick={() => this.setState({
                       currentMenu: SUB_CSA,
                       sizeOfPopup: giantStyle
                     })}>CSA References
                </div>}

                {this.state.isRegulatory &&
                <div className={(this.state.currentMenu == SUB_REGULATORY)
                  ? styles.subMenuItemSelected : styles.subMenuItem}
                     onClick={() => this.setState({
                       currentMenu: SUB_REGULATORY,
                       sizeOfPopup: giantStyle
                     })}>Regulatory References
                </div>}

                {this.createMenuItemDom('Workflow Options', MENU_WORKFLOW_OPTIONS,
                  bigStyle, (this.state.currentMenu == MENU_WORKFLOW_OPTIONS))}

                {this.createMenuItemDom('Other Details', MENU_OTHER_DETAILS,
                  mediumStyle, (this.state.currentMenu == MENU_OTHER_DETAILS))}

                {this.createMenuItemDom('Assignment Details', MENU_ASSIGNMENT_DETAILS,
                  bigStyle, (this.state.currentMenu == MENU_ASSIGNMENT_DETAILS))}

              </div>

              <div className={styles.btnContainer}>
                <button className={styles.createBtnStyle}>Create Agreement</button>
                <button className={styles.resetBtnStyle}>Reset</button>
              </div>

            </div>

          </div>

          <TradingEntities propIsDisplay={this.state.currentMenu == MENU_TRADING_ENTITIES}/>

          <OtherDetails propIsDisplay={this.state.currentMenu == MENU_OTHER_DETAILS}/>

          <References
            propIsCsa={this.state.isCsa}
            propIsRegulatory={this.state.isRegulatory}
            propToggleCsa={this.toggleCsa}
            propToggleRegulatory={this.toggleRegulatory}
            propIsDisplay={this.state.currentMenu == MENU_REFERENCES}/>

          <CSA propIsDisplay={this.state.currentMenu == SUB_CSA}
               propIsReferenceSubOn={this.state.isCsa}
               propToggleCsa={this.toggleCsa}/>

          <Regulatory propIsDisplay={this.state.currentMenu == SUB_REGULATORY}
                      propIsReferenceSubOn={this.state.isRegulatory}
                      propToggleRegulatory={this.toggleRegulatory}/>

          <WorkflowOptions propIsDisplay={this.state.currentMenu == MENU_WORKFLOW_OPTIONS}/>

        </div>

      </SimpleCenteredPopup>

    )
  }

}