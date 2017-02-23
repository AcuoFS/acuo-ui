import React from 'react'
import {SimpleCenteredPopup} from '../common/SimpleCenteredPopup'
import Dropdown from '../Dropdown/Dropdown'
import styles from './CreateAgreementsMain.css'

const bigStyle = {
  width: '1000px',
  height: '700px'
}

const smallStyle = {
  width: '800px',
  height: '600px'
}


export class CreateAgreementsMain extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sizeOfPopup: smallStyle,
      isShowExtraDetails: false
    }

    this.testClick = this.testClick.bind(this)
  }

  toggleDropDown(e) {
  }

  onDropdownItemChange(e) {
  }

  createTestForm() {
    return <div className={styles.createContent}>
      <div className={styles.rowGroup}>
        <div className={styles.line}>Our Legal Entity</div>
        <div className={styles.line}>
          <div className={styles.dropDown}>
            <Dropdown
              handlerOnClick={this.toggleDropDown}
              handleOnSelectedItemChange={this.onDropdownItemChange}
              selectedOption={'Acuo'}
              options={['Acuo', 'Palo IT']}
              activateMouseLeaveEvent/>
          </div>
        </div>
      </div>
      <div className={styles.rowGroup}>
        <div className={styles.line}>Counterparty Organization</div>
        <div className={styles.line}>
          <div className={styles.dropDown}>
            <Dropdown
              handlerOnClick={this.toggleDropDown}
              handleOnSelectedItemChange={this.onDropdownItemChange}
              selectedOption={'Counterparty A'}
              options={['Counterparty A', 'Counterparty B']}
              activateMouseLeaveEvent/>
          </div>
        </div>
      </div>
      <div className={styles.rowGroup}>
        <div className={styles.line}>Counterparty Entity</div>
        <div className={styles.line}>
          <div className={styles.dropDown}>
            <Dropdown
              handlerOnClick={this.toggleDropDown}
              handleOnSelectedItemChange={this.onDropdownItemChange}
              selectedOption={'Counterparty A1'}
              options={['Counterparty A1', 'Counterparty A7']}
              activateMouseLeaveEvent/>
          </div>
        </div>
      </div>

      <div className={styles.rowGroup}>
        <div className={styles.line}>Agreement Type</div>
        <div className={styles.line}>
          <div className={styles.dropDown}>
            <Dropdown
              handlerOnClick={this.toggleDropDown}
              handleOnSelectedItemChange={this.onDropdownItemChange}
              selectedOption={'Select'}
              options={['JP Morgan']}
              activateMouseLeaveEvent/>
          </div>
        </div>
      </div>

    </div>

  }

  testClick() {
    this.setState({
      sizeOfPopup: bigStyle,
      isShowExtraDetails: true
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
                <div className={styles.menuItem + ' ' + styles.menuItemSelected}>Trading Entities</div>
                <div className={styles.menuItem}
                     onClick={() => this.testClick()}>Identifiers
                </div>
                <div className={styles.menuItem}>Workflow Options</div>
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
            this.createTestForm()
          }

          {
            this.state.isShowExtraDetails &&
            this.createTestForm()
          }

        </div>

      </SimpleCenteredPopup>

    )
  }

}