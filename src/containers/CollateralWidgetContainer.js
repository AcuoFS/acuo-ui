import {connect} from 'react-redux'
import CollateralWidget from '../components/pledge/sub-components/CollateralWidget'
import {updateCollateral, removeAssetFromEarmark} from '../actions'
import {toJS} from 'immutable'
import Process from '../components/pledge/utilities/process.js'
import Helper from '../components/pledge/utilities/Helpers.js'

const mapStateToProps = state => ({
  state: state.PledgeReducer,
  collateral: state.PledgeReducer.getIn(['pledgeData', 'collateral']).toJS()
})

const mapDispatchToProps = dispatch => ({
  onCollateralDataAvailable: (collateralData) => { dispatch(updateCollateral(collateralData)) },
  onRemoveFromEarmarked: (e, assetType, propAssetId, propAssetIdType) => { dispatch(removeAssetFromEarmark(e, assetType, propAssetId, propAssetIdType)) },
})

const preMerge = (Process, Helper)=>(
   (stateProps, dispatchProps, ownProps)=> Process( {stateProps, dispatchProps, ownProps} , Helper )
)

const mergeProps = preMerge( Process, Helper )

const CollateralWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CollateralWidget)

export default CollateralWidgetContainer
