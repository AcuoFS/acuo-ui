import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { MarginAgreementsComponent } from '../components'
import { selectedItems, initState, filterStateStatus } from '../actions'
import { RECON_DATA_URL, RECON_URL, DASHBOARD_URL } from '../constants/APIcalls'
import filterItems from '../utils/filterItems'

const mapStateToProps = state => {
  const items = state.ReconReducer.get('items').toJS()
  const filters = state.ReconReducer.get('filters').toJS()

  const filteredItems = filterItems(items, filters)

  return {
    recon : fromJS(filteredItems)
  }
}

const mapDispatchToProps = dispatch => ({
  // ************************************
  // !!! THIS LOGIC PART NEED REVIEW !!!
  // ************************************
  onReconItem : (e) => {
    //console.log(e.currentTarget.dataset.ref)
    //new recon entire margin call with one get api
    fetch(RECON_DATA_URL + e.currentTarget.dataset.ref, {
      method: 'GET'
    }).then(response => {
      return response
    }).then(obj => {
      fetch(DASHBOARD_URL).then((response) => {
        return response.json()
      }).then((obj) => {
        dispatch(initState(fromJS(obj)))
      })
    })
    //dispatch(reconItem(e.currentTarget.dataset.ref)) //old recon line by line
  },
  onSelectedItem : (guid, assetID) => {
    dispatch(selectedItems(guid, assetID))
  }
})

const MarginAgreementsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MarginAgreementsComponent)

export default MarginAgreementsContainer
