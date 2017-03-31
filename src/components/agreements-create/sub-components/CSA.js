import React from 'react'
import ReferenceSubCommon from './sub-components/ReferenceSubCommon'


const CSA = ({
               propIsDisplay,
               propIsReferenceSubOn,
               propToggleCsa
             }) => (
  <ReferenceSubCommon
    propIsDisplay={propIsDisplay}
    propIsReferenceSubOn={propIsReferenceSubOn}
    propToggleReferenceSub={propToggleCsa}
    propIsCSA
    propMainToggleLabel={'CSA References'}
    propMainInputLabel={'CSA References'}/>
)

export default CSA