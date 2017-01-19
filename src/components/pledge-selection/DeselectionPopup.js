import React from 'react'
import styles from './DeselectionPopup.css'


export default class DeselectionPopup extends React.Component {
  constructor() {
    super()

    this.radioCurDom = null
    this.radioAllDom = null
  }

  validateForm(radioDom, propHandlerSetFormValidity) {
    if (radioDom && radioDom.checked) {
      propHandlerSetFormValidity(true)
    }
  }

  closePopup(comp, propHandlerClearPopup, radioCurDom, radioAllDom) {
    // Execute parent's handler
    propHandlerClearPopup()

    // Clear values
    comp.setState({isValidForm: false})
    if(radioCurDom){
      radioCurDom.checked = false
    }
    if(radioAllDom){
      radioAllDom.checked = false
    }
  }

  render() {
    const {
      propOpenedDeselectionPopup,
      propHandlerClearPopup,
      propIsValidFlag,
      propHandlerSetFormValidity
    } = this.props

    // reset values of radio buttons
    if(propOpenedDeselectionPopup == ''){
      if(this.radioCurDom){
        this.radioCurDom.checked = false
      }
      if(this.radioAllDom){
        this.radioAllDom.checked = false
      }
    }

    return (
      <div className={styles.popupPanel + ' ' +
      ((propOpenedDeselectionPopup == '') ? '' : styles.popupShow)}>
        <div className={styles.closeButton} onClick={
          () => this.closePopup(this, propHandlerClearPopup, this.radioCurDom, this.radioAllDom)
        }>
          x
        </div>
        <div className={styles.popupBody}>
          Exclude this asset from:
          <div className={styles.popupRow}>
            <div className={styles.rowRadio}>
              <input type="radio" name="excludeOption" value="current"
                     ref={dom => this.radioCurDom = dom}
                     onChange={() => {
                       this.validateForm(this.radioCurDom, propHandlerSetFormValidity)
                     }}/>
            </div>
            <div className={styles.rowText}>This margin call only</div>
          </div>
          <div className={styles.popupRow}>
            <div className={styles.rowRadio}>
              <input type="radio" name="excludeOption" value="all"
                     ref={dom => this.radioAllDom = dom}
                     onChange={() => {
                       this.validateForm(this.radioAllDom, propHandlerSetFormValidity)
                     }}/>
            </div>
            <div className={styles.rowText}>All margin calls</div>
          </div>

          <div>
            <button type="submit" className={styles.buttonStyle + ' ' +
            (propIsValidFlag ? styles.buttonEnabled : '')}
                    disabled={!propIsValidFlag}
                    onClick={() => {
                      let checkMsg = ''
                      if (this.radioAllDom.checked) {
                        checkMsg = 'All calls is selected'
                      }
                      if (this.radioCurDom.checked) {
                        checkMsg = 'Current call is selected'
                      }
                      alert('Confirm button clicked. id: ' + propOpenedDeselectionPopup + ', ' + checkMsg)
                    }}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }
}