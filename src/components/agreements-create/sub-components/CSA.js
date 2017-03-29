import React from 'react'
import ReferenceSectionGroup from './sub-components/ReferenceSectionGroup'
import ReferenceCallType from './sub-components/ReferenceCallType'
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

export default class CSA extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSplit: false,
      [STATE_PROPERTY_SPLIT_VARIATON]: false,
      [STATE_PROPERTY_SPLIT_INITIAL]: false,
      [STATE_PROPERTY_SPLIT_NETTED]: false,
      currentActiveType: BASIC_GROUP
    }

    this.updateBaseInstanceVariable = this.updateBaseInstanceVariable.bind(this)
    this.updateActiveType = this.updateActiveType.bind(this)
    this.updateSplitFlagAndActive = this.updateSplitFlagAndActive.bind(this)
  }

  /**
   * After updating, do the focus to the appropriate textbox
   *
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.propIsDisplay) {
      switch (this.state.currentActiveType) {
        case BASIC_GROUP:
          this.csaInput.focus()
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
          this.csaInput.focus()
      }
    }
  }

  /**
   * To update the instance variable with dom reference
   *
   * @param domConst
   * @param dom
   */
  updateBaseInstanceVariable(domConst, dom) {
    this[domConst] = dom
  }

  updateActiveType(type) {
    this.setState({currentActiveType: type})
  }

  updateSplitFlagAndActive(splitByRoleState, baseGroup, pledgorGroup,
                           splitByRoleStateProperty) {
    this.setState({
      [splitByRoleStateProperty]: !splitByRoleState,
      currentActiveType: splitByRoleState ?
        baseGroup : pledgorGroup
    })
  }

  render() {
    const {
      propIsDisplay,
      propIsCsa,
      propToggleCsa
    } = this.props

    return <div className={propIsDisplay ? styles.createContentFlexFour : styles.hideForm}>

      <div className={styles.rowGroup}>
        <div className={styles.line + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={propIsCsa}
                        propOnToggle={() => propToggleCsa()}/>
          &nbsp;CSA References
        </div>
      </div>

      <div className={styles.rowGroup}>
        <div className={styles.line}>CSA References</div>
        <div className={styles.line}>
          <input type="text" className={this.state.isSplit ? styles.inputTextBoxDisabled :
            styles.inputTextBox} ref={(dom) => this.csaInput = dom} disabled={this.state.isSplit}/>
        </div>

      </div>

      <div className={styles.rowGroup}>
        <div className={styles.line + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isSplit}
                        propOnToggle={() =>
                          this.setState({
                            isSplit: !this.state.isSplit,
                            currentActiveType: this.state.isSplit ? BASIC_GROUP :
                              (this.state.iSplitByRoleVariation ? VARIATION_PLEDGOR_GROUP : VARIATION_GROUP)
                          })}/>

          &nbsp;Split by Call Type
        </div>
      </div>

      {this.state.isSplit && <div className={styles.flexCont}>

        <ReferenceCallType
          contClass={styles.agreementsSectionLeft} splitByRoleState={this.state[STATE_PROPERTY_SPLIT_VARIATON]}
          baseGroup={VARIATION_GROUP} baseDisplay={'Variable Reference'} baseDom={VARIATION_DOM}
          pledgorGroup={VARIATION_PLEDGOR_GROUP} pledgorDisplay={'Variation Pledgor Reference'}
          pledgorDom={VARIATION_PLEDGOR_DOM}
          securedGroup={VARIATION_SECURED_GROUP} securedDisplay={'Variation Secured Reference'}
          securedDom={VARIATION_SECURED_DOM}
          handlerUpdateInstanceVariable={this.updateBaseInstanceVariable}
          handlerUpdateActiveType={this.updateActiveType}
          splitByRoleStateProperty={STATE_PROPERTY_SPLIT_VARIATON}
          handlerUpdateSplitFlagAndActive={this.updateSplitFlagAndActive}/>

        <ReferenceCallType
          contClass={styles.agreementsSectionMiddle} splitByRoleState={this.state[STATE_PROPERTY_SPLIT_INITIAL]}
          baseGroup={INITIAL_GROUP} baseDisplay={'Initial Reference'} baseDom={INITIAL_DOM}
          pledgorGroup={INITIAL_PLEDGOR_GROUP} pledgorDisplay={'Initial Pledgor Reference'}
          pledgorDom={INITIAL_PLEDGOR_DOM}
          securedGroup={INITIAL_SECURED_GROUP} securedDisplay={'Initial Secured Reference'}
          securedDom={INITIAL_SECURED_DOM}
          handlerUpdateInstanceVariable={this.updateBaseInstanceVariable}
          handlerUpdateActiveType={this.updateActiveType}
          splitByRoleStateProperty={STATE_PROPERTY_SPLIT_INITIAL}
          handlerUpdateSplitFlagAndActive={this.updateSplitFlagAndActive}/>

        <ReferenceCallType
          contClass={styles.agreementsSectionRight} splitByRoleState={this.state[STATE_PROPERTY_SPLIT_NETTED]}
          baseGroup={NETTED_GROUP} baseDisplay={'Netted Reference'} baseDom={NETTED_DOM}
          pledgorGroup={NETTED_PLEDGOR_GROUP} pledgorDisplay={'Netted Pledgor Reference'}
          pledgorDom={NETTED_PLEDGOR_DOM}
          securedGroup={NETTED_SECURED_GROUP} securedDisplay={'Netted Secured Reference'}
          securedDom={NETTED_SECURED_DOM}
          handlerUpdateInstanceVariable={this.updateBaseInstanceVariable}
          handlerUpdateActiveType={this.updateActiveType}
          splitByRoleStateProperty={STATE_PROPERTY_SPLIT_NETTED}
          handlerUpdateSplitFlagAndActive={this.updateSplitFlagAndActive}/>

      </div>}

      <ReferenceSectionGroup propIsActiveGroup={(this.state.currentActiveType === BASIC_GROUP)}
                             propLabel={' - CSA'}/>

      <div>
        <ReferenceSectionGroup propIsActiveGroup={(this.state.currentActiveType === VARIATION_GROUP)}
                               propLabel={' - CSA Variation'}/>
        <ReferenceSectionGroup propIsActiveGroup={(this.state.currentActiveType === VARIATION_PLEDGOR_GROUP)}
                               propLabel={' - CSA Variation Pledgor'}
                               propIsRemoveExposureFromCallDriver/>
        <ReferenceSectionGroup propIsActiveGroup={(this.state.currentActiveType === VARIATION_SECURED_GROUP)}
                               propLabel={' - CSA Variation Secured'}
                               propIsRemoveExposureFromCallDriver/>
      </div>

      <div>
        <ReferenceSectionGroup propIsActiveGroup={(this.state.currentActiveType === INITIAL_GROUP)}
                               propLabel={' - CSA Initial'}/>
        <ReferenceSectionGroup propIsActiveGroup={(this.state.currentActiveType === INITIAL_PLEDGOR_GROUP)}
                               propLabel={' - CSA Initial Pledgor'}
                               propIsRemoveExposureFromCallDriver/>
        <ReferenceSectionGroup propIsActiveGroup={(this.state.currentActiveType === INITIAL_SECURED_GROUP)}
                               propLabel={' - CSA Initial Secured'}
                               propIsRemoveExposureFromCallDriver/>
      </div>

      <div>
        <ReferenceSectionGroup propIsActiveGroup={(this.state.currentActiveType === NETTED_GROUP)}
                               propLabel={' - CSA Netted'}/>
        <ReferenceSectionGroup propIsActiveGroup={(this.state.currentActiveType === NETTED_PLEDGOR_GROUP)}
                               propLabel={' - CSA Netted Pledgor'}
                               propIsRemoveExposureFromCallDriver/>
        <ReferenceSectionGroup propIsActiveGroup={(this.state.currentActiveType === NETTED_SECURED_GROUP)}
                               propLabel={' - CSA Netted Secured'}
                               propIsRemoveExposureFromCallDriver/>
      </div>

    </div>
  }
}