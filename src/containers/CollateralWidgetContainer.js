import {connect} from 'react-redux'
import CollateralWidget from '../components/pledge/sub-components/CollateralWidget'
import {updateCollateral, removeAssetFromEarmark} from '../actions'

const mapStateToProps = state => ({
  collateral: state.PledgeReducer.getIn(['pledgeData', 'collateral']).toJS()
})

const mapDispatchToProps = dispatch => ({
  onCollateralDataAvailable: (collateralData) => {
    dispatch(updateCollateral(collateralData))
  },
  onRemoveFromEarmarked: (e, assetType, propAssetId, propAssetIdType) => {
    dispatch(removeAssetFromEarmark(e, assetType, propAssetId, propAssetIdType))
  }
})

const CollateralWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollateralWidget)

export default CollateralWidgetContainer