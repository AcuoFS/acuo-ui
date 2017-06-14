import _ from 'lodash'

const EnhanceState = (HelperStack, Default_State)=>{
 return _.reduce( HelperStack,
                  (newState, modifier)=>{
                   return _.merge(newState, modifier)
                  },
                  Default_State )
} //EndOF-EnhanceState()

const Process = ( AllProps, Helper )=>{

  const CollSort_Arg = {
   All_Collaterals: AllProps.something_1,
   SortBy: AllProps.something_2
  }

  const HelperStack = [ Helper.CollSort( CollSort_Arg ) ]

  const Default_State = { }

  return EnhanceState(HelperStack, Default_State)
}

export default Process
