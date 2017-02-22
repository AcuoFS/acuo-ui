import React from 'react'
import {SimpleCenteredPopup} from '../common/SimpleCenteredPopup'
import styles from './CreateAgreementsMain.css'


const CreateAgreementsMain = (props) => (
  <SimpleCenteredPopup handlerClosePopup={props.propHandlerClosePopup}>
    <div className={styles.compTitle}>Agreement Details</div>
  </SimpleCenteredPopup>
)

export {CreateAgreementsMain}