import React from 'react'
import { connect } from 'react-redux'
import { TwoFA_Container } from './../../containers'
import styles from './TwoFA_Page.css'

const TwoFA = () => (
  <div className={styles.page}>
    <TwoFA_Container />
  </div>
)

const TwoFA_Page = connect()(TwoFA)

export { TwoFA_Page }
