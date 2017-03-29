import React from 'react'
import {
  ReferencesCallDriver,
  ReferencesCallIssuance,
  ReferencesMarginTerms
} from './references-sections'
import ToggleSwitch from '../../common/ToggleSwitch'
import styles from './ContentBody.css'


const BASIC_GROUP = 'BASIC'
const VARIATION_GROUP = 'VARIATION_GROUP'
const VARIATION_PLEDGOR_GROUP = 'VARIATION_PLEDGOR_GROUP'
const VARIATION_SECURED_GROUP = 'VARIATION_SECURED_GROUP'
const INITIAL_GROUP = 'INITIAL_GROUP'
const INITIAL_PLEDGOR_GROUP = 'INITIAL_PLEDGOR_GROUP'
const INITIAL_SECURED_GROUP = 'INITIAL_SECURED_GROUP'
const NETTED_GROUP = 'NETTED_GROUP'
const NETTED_PLEDGOR_GROUP = 'NETTED_PLEDGOR_GROUP'
const NETTED_SECURED_GROUP = 'NETTED_SECURED_GROUP'

const VARIATION_DOM = 'variableInput'
const VARIATION_PLEDGOR_DOM = 'variationPledgorInput'
const VARIATION_SECURED_DOM = 'variationSecuredInput'
const INITIAL_DOM = 'initialInput'
const INITIAL_PLEDGOR_DOM = 'initialPledgorInput'
const INITIAL_SECURED_DOM = 'initialSecuredInput'
const NETTED_DOM = 'nettedInput'
const NETTED_PLEDGOR_DOM = 'nettedPledgorInput'
const NETTED_SECURED_DOM = 'nettedSecuredInput'

const STATE_PROPERTY_SPLIT_VARIATON = 'iSplitByRoleVariation'
const STATE_PROPERTY_SPLIT_INITIAL = 'iSplitByRoleInitial'
const STATE_PROPERTY_SPLIT_NETTED = 'iSplitByRoleNetted'


