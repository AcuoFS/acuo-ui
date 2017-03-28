import React from 'react'
import {
  ReferencesCallDriver,
  ReferencesCallIssuance,
  ReferencesMarginTerms
} from './references-sections'
import ToggleSwitch from '../../common/ToggleSwitch'
import styles from './ContentBody.css'


export default class Regulatory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSplit: false,
      iSplitByRoleVariation: false,
      iSplitByRoleInitial: false,
      iSplitByRoleNetted: false,
      currentActiveGroup: 'BASIC'
    }
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
            styles.inputTextBox} disabled={this.state.isSplit}/>
        </div>
      </div>

      <div className={styles.rowGroup}>
        <div className={styles.line + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isSplit}
                        propOnToggle={() =>
                          this.setState({
                            isSplit: !this.state.isSplit,
                            currentActiveGroup: this.state.isSplit ? 'BASIC' : 'VARIATION_GROUP'
                          })}/>
          &nbsp;Split by Call Type
        </div>
      </div>

      {this.state.isSplit && <div className={styles.flexCont}>
        <div className={styles.agreementsSectionLeft}>
          <div className={styles.rowGroup}>
            <div className={styles.line}>Variable Reference</div>
            <div className={styles.line}>
              <input type="text" className={this.state.iSplitByRoleVariation ?
                styles.inputTextBoxDisabled : styles.inputTextBox}
                     disabled={this.state.iSplitByRoleVariation}
              onFocus={() => this.setState({currentActiveGroup: 'VARIATION_GROUP'})}/>

            </div>
          </div>
          <div className={styles.rowGroup}>
            <div className={styles.line + ' ' + styles.flexLine}>
              <ToggleSwitch propIsOn={this.state.iSplitByRoleVariation}
                            propOnToggle={() => this.setState({
                              iSplitByRoleVariation: !this.state.iSplitByRoleVariation,
                              currentActiveGroup: this.state.iSplitByRoleVariation ?
                                'VARIATION_GROUP' : 'VARIATION_PLEDGOR_GROUP'
                            })}/>
              &nbsp;Split by Role
            </div>
          </div>

          {this.state.iSplitByRoleVariation && <div className={styles.flexColumn}>
            <div className={styles.rowGroup}>
              <div className={styles.line}>Variation Pledgor Reference</div>
              <div className={styles.line}>
                <input type="text" className={styles.inputTextBox}
                       onFocus={() => this.setState({currentActiveGroup: 'VARIATION_PLEDGOR_GROUP'})}/>

              </div>
            </div>
            <div className={styles.rowGroup}>
              <div className={styles.line}>Variation Secured Reference</div>
              <div className={styles.line}>
                <input type="text" className={styles.inputTextBox}
                       onFocus={() => this.setState({currentActiveGroup: 'VARIATION_SECURED_GROUP'})}/>

              </div>
            </div>
          </div>}

        </div>
        <div className={styles.agreementsSectionMiddle}>
          <div className={styles.rowGroup}>
            <div className={styles.line}>Initial Reference</div>
            <div className={styles.line}>
              <input type="text" className={this.state.iSplitByRoleInitial ? styles.inputTextBoxDisabled :
                styles.inputTextBox} disabled={this.state.iSplitByRoleInitial}/>
            </div>
          </div>
          <div className={styles.rowGroup}>
            <div className={styles.line + ' ' + styles.flexLine}>
              <ToggleSwitch propIsOn={this.state.iSplitByRoleInitial}
                            propOnToggle={() => this.setState({
                              iSplitByRoleInitial: !this.state.iSplitByRoleInitial
                            })}/>
              &nbsp;Split by Role
            </div>
          </div>

          {this.state.iSplitByRoleInitial && <div className={styles.flexColumn}>
            <div className={styles.rowGroup}>
              <div className={styles.line}>Initial Pledgor Reference</div>
              <div className={styles.line}>
                <input type="text" className={styles.inputTextBox}/>
              </div>
            </div>
            <div className={styles.rowGroup}>
              <div className={styles.line}>Initial Secured Reference</div>
              <div className={styles.line}>
                <input type="text" className={styles.inputTextBox}/>
              </div>
            </div>
          </div>}

        </div>

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

      <div className={(this.state.currentActiveGroup !== 'BASIC') && styles.hideForm}>
        <ReferencesCallDriver propIsMenuRegulatory
                              propPostfixLabel={' - Regulatory CSA'}/>
        <ReferencesMarginTerms propIsMenuRegulatory
                               propPostfixLabel={' - Regulatory CSA'}/>
        <ReferencesCallIssuance propIsMenuRegulatory
                                propPostfixLabel={' - Regulatory CSA'}/>
      </div>

      <div className={(this.state.currentActiveGroup !== 'VARIATION_GROUP') && styles.hideForm}>
        <ReferencesCallDriver propIsMenuRegulatory
                              propPostfixLabel={' - Regulatory CSA Variation'}/>
        <ReferencesMarginTerms propIsMenuRegulatory
                               propPostfixLabel={' - Regulatory CSA Variation'}/>
        <ReferencesCallIssuance propIsMenuRegulatory
                                propPostfixLabel={' - Regulatory CSA Variation'}/>
      </div>

      <div className={(this.state.currentActiveGroup !== 'VARIATION_PLEDGOR_GROUP') && styles.hideForm}>
        <ReferencesCallDriver propIsMenuRegulatory
                              propPostfixLabel={' - Regulatory CSA Variation Pledgor'}/>
        <ReferencesMarginTerms propIsMenuRegulatory
                               propPostfixLabel={' - Regulatory CSA Variation Pledgor'}/>
        <ReferencesCallIssuance propIsMenuRegulatory
                                propPostfixLabel={' - Regulatory CSA Variation Pledgor'}/>
      </div>

      <div className={(this.state.currentActiveGroup !== 'VARIATION_SECURED_GROUP') && styles.hideForm}>
        <ReferencesCallDriver propIsMenuRegulatory
                              propPostfixLabel={' - Regulatory CSA Variation Secured'}/>
        <ReferencesMarginTerms propIsMenuRegulatory
                               propPostfixLabel={' - Regulatory CSA Variation Secured'}/>
        <ReferencesCallIssuance propIsMenuRegulatory
                                propPostfixLabel={' - Regulatory CSA Variation Secured'}/>
      </div>

    </div>
  }
}