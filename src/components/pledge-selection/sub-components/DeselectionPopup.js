import React from 'react'
import {REMOVE_ASSET_ALLOCATION_URL} from '../../../constants/APIcalls'
import styles from './DeselectionPopup.css'
import {checkBox, checkBoxWithTick} from '../../../../images/common'

export default class DeselectionPopup extends React.Component {
  constructor() {
    super()
    this.radioCurDom = null
    this.radioAllDom = null
    this.state = {
      imFlag: false,
      vmFlag: false
    }
  }

  validateForm(radioDom, propHandlerSetFormValidity) {
    if (radioDom && radioDom.checked) {
      // if(radioDom === this.radioAllDom){
      //   if(this.state.imFlag || this.state.vmFlag)
          propHandlerSetFormValidity(true)
      // }else{
      //   propHandlerSetFormValidity(true)
      // }

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

    this.setState({
      imFlag: false,
      vmFlag: false
    })
  }

  onConfirm(radioAllDom, radioCurDom, propOpenedDeselectionPopup, propDeselectAsset, onRemoveAssetFromAllocate, GUID, closePopup, imFlag, vmFlag) {
    let checkMsg = ''
    if (radioAllDom.checked) {
      onRemoveAssetFromAllocate(propDeselectAsset, imFlag, vmFlag)
      closePopup()
    }
    if (radioCurDom.checked) {
      onRemoveAssetFromAllocate(propDeselectAsset, imFlag, vmFlag, [GUID])
      closePopup()
    }



    // todo: fetch request goes here REMOVE_ASSET_ALLOCATION_URL

    //alert('Confirm button clicked. id: ' + propOpenedDeselectionPopup + ', ' + checkMsg)
  }

  // Before change of props
  componentWillReceiveProps(nextProps) {
    // reset values of radio buttons
    if (nextProps.propOpenedDeselectionPopup === '') {
      if (this.radioCurDom) {
        this.radioCurDom.checked = false
      }
      if (this.radioAllDom) {
        this.radioAllDom.checked = false
      }
    }
  }

  vmimFlagCheck(value){
    if(value === 'vm'){
      this.setState({
        vmFlag: !this.state.vmFlag
      })
    }else{
      this.setState({
        imFlag: !this.state.imFlag
      })
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
            <div className={styles.rowText}>This margin statement only</div>
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

          <label className={styles.popupRow}>
            {
              this.radioAllDom && this.radioAllDom.checked &&
                <div className={styles.checkboxHolder}>
                  <span><img onClick={() => this.vmimFlagCheck('vm')} src={this.state.vmFlag ? checkBoxWithTick : checkBox}/> VM</span>
                  <span><img onClick={() => this.vmimFlagCheck('im')} src={this.state.imFlag ? checkBoxWithTick : checkBox}/> IM</span>
                </div>
            }
          </label>

          <div>
            <button type="submit" className={styles.buttonStyle + ' ' +
            (propIsValidFlag ? styles.buttonEnabled : '')}
                    disabled={!propIsValidFlag}
                    onClick={() => {
                      this.onConfirm(this.radioAllDom, this.radioCurDom, propOpenedDeselectionPopup, propDeselectAsset, onRemoveAssetFromAllocate, GUID, propHandlerClearPopup, this.state.imFlag, this.state.vmFlag)
                    }}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }
}
