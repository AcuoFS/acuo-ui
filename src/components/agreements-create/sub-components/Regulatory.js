import React from 'react'
import ReferenceSubCommon from './sub-components/ReferenceSubCommon'


const Regulatory = ({
                      propIsDisplay,
                      propIsRegulatory,
                      propToggleRegulatory
                    }) => (
  <ReferenceSubCommon
    propIsDisplay={propIsDisplay}
    propIsReferenceSubOn={propIsRegulatory}
    propToggleReferenceSub={propToggleRegulatory}
    propIsRegulatory
    propMainToggleLabel={'Regulatory References'}
    propMainInputLabel={'Regulatory CSA References'}/>
)

export default Regulatory