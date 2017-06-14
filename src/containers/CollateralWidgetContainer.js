import {connect} from 'react-redux'
import CollateralWidget from '../components/pledge/sub-components/CollateralWidget'
import {updateCollateral, removeAssetFromEarmark} from '../actions'
import {toJS} from 'immutable'
import helper from '../components/pledge/utilities/Helpers.js'

import ColWidgetActions from "../actions/CollateralWidgetActions.js"

const mapStateToProps = state => {

 const helperArgs = {
  CollSort_Args: { allAssets: state.PledgeReducer.getIn(['pledgeData', 'collateral']),
                   sortBy: state.PledgeReducer.getIn(['collateralWidget', 'sortBy'])
                  },
 }

 return { collateral: helper.CollSort(helperArgs.CollSort_Args),
          collateralSortedBy: state.PledgeReducer.getIn(['collateralWidget', 'sortBy']),
        }
}

const mapDispatchToProps = dispatch => ({
  onCollateralDataAvailable: (collateralData) => { dispatch(updateCollateral(collateralData)) },
  onRemoveFromEarmarked: (e, assetType, propAssetId, propAssetIdType) => { dispatch(removeAssetFromEarmark(e, assetType, propAssetId, propAssetIdType)) },
  sortColumnBy: (sortBy)=>{dispatch(ColWidgetActions.sortColumnBy(sortBy))},
})

const CollateralWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollateralWidget)

export default CollateralWidgetContainer
