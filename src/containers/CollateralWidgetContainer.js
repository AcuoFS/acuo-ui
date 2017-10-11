import {connect} from 'react-redux'
import CollateralWidget from '../components/pledge/sub-components/CollateralWidget'
import {fetchCollaterals, removeAssetFromEarmark} from '../actions'
import {toJS} from 'immutable'
import helper from '../components/pledge/utilities/Helpers.js'
import transformer from '../components/pledge/utilities/transformer.js'
import ColWidgetActions from "../actions/CollateralWidgetActions.js"

const mapStateToProps = state => {

 /**helperArgs are meant for imported helper functions**/
 const helperArgs = {
  CollSort_Args: { allAssets: state.PledgeReducer.getIn(['pledgeData', 'collateral']),
                   collateralWidget: state.PledgeReducer.getIn(['collateralWidget']), },
 }

 return { collateral: helper.CollSort(helperArgs.CollSort_Args),
          collateralSortedBy: state.PledgeReducer.getIn(['collateralWidget', 'sortBy']),
          isAscSort: state.PledgeReducer.getIn(['collateralWidget', 'sortAscending'])
        }
}

const mapDispatchToProps = dispatch => ({
  onFetchCollaterals: () => {
    dispatch(fetchCollaterals()) },
  onRemoveFromEarmarked: (e, assetType, propAssetId, propAssetIdType) => {
    dispatch(removeAssetFromEarmark(e, assetType, propAssetId, propAssetIdType)) },
  sortColumnBy: (sortBy)=>{
    dispatch(ColWidgetActions.sortColumnBy(sortBy))},
})

const CollateralWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollateralWidget)

export default CollateralWidgetContainer
