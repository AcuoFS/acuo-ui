import React from 'react'
import ToggleSwitch from '../../common/ToggleSwitch'
import styles from './ContentBody.css'


export default class WorkflowOptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEnableMarginCall: false,
      isAllowMultipleCalls: false,
      isEnableVariation: false,
      isVariationByCurrency: false,
      isEnableInitial: false,
      isInitialByCurrency: false,
      isContingentRelease: false,
      isExpectedMatching: false,
      isAllowNetting: false,
      isAllowNettingInitialVariation: false
    }

  }

  render() {
    const {propIsDisplay} = this.props

    return <div className={propIsDisplay ? styles.createContentFlexTwo : styles.hideForm}>

      <div className={styles.workflowLine + ' ' + styles.flexLine}>
        <ToggleSwitch propIsOn={this.state.isEnableMarginCall}
                      propOnToggle={() =>
                        this.setState({
                          isEnableMarginCall: !this.state.isEnableMarginCall
                        })}/>
        &nbsp;Enable Margin Call
      </div>

      {this.state.isEnableMarginCall &&
      <div className={styles.workflowGroup}>

        <div className={styles.workflowLine + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isAllowMultipleCalls}
                        propOnToggle={() =>
                          this.setState({
                            isAllowMultipleCalls: !this.state.isAllowMultipleCalls
                          })}/>
          &nbsp;Allow Multiple Calls per day
        </div>


        <div className={styles.workflowLine + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isEnableVariation}
                        propOnToggle={() =>
                          this.setState({
                            isEnableVariation: !this.state.isEnableVariation
                          })}/>
          &nbsp;Enable Variation Calls
        </div>


        {this.state.isEnableVariation &&
        <div className={styles.workflowLine + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isVariationByCurrency}
                        propOnToggle={() =>
                          this.setState({
                            isVariationByCurrency: !this.state.isVariationByCurrency
                          })}/>
          &nbsp;Select Variation Calls by Currency
        </div>}

        <div className={styles.workflowLine + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isEnableInitial}
                        propOnToggle={() =>
                          this.setState({
                            isEnableInitial: !this.state.isEnableInitial
                          })}/>
          &nbsp;Enable Initial Calls
        </div>

        {this.state.isEnableInitial &&
        <div className={styles.workflowLine + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isInitialByCurrency}
                        propOnToggle={() =>
                          this.setState({
                            isInitialByCurrency: !this.state.isInitialByCurrency
                          })}/>
          &nbsp;Select Initial Calls by Currency
        </div>}

        <div className={styles.workflowLine + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isContingentRelease}
                        propOnToggle={() =>
                          this.setState({
                            isContingentRelease: !this.state.isContingentRelease
                          })}/>
          &nbsp;Contingent Release Pledge Accept
        </div>

        <div className={styles.workflowLine + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isExpectedMatching}
                        propOnToggle={() =>
                          this.setState({
                            isExpectedMatching: !this.state.isExpectedMatching
                          })}/>
          &nbsp;Expected Call Type Matching
        </div>

        <div className={styles.workflowLine + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isAllowNetting}
                        propOnToggle={() =>
                          this.setState({
                            isAllowNetting: !this.state.isAllowNetting
                          })}/>
          &nbsp;Allow Netting
        </div>

        {this.state.isEnableVariation && this.state.isEnableInitial &&
        <div className={styles.workflowLine + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isAllowNettingInitialVariation}
                        propOnToggle={() =>
                          this.setState({
                            isAllowNettingInitialVariation: !this.state.isAllowNettingInitialVariation
                          })}/>
          &nbsp;Allow Netting Initial/Variation
        </div>}

      </div>}

    </div>
  }
}