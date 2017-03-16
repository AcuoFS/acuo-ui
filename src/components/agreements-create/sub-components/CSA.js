import React from 'react'
import ReferencesCallDriver from './ReferencesCallDriver'
import ReferencesCallIssuance from './ReferencesCallIssuance'
import ReferencesMarginTerms from './ReferencesMarginTerms'
import ToggleSwitch from '../../common/ToggleSwitch'
import styles from './ContentBody.css'


export default class CSA extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSplit: false
    }
  }

  render() {
    const {propIsDisplay} = this.props

    return <div className={propIsDisplay ? styles.createContentFlexTwo : styles.hideForm}>

      <div className={styles.rowGroup}>
        <div className={styles.line}>CSA References</div>
        <div className={styles.line}>
          <input type="text" className={styles.inputTextBox}/>
        </div>
      </div>

      <div className={styles.rowGroup}>
        <div className={styles.line + ' ' + styles.flexLine}>
          <ToggleSwitch propIsOn={this.state.isSplit}
                        propOnToggle={() => this.setState({isSplit: !this.state.isSplit})}/>
          &nbsp;Split by Call Type
        </div>
      </div>

      <ReferencesCallDriver propIsMenuCsa/>
      <ReferencesMarginTerms propIsMenuCsa/>
      <ReferencesCallIssuance propIsMenuCsa/>

    </div>
  }
}