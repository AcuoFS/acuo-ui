import {connect} from 'react-redux'
import CollateralWidget from '../components/pledge/sub-components/CollateralWidget'
import {updateCollateral, removeAssetFromEarmark} from '../actions'
import {toJS} from 'immutable'
import Process from '../components/pledge/utilities/processes.js'

const mapStateToProps = state => ({
  state: state.PledgeReducer.toJS(),
  collateral: state.PledgeReducer.getIn(['pledgeData', 'collateral']).toJS()
})

const mapDispatchToProps = dispatch => ({
  onCollateralDataAvailable: (collateralData) => { dispatch(updateCollateral(collateralData)) },
  onRemoveFromEarmarked: (e, assetType, propAssetId, propAssetIdType) => { dispatch(removeAssetFromEarmark(e, assetType, propAssetId, propAssetIdType)) },
})

const preMerge = (Process, modifier)=>{
 return ( stateProps, dispatchProps, ownProps )=>{

  return { ...stateProps,
           ...dispatchProps,
           ...ownProps,
           modifier }
 }
}

const mergeProps = preMerge( Process )

const CollateralWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CollateralWidget)

export default CollateralWidgetContainer
