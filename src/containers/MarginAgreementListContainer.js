import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { MarginAgreementsComponent } from '../components'
import { lineItemInsertion, reconItem, selectedItems } from '../actions'
import {RECON_DATA_URL, RECON_URL} from '../constants/APIcalls'


const mapStateToProps = state => ({
  recon : state.mainReducer.getIn(['display', 'derivatives'])
})

const mapDispatchToProps = dispatch => ({
  onLineItemInsertion: (lineItem) => {
    dispatch(lineItemInsertion(lineItem))
  },
  onReconItem : (e) => {
    console.log(e.currentTarget.dataset.ref)
    //new recon entire margin call with one get api
    fetch(RECON_DATA_URL + e.currentTarget.dataset.ref, {
      method: 'GET'
    }).then(response => {
      return response
    }).then(obj => {
      fetch(RECON_URL).then((response) => {
        return response.json()
      }).then((obj) => {
        console.log(obj)
        dispatch(lineItemInsertion(fromJS(obj)))
      })
    })
    //dispatch(reconItem(e.currentTarget.dataset.ref)) //old recon line by line
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
