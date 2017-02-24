import {connect} from 'react-redux'
import CollateralAssetComponent from './../components/pledge/sub-components/CollateralAsset'


const mapStateToProps = state => ({
  // Get property marginCallName from each object of the margin call list
  listOfMarginCallName: state.PledgeReducer.getIn(['pledgeData', 'selection'])
    ? (state.PledgeReducer.getIn(['pledgeData', 'selection'])
      .map(portfolio => portfolio.get('marginCallName'))).toJS()
    : []
})

const CollateralAssetContainer = connect(
  mapStateToProps
)(CollateralAssetComponent)

export default CollateralAssetContainer