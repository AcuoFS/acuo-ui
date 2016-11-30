import { connect } from 'react-redux'
import { MarginAgreementsComponent } from '../components'
import { lineItemInsertion, reconItem, selectedItems } from '../actions'


const mapStateToProps = state => ({
  recon : state.mainReducer.getIn(['display', 'derivatives'])
})

const mapDispatchToProps = dispatch => ({
  onLineItemInsertion: (lineItem) => {
    dispatch(lineItemInsertion(lineItem))
  },
  onReconItem : () => {
    dispatch(reconItem())
  },
  onSelectedItem : (guid, assetName) => {
    dispatch(selectedItems(guid, assetName))
  }
})

const MarginAgreementsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MarginAgreementsComponent)

export default MarginAgreementsContainer
