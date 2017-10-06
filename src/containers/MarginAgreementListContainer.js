import { connect } from 'react-redux'
import { fromJS, List, Map } from 'immutable'
import { MarginAgreementsComponent } from '../components'
import {
  selectedItems,
  firstLeveSelect,
  secondLevelSelect,
  updateReconFilter,
  reconItem
} from '../actions'
import filterItems from '../utils/filterItems'

const defaultList = List()
const defaultMap = Map()

const mapStateToProps = state => {
  const items = state.ReconReducer.get('newItems').toJS()
  const filters = state.ReconReducer.get('filters').toJS()
  const filteredItems = filterItems(items, filters)

  // if(state.ReconReducer.get('newItems')){
  //   console.log(state.ReconReducer.get('newItems').toJS())
  //   console.log(state.ReconReducer.get('firstLevelList').toJS())
  //   console.log(state.ReconReducer.get('secondLevelList').toJS())
  // }

  return {
    recon : fromJS(filteredItems),
    firstLevelList : state.ReconReducer.get('firstLevelList') || defaultMap,
    secondLevelList : state.ReconReducer.get('secondLevelList') || defaultMap,
    currencyInfo: state.ReconReducer.get('currencyInfo') || defaultList
  }
}

const mapDispatchToProps = dispatch => ({
  // ************************************
  // !!! THIS LOGIC PART NEED REVIEW !!!
  // ************************************
  onReconItem : (e) => {
    // console.log('GET URL: ' + RECON_DATA_URL + e.currentTarget.dataset.ref)
    //new recon entire margin call with one get api
    //console.log(e.currentTarget.dataset.ref)
    dispatch(reconItem(e.currentTarget.dataset.ref))
    // fetch(RECON_DATA_URL + e.currentTarget.dataset.ref, {
    //   method: 'GET'
    // }).then(response => {
    //   // console.log('response ' + JSON.stringify(response))
    //   return response
    // }).then(obj => {
    //   // console.log('refreshing recon data...')
    //   fetch(RECON_URL).then((response) => {
    //     return response.json()
    //   }).then((obj) => {
    //     // console.log('Data fetched: ' + obj)
    //     const {items} = obj
    //     dispatch(reconInitState(items))
    //   })
    //   dispatch(sagaNavbarAlerts())
    // })
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
