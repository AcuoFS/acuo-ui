import React from 'react'
import {REMOVE_ASSET_ALLOCATION_URL} from '../../../constants/APIcalls'
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

  closePopup(propHandlerClearPopup, radioCurDom, radioAllDom) {
    // Execute parent's handler
    propHandlerClearPopup()

    // Clear values
    if (radioCurDom) {
      radioCurDom.checked = false
    }
    if (radioAllDom) {
      radioAllDom.checked = false
    }
  }

  onConfirm(radioAllDom, radioCurDom, propOpenedDeselectionPopup, propDeselectAsset, onRemoveAssetFromAllocate, GUID, closePopup) {
    let checkMsg = ''
    if (radioAllDom.checked) {
      onRemoveAssetFromAllocate(propDeselectAsset)
      closePopup()
    }
    if (radioCurDom.checked) {
      onRemoveAssetFromAllocate(propDeselectAsset, [GUID])
      closePopup()
    }



    // todo: fetch request goes here REMOVE_ASSET_ALLOCATION_URL

    //alert('Confirm button clicked. id: ' + propOpenedDeselectionPopup + ', ' + checkMsg)
  }

  // Before change of props
  componentWillReceiveProps(nextProps) {
    // reset values of radio buttons
    if (nextProps.propOpenedDeselectionPopup == '') {
      if (this.radioCurDom) {
        this.radioCurDom.checked = false
      }
      if (this.radioAllDom) {
        this.radioAllDom.checked = false
      }
    }
  }

  render() {
    const {
      propOpenedDeselectionPopup,
      propHandlerClearPopup,
      propDeselectAsset,
      propIsValidFlag,
      propHandlerSetFormValidity,
      onRemoveAssetFromAllocate,
      GUID
    } = this.props

    return (
      <div className={styles.popupPanel + ' ' +
      ((propOpenedDeselectionPopup == '') ? '' : styles.popupShow)}>
        <div className={styles.closeButton} onClick={
          () => this.closePopup(propHandlerClearPopup, this.radioCurDom, this.radioAllDom)
        }>
          x
        </div>
        <div className={styles.popupBody}>
          Exclude this asset from:
          <label className={styles.popupRow}>
            <div className={styles.rowRadio}>
              <input type="radio" name="excludeOption" value="current"
                     ref={dom => this.radioCurDom = dom}
                     onChange={() => {
                       this.validateForm(this.radioCurDom, propHandlerSetFormValidity)
                     }}/>
            </div>
            <div className={styles.rowText}>This margin call only</div>
          </label>
          <label className={styles.popupRow}>
            <div className={styles.rowRadio}>
              <input type="radio" name="excludeOption" value="all"
                     ref={dom => this.radioAllDom = dom}
                     onChange={() => {
                       this.validateForm(this.radioAllDom, propHandlerSetFormValidity)
                     }}/>
            </div>
            <div className={styles.rowText}>All margin statements</div>
          </label>

          <div>
            <button type="submit" className={styles.buttonStyle + ' ' +
            (propIsValidFlag ? styles.buttonEnabled : '')}
                    disabled={!propIsValidFlag}
                    onClick={() => {
                      this.onConfirm(this.radioAllDom, this.radioCurDom, propOpenedDeselectionPopup, propDeselectAsset, onRemoveAssetFromAllocate, GUID, propHandlerClearPopup)
                    }}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }
}
