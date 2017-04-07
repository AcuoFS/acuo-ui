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
 * @param propCallDriverLabel
 * @param propMarginTermsLabel
 * @param propCallIssuanceLabel
 * @constructor
 */
const ReferenceSectionGroup = ({
                                 propIsActiveGroup,
                                 propLabel,
                                 propIsRemoveExposureFromCallDriver,
                                 propCallDriverLabel,
                                 propMarginTermsLabel,
                                 propCallIssuanceLabel,
                               }) => (
  <div className={!propIsActiveGroup && styles.hideForm}>
    <ReferencesCallDriver propIsSubMenu
                          propPostfixLabel={propCallDriverLabel || propLabel}
                          propIsRemoveExposure={propIsRemoveExposureFromCallDriver}/>
    <ReferencesMarginTerms propIsSubMenu
                           propPostfixLabel={propMarginTermsLabel || propLabel}/>
    <ReferencesCallIssuance propIsSubMenu
                            propPostfixLabel={propCallIssuanceLabel || propLabel}/>
  </div>
)

export default ReferenceSectionGroup
