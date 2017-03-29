import React from 'react'
import ToggleSwitch from '../../../common/ToggleSwitch'
import styles from '../ContentBody.css'


/**
 * To create Variable, Initial and Netted textboxes(group)
 *
 * @param contClass
 * @param splitByRoleState
 * @param baseGroup
 * @param baseDisplay
 * @param baseDom
 * @param pledgorGroup
 * @param pledgorDisplay
 * @param pledgorDom
 * @param securedGroup
 * @param securedDisplay
 * @param securedDom
 * @param handlerUpdateInstanceVariable
 * @param handlerUpdateActiveType
 * @param splitByRoleStateProperty
 * @param handlerUpdateSplitFlagAndActive
 * @constructor
 */
const ReferenceCallType = ({
                                  contClass, splitByRoleState,
                                  baseGroup, baseDisplay, baseDom,
                                  pledgorGroup, pledgorDisplay, pledgorDom,
                                  securedGroup, securedDisplay, securedDom,
                                  handlerUpdateInstanceVariable,
                                  handlerUpdateActiveType,
                                  splitByRoleStateProperty,
                                  handlerUpdateSplitFlagAndActive
                                }) => (
  <div className={contClass}>
    <div className={styles.rowGroup}>
      <div className={styles.line}>{baseDisplay}</div>
      <div className={styles.line}>
        <input type="text" className={splitByRoleState ?
          styles.inputTextBoxDisabled : styles.inputTextBox}
               disabled={splitByRoleState}
               ref={(dom) => handlerUpdateInstanceVariable(baseDom, dom)}
               onFocus={() => handlerUpdateActiveType(baseGroup)}/>

      </div>
    </div>
    <div className={styles.rowGroup}>
      <div className={styles.line + ' ' + styles.flexLine}>
        <ToggleSwitch propIsOn={splitByRoleState}
                      propOnToggle={() => handlerUpdateSplitFlagAndActive(
                        splitByRoleState, baseGroup,
                        pledgorGroup, splitByRoleStateProperty)}/>
        &nbsp;Split by Role
      </div>
    </div>

    {splitByRoleState && <div className={styles.flexColumn}>
      <div className={styles.rowGroup}>
        <div className={styles.line}>{pledgorDisplay}</div>
        <div className={styles.line}>
          <input type="text" className={styles.inputTextBox}
                 ref={(dom) => handlerUpdateInstanceVariable(pledgorDom, dom)}
                 onFocus={() => handlerUpdateActiveType(pledgorGroup)}/>

        </div>
      </div>
      <div className={styles.rowGroup}>
        <div className={styles.line}>{securedDisplay}</div>
        <div className={styles.line}>
          <input type="text" className={styles.inputTextBox}
                 ref={(dom) => handlerUpdateInstanceVariable(securedDom, dom)}
                 onFocus={() => handlerUpdateActiveType(securedGroup)}/>

        </div>
      </div>
    </div>}

  </div>

)

export default ReferenceCallType