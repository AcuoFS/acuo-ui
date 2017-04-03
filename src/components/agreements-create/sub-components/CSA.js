import React from 'react'
import {
  ReferencesCallDriver,
  ReferencesCallIssuance,
  ReferencesMarginTerms
} from './references-sections'
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