export default class Regulatory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSplit: false,
      [STATE_PROPERTY_SPLIT_VARIATON]: false,
      [STATE_PROPERTY_SPLIT_INITIAL]: false,
      [STATE_PROPERTY_SPLIT_NETTED]: false,
      currentActiveGroup: BASIC_GROUP
    }
  }

  /**
   * After updating, do the focus to the appropriate textbox
   *
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.propIsDisplay) {
      switch (this.state.currentActiveGroup) {
        case BASIC_GROUP:
          this.regulatoryInput.focus()
          break;
        case VARIATION_GROUP:
          this[VARIATION_DOM].focus()
          break;
        case VARIATION_PLEDGOR_GROUP:
          this[VARIATION_PLEDGOR_DOM].focus()
          break;
        case VARIATION_SECURED_GROUP:
          this[VARIATION_SECURED_DOM].focus()
          break;
        case INITIAL_GROUP:
          this[INITIAL_DOM].focus()
          break;
        case INITIAL_PLEDGOR_GROUP:
          this[INITIAL_PLEDGOR_DOM].focus()
          break;
        case INITIAL_SECURED_GROUP:
          this[INITIAL_SECURED_DOM].focus()
          break;
        case NETTED_GROUP:
          this[NETTED_DOM].focus()
          break;
        case NETTED_PLEDGOR_GROUP:
          this[NETTED_PLEDGOR_DOM].focus()
          break;
        case NETTED_SECURED_GROUP:
          this[NETTED_SECURED_DOM].focus()
          break;
        default:
          this.regulatoryInput.focus()
      }
    }
  }

  /**
   * To create CallDriver, MarginTerms and CallIssuance sections with the same label
   *
   * @param groupName
   * @param label
   * @returns {XML}
   */
  getReferenceSectionGroup(groupName, label) {
    return <div className={(this.state.currentActiveGroup !== groupName) && styles.hideForm}>
      <ReferencesCallDriver propIsMenuRegulatory
                            propPostfixLabel={label}/>
      <ReferencesMarginTerms propIsMenuRegulatory
                             propPostfixLabel={label}/>
      <ReferencesCallIssuance propIsMenuRegulatory
                              propPostfixLabel={label}/>
    </div>

  }

  /**
   * To create Variable, Initial and Netted textboxes(group)
   *
   * @param contClass
   * @param splitByRoleStateProperty
   * @param baseGroup
   * @param baseDisplay
   * @param baseDom
   * @param pledgorGroup
   * @param pledgorDisplay
   * @param pledgorDom
   * @param securedGroup
   * @param securedDisplay
   * @param securedDom
   * @returns {XML}
   */
  getAfterSplitReferenceGroup(contClass, splitByRoleStateProperty,
                              baseGroup, baseDisplay, baseDom,
                              pledgorGroup, pledgorDisplay, pledgorDom,
                              securedGroup, securedDisplay, securedDom) {

    return <div className={contClass}>
      <div className={styles.rowGroup}>
        <div className={styles.line}>{baseDisplay}</div>
        <div className={styles.line}>
          <input type="text" className={this.state[splitByRoleStateProperty] ?
            styles.inputTextBoxDisabled : styles.inputTextBox}
                 disabled={this.state[splitByRoleStateProperty]}
                 ref={(dom) => this[baseDom] = dom}
                 onFocus={() => this.setState({currentActiveGroup: baseGroup})}/>

        </div>
      </div>
      <div className={styles.rowGroup}>
        <div className={styles.line + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state[splitByRoleStateProperty]}
                        propOnToggle={() => this.setState({
                          [splitByRoleStateProperty]: !this.state[splitByRoleStateProperty],
                          currentActiveGroup: this.state[splitByRoleStateProperty] ?
                            baseGroup : pledgorGroup
                        })}/>
          &nbsp;Split by Role
        </div>
      </div>

      {this.state[splitByRoleStateProperty] && <div className={styles.flexColumn}>
        <div className={styles.rowGroup}>
          <div className={styles.line}>{pledgorDisplay}</div>
          <div className={styles.line}>
            <input type="text" className={styles.inputTextBox}
                   ref={(dom) => this[pledgorDom] = dom}
                   onFocus={() => this.setState({currentActiveGroup: pledgorGroup})}/>

          </div>
        </div>
        <div className={styles.rowGroup}>
          <div className={styles.line}>{securedDisplay}</div>
          <div className={styles.line}>
            <input type="text" className={styles.inputTextBox}
                   ref={(dom) => this[securedDom] = dom}
                   onFocus={() => this.setState({currentActiveGroup: securedGroup})}/>

          </div>
        </div>
      </div>}

    </div>

  }

  render() {
    const {
      propIsDisplay,
      propIsRegulatory,
      propToggleRegulatory
    } = this.props

    return <div className={propIsDisplay ? styles.createContentFlexFour : styles.hideForm}>

      <div className={styles.rowGroup}>
        <div className={styles.line + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={propIsRegulatory}
                        propOnToggle={() => propToggleRegulatory()}/>
          &nbsp;Regulatory References
        </div>
      </div>

      <div className={styles.rowGroup}>
        <div className={styles.line}>Regulatory CSA References</div>
        <div className={styles.line}>
          <input type="text" className={this.state.isSplit ? styles.inputTextBoxDisabled :
            styles.inputTextBox} ref={(dom) => this.regulatoryInput = dom} disabled={this.state.isSplit}/>
        </div>
      </div>

      <div className={styles.rowGroup}>
        <div className={styles.line + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isSplit}
                        propOnToggle={() =>
                          this.setState({
                            isSplit: !this.state.isSplit,
                            currentActiveGroup: this.state.isSplit ? BASIC_GROUP :
                              (this.state.iSplitByRoleVariation ? VARIATION_PLEDGOR_GROUP : VARIATION_GROUP)
                          })}/>
          &nbsp;Split by Call Type
        </div>
      </div>

      {this.state.isSplit && <div className={styles.flexCont}>

        {this.getAfterSplitReferenceGroup(styles.agreementsSectionLeft, STATE_PROPERTY_SPLIT_VARIATON,
          VARIATION_GROUP, 'Variable Reference', VARIATION_DOM,
          VARIATION_PLEDGOR_GROUP, 'Variation Pledgor Reference', VARIATION_PLEDGOR_DOM,
          VARIATION_SECURED_GROUP, 'Variation Secured Reference', VARIATION_SECURED_DOM)}

        {this.getAfterSplitReferenceGroup(styles.agreementsSectionMiddle, STATE_PROPERTY_SPLIT_INITIAL,
          INITIAL_GROUP, 'Initial Reference', INITIAL_DOM,
          INITIAL_PLEDGOR_GROUP, 'Initial Pledgor Reference', INITIAL_PLEDGOR_DOM,
          INITIAL_SECURED_GROUP, 'Initial Secured Reference', INITIAL_SECURED_DOM)}

        {this.getAfterSplitReferenceGroup(styles.agreementsSectionRight, STATE_PROPERTY_SPLIT_NETTED,
          NETTED_GROUP, 'Netted Reference', NETTED_DOM,
          NETTED_PLEDGOR_GROUP, 'Netted Pledgor Reference', NETTED_PLEDGOR_DOM,
          NETTED_SECURED_GROUP, 'Netted Secured Reference', NETTED_SECURED_DOM)}

      </div>}

      {this.getReferenceSectionGroup(BASIC_GROUP, ' - Regulatory CSA')}

      {this.getReferenceSectionGroup(VARIATION_GROUP, ' - Regulatory CSA Variation')}
      {this.getReferenceSectionGroup(VARIATION_PLEDGOR_GROUP, ' - Regulatory CSA Variation Pledgor')}
      {this.getReferenceSectionGroup(VARIATION_SECURED_GROUP, ' - Regulatory CSA Variation Secured')}

      {this.getReferenceSectionGroup(INITIAL_GROUP, ' - CSA Initial')}
      {this.getReferenceSectionGroup(INITIAL_PLEDGOR_GROUP, ' - Regulatory CSA Initial Pledgor')}
      {this.getReferenceSectionGroup(INITIAL_SECURED_GROUP, ' - Regulatory CSA Initial Secured')}

      {this.getReferenceSectionGroup(NETTED_GROUP, ' - CSA Netted')}
      <div className={(this.state.currentActiveGroup !== NETTED_PLEDGOR_GROUP) && styles.hideForm}>
        <ReferencesCallDriver propIsMenuRegulatory
                              propPostfixLabel={' - Regulatory CSA Netted Pledgor'}
                              propIsRemoveExposure/>
        <ReferencesMarginTerms propIsMenuRegulatory
                               propPostfixLabel={' - CSA Netted Pledgor'}/>
        <ReferencesCallIssuance propIsMenuRegulatory
                                propPostfixLabel={' - CSA Netted Pledgor'}/>
      </div>
      <div className={(this.state.currentActiveGroup !== NETTED_SECURED_GROUP) && styles.hideForm}>
        <ReferencesCallDriver propIsMenuRegulatory
                              propPostfixLabel={' - CSA Netted Secured'}
                              propIsRemoveExposure/>
        <ReferencesMarginTerms propIsMenuRegulatory
                               propPostfixLabel={' - Regulatory CSA Netted Secured'}/>
        <ReferencesCallIssuance propIsMenuRegulatory
                                propPostfixLabel={' - Regulatory CSA Netted Secured'}/>
      </div>



    </div>
  }
}