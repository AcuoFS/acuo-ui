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
      iSplitByRoleNetted: false
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
                        propOnToggle={() => this.setState({isSplit: !this.state.isSplit})}/>
          &nbsp;Split by Call Type
        </div>
      </div>

      {this.state.isSplit && <div className={styles.flexLine}>
        <div className={styles.agreementsSectionLeft}>
          <div className={styles.rowGroup}>
            <div className={styles.line}>Variable Reference</div>
            <div className={styles.line}>
              <input type="text" className={this.state.iSplitByRoleVariation ? styles.inputTextBoxDisabled :
                styles.inputTextBox} disabled={this.state.iSplitByRoleVariation}/>
            </div>
          </div>
          <div className={styles.rowGroup}>
            <div className={styles.line + ' ' + styles.flexLine}>
              <ToggleSwitch propIsOn={this.state.iSplitByRoleVariation}
                            propOnToggle={() => this.setState({iSplitByRoleVariation: !this.state.iSplitByRoleVariation})}/>
              &nbsp;Split by Role
            </div>
          </div>

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
                            propOnToggle={() => this.setState({iSplitByRoleInitial: !this.state.iSplitByRoleInitial})}/>
              &nbsp;Split by Role
            </div>
          </div>
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
                            propOnToggle={() => this.setState({iSplitByRoleNetted: !this.state.iSplitByRoleNetted})}/>
              &nbsp;Split by Role
            </div>
          </div>

        </div>

      </div>}

      <ReferencesCallDriver propIsMenuRegulatory/>
      <ReferencesMarginTerms propIsMenuRegulatory/>
      <ReferencesCallIssuance propIsMenuRegulatory/>

    </div>
  }
}