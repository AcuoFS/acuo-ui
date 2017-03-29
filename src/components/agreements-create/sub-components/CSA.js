import React from 'react'
import ReferenceSubCommon from './sub-components/ReferenceSubCommon'


const CSA = ({
               propIsDisplay,
               propIsCsa,
               propToggleCsa
             }) => (
  <ReferenceSubCommon
    propIsDisplay={propIsDisplay}
    propIsReferenceSubOn={propIsCsa}
    propToggleReferenceSub={propToggleCsa}
    propIsCSA
    propMainToggleLabel={'CSA References'}
    propMainInputLabel={'CSA References'}/>
)

export default CSA