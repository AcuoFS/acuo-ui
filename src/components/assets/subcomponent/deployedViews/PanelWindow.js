import React from 'react'
import { connect } from 'react-redux'
import styles from './PanelWindow.css'

import RegionView from './RegionView/RegionView.js'

export default class PanelWindow extends React.Component {
  render(){
   return(
    <div className={styles.PanelWindow}>
      <RegionView />
    </div>
   )
  }
}
