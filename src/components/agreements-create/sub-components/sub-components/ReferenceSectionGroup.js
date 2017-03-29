import React from 'react'
import {
  ReferencesCallDriver,
  ReferencesCallIssuance,
  ReferencesMarginTerms
} from '../references-sections'
import styles from '../ContentBody.css'

/**
 * To create CallDriver, MarginTerms and CallIssuance sections with the same label
 *
 * @param propIsActiveGroup
 * @param propLabel
 * @param propIsRemoveExposureFromCallDriver
 * @constructor
 */
const ReferenceSectionGroup = ({
                                 propIsActiveGroup,
                                 propLabel,
                                 propIsRemoveExposureFromCallDriver
                               }) => (
  <div className={!propIsActiveGroup && styles.hideForm}>
    <ReferencesCallDriver propIsSubMenu
                          propPostfixLabel={propLabel}
                          propIsRemoveExposure={propIsRemoveExposureFromCallDriver}/>
    <ReferencesMarginTerms propIsSubMenu
                           propPostfixLabel={propLabel}/>
    <ReferencesCallIssuance propIsSubMenu
                            propPostfixLabel={propLabel}/>
  </div>
)

export default ReferenceSectionGroup
