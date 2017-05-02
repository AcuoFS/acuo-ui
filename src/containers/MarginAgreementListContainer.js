import { connect } from 'react-redux'
import { fromJS, List } from 'immutable'
import { MarginAgreementsComponent } from '../components'
import {
  selectedItems,
  reconInitState,
  firstLeveSelect,
  secondLevelSelect,
  updateReconFilter
} from '../actions'
import { RECON_DATA_URL, RECON_URL, DASHBOARD_URL } from '../constants/APIcalls'
import filterItems from '../utils/filterItems'

const mapStateToProps = state => {
  const items = state.ReconReducer.get('items').toJS()
  const filters = state.ReconReducer.get('filters').toJS()
  const filteredItems = filterItems(items, filters)

  return {
    recon : fromJS(filteredItems),
    firstLevelList : state.ReconReducer.get('firstLevelList') || List(),
    secondLevelList : state.ReconReducer.get('secondLevelList') || List(),
    currencyInfo: state.ReconReducer.get('currencyInfo') || List()
  }
}

const mapDispatchToProps = dispatch => ({
  // ************************************
  // !!! THIS LOGIC PART NEED REVIEW !!!
  // ************************************
  onReconItem : (e) => {
    console.log('GET URL: ' + RECON_DATA_URL + e.currentTarget.dataset.ref)
    //new recon entire margin call with one get api
    fetch(RECON_DATA_URL + e.currentTarget.dataset.ref, {
      method: 'GET'
    }).then(response => {
      console.log('response ' + JSON.stringify(response))
      return response
    }).then(obj => {
      console.log('refreshing recon data...')
      fetch(RECON_URL).then((response) => {
        return response.json()
      }).then((obj) => {
        console.log('Data fetched: ' + obj)
        const {items} = obj
        dispatch(reconInitState(items))
      })
    })
    //dispatch(reconItem(e.currentTarget.dataset.ref)) //old recon line by line
  },
  onSelectedItem : (guid, assetID) => {
    dispatch(selectedItems(guid, assetID))
  },
  onSelectFirstLevelItem: (GUID, firstLevelID) => {
    dispatch(firstLeveSelect(GUID, firstLevelID))
  },
  onSelectSecondLevelItem: (GUID, parentID, secondLevelID) => {
    dispatch(secondLevelSelect(GUID, parentID, secondLevelID))
  },
  resetFilters: () => {
    return dispatch(updateReconFilter({
      attr: 'type',
      selected: {
        label: '',
        value: ''
      }
    })),
      dispatch(updateReconFilter({
        attr: 'status',
        selected: {
          label: '',
          value: ''
        }
      })),
      dispatch(updateReconFilter({
        attr: 'cptyEntity',
        selected: {
          label: '',
          value: ''
        }
      })),
      dispatch(updateReconFilter({
        attr: 'notificationTime',
        selected: {
          label: '',
          value: ''
        }
      })),
      dispatch(updateReconFilter({
        attr: 'legalEntity',
        selected: {
          label: '',
          value: ''
        }
      })),
      dispatch(updateReconFilter({
        attr: 'cptyOrg',
        selected: {
          label: '',
          value: ''
        }
      }))
  }
})

const MarginAgreementsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MarginAgreementsComponent)

export default MarginAgreementsContainer
