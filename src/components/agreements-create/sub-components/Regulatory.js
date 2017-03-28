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

const VARIATION_DOM = 'variableInput'
const VARIATION_PLEDGOR_DOM = 'variationPledgorInput'
const VARIATION_SECURED_DOM = 'variationSecuredInput'
const INITIAL_DOM = 'initialInput'
const INITIAL_PLEDGOR_DOM = 'initialPledgorInput'
const INITIAL_SECURED_DOM = 'initialSecuredInput'


export default class Regulatory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSplit: false,
      iSplitByRoleVariation: false,
      iSplitByRoleInitial: false,
      iSplitByRoleNetted: false,
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
        default:
          this.regulatoryInput.focus()
      }
    }
  }

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

  getAfterSplitReference(contClass, splitByRoleState,
                         baseGroup, baseDisplay, baseDom,
                         pledgorGroup, pledgorDisplay, pledgorDom,
                         securedGroup, securedDisplay, securedDom) {

    return <div className={contClass}>
      <div className={styles.rowGroup}>
        <div className={styles.line}>{baseDisplay}</div>
        <div className={styles.line}>
          <input type="text" className={this.state[splitByRoleState] ?
            styles.inputTextBoxDisabled : styles.inputTextBox}
                 disabled={this.state[splitByRoleState]}
                 ref={(dom) => this[baseDom] = dom}
                 onFocus={() => this.setState({currentActiveGroup: baseGroup})}/>

        </div>
      </div>
      <div className={styles.rowGroup}>
        <div className={styles.line + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state[splitByRoleState]}
                        propOnToggle={() => this.setState({
                          [splitByRoleState]: !this.state[splitByRoleState],
                          currentActiveGroup: this.state[splitByRoleState] ?
                            baseGroup : pledgorGroup
                        })}/>
          &nbsp;Split by Role
        </div>
      </div>

      {this.state[splitByRoleState] && <div className={styles.flexColumn}>
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

        {this.getAfterSplitReference(styles.agreementsSectionLeft, 'iSplitByRoleVariation',
          VARIATION_GROUP, 'Variable Reference', VARIATION_DOM,
          VARIATION_PLEDGOR_GROUP, 'Variation Pledgor Reference', VARIATION_PLEDGOR_DOM,
          VARIATION_SECURED_GROUP, 'Variation Secured Reference', VARIATION_SECURED_DOM)}

        {this.getAfterSplitReference(styles.agreementsSectionMiddle, 'iSplitByRoleInitial',
          INITIAL_GROUP, 'Initial Reference', INITIAL_DOM,
          INITIAL_PLEDGOR_GROUP, 'Initial Pledgor Reference', INITIAL_PLEDGOR_DOM,
          INITIAL_SECURED_GROUP, 'Initial Secured Reference', INITIAL_SECURED_DOM)}

        <div className={styles.agreementsSectionRight}>
          <div className={styles.rowGroup}>
            <div className={styles.line}>Netted Reference</div>
            <div className={styles.line}>
              <input type="text" className={this.state.iSplitByRoleNetted ? styles.inputTextBoxDisabled :
                styles.inputTextBox} disabled={this.state.iSplitByRoleNetted}/>
            </div>
          </div>
          <div className={styles.rowGroup}>
            <div className={styles.line + ' ' + styles.flexLine}>
              <ToggleSwitch propIsOn={this.state.iSplitByRoleNetted}
                            propOnToggle={() => this.setState({
                              iSplitByRoleNetted: !this.state.iSplitByRoleNetted
                            })}/>
              &nbsp;Split by Role
            </div>
          </div>

          {this.state.iSplitByRoleNetted && <div className={styles.flexColumn}>
            <div className={styles.rowGroup}>
              <div className={styles.line}>Netted Pledgor Reference</div>
              <div className={styles.line}>
                <input type="text" className={styles.inputTextBox}/>
              </div>
            </div>
            <div className={styles.rowGroup}>
              <div className={styles.line}>Netted Secured Reference</div>
              <div className={styles.line}>
                <input type="text" className={styles.inputTextBox}/>
              </div>
            </div>
          </div>}

        </div>

      </div>}

      {this.getReferenceSectionGroup(BASIC_GROUP, ' - Regulatory CSA')}

      {this.getReferenceSectionGroup(VARIATION_GROUP, ' - Regulatory CSA Variation')}
      {this.getReferenceSectionGroup(VARIATION_PLEDGOR_GROUP, ' - Regulatory CSA Variation Pledgor')}
      {this.getReferenceSectionGroup(VARIATION_SECURED_GROUP, ' - Regulatory CSA Variation Secured')}

      {this.getReferenceSectionGroup(INITIAL_GROUP, ' - Regulatory CSA Initial')}
      {this.getReferenceSectionGroup(INITIAL_PLEDGOR_GROUP, ' - Regulatory CSA Initial Pledgor')}
      {this.getReferenceSectionGroup(INITIAL_SECURED_GROUP, ' - Regulatory CSA Initial Secured')}

    </div>
  }
}