/**
 * Created by Rui on 13/1/17.
 */

import { connect } from 'react-redux'
//import { PledgeSelectionComponent } from '../components'
import PledgeSelectionComponent from '../components/pledge-selection/Selection'

const mapStateToProps = (state, ownProps) => ({
  sideways: ownProps.sideways,
  clicked: ownProps.clicked,
  chkTick: ownProps.chkTick,
  toggleL: ownProps.toggleL,
  toggleR: ownProps.toggleR,
  marginCall: ownProps.marginCall,
  onTogglePendingAllocation: ownProps.onTogglePendingAllocation,
  pendingAllocationStore: ownProps.pendingAllocationStore,
  onRemoveAssetFromAllocate: ownProps.onRemoveAssetFromAllocate
})

const mapDispatchToProps = dispatch => ({
  onRemoveEarmarked: (assetName, GUID) => {
    console.log('running', assetName, GUID)
  }
})

const PledgeSelectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PledgeSelectionComponent)

export default PledgeSelectionContainer