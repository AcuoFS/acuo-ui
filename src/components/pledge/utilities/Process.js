import _ from 'lodash'

let FormState = (HelperStack, Default_State)=>{
 return _.reduce( HelperStack,
                  (newState, modifier)=>{
                   return _.merge(newState, modifier)
                  },
                  Default_State )
} //EndOF-FormState()

const Process = ( AllProps, Helper )=>{

  const CollSort_Arg = {
   All_Collaterals: AllProps.stateProps.collateral,
   SortBy: AllProps.stateProps.state.getIn(['pledgeUI', 'CollWidget_SortBy'])
  }

  const HelperStack = [ Helper.CollSort( CollSort_Arg ) ]

  const Default_State = { ...AllProps.stateProps,
                          ...AllProps.dispatchProps,
                          ...AllProps.ownProps }

  return FormState(HelperStack, Default_State)
}

export default Process
