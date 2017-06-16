import _ from 'lodash'

const EnhanceState = (HelperStack, Default_State)=>{
 return _.reduce( HelperStack,
                  (newState, modifier)=>{
                   return _.merge(newState, modifier)
                  },
                  Default_State )
} //EndOF-EnhanceState()

const transformer = ( AllProps, Helper )=>{

  const helperArgs = {
   //func1_Args: {arg_1: value1, arg_2:value2}
  }

  const HelperStack = [ /*Helper.func1( helperArgs.func1_Args )*/ ]

  const Default_State = { }

  return EnhanceState(HelperStack, Default_State)
}

export default transformer
