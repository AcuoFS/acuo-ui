import React from 'react'
import ReferenceSubCommon from './sub-components/ReferenceSubCommon'


const Regulatory = ({
                      propIsDisplay,
                      propIsReferenceSubOn,
                      propToggleRegulatory
                    }) => (
  <ReferenceSubCommon
    propIsDisplay={propIsDisplay}
    propIsReferenceSubOn={propIsReferenceSubOn}
    propToggleReferenceSub={propToggleRegulatory}
    propIsRegulatory
    propMainToggleLabel={'Regulatory References'}
    propMainInputLabel={'Regulatory CSA References'}/>
)

export default Regulatory