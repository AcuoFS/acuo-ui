import _ from 'lodash'

const sortType = (attr, sortBy)=>{
 const condition = sortBy.toLowerCase()
 switch(sortBy){
   case 'assetName':
     return attr[sortBy]
   case 'price': //total value
     return parseFloat(attr[sortBy])
   case 'ccy':
     return attr[sortBy]
   case 'status':
     return attr[sortBy]
   case 'rating':
     return attr[sortBy]
   case 'maturityDate': //total value
     const date = new Date(attr[sortBy])
     return date.getTime()
   case 'Internal Cost (bps)':
     return parseFloat(attr['internalCostPct'])
   case 'Opportunity Cost (bps)':
     return parseFloat(attr['oppCostPct'])
   case 'ISIN':
       return attr['assetId']
   case 'Venue':
     return attr['venue']
   case 'Acc ID':
     return attr['acctId']

   default:
     console.log( `Unable to sort by: ${sortBy}` )
     return attr[sortBy]
 }
}

const CollSort = ( CollSort_Args )=>{
  const { allAssets, collateralWidget } = CollSort_Args

  const ascSort =  _.reduce( allAssets.toJS(),
                            (acc , AssetType, key)=>{
                             const sorted = _.sortBy( AssetType, attr=>sortType(attr, collateralWidget.get('sortBy')) )
                             return _.set( acc, `${key}` , sorted )
                            },
                            {}  )

  if(collateralWidget.get('sortAscending')) { return ascSort }
  else{
            return _.reduce( ascSort,
                             (acc , AssetType, key)=>{
                              const sorted = _.reverse(AssetType)
                              return _.set( acc, `${key}` , sorted )
                             },
                             {}  )
   return descSort
  }

}//EndOf - CollSort()

const Helper = {
 CollSort
}
export default Helper
