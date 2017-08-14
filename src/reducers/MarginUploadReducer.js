import {
  GET_MARGIN_CALL_UPLOAD,
  UPDATE_MARGIN_CALL_UPLOAD,
  REQUESTING_VALUATION,
  UPLOADING_PORTFOLIO,
  MARGIN_CALL_GENERATED,
  UPDATE_REQUESTING_STATE
} from '../constants/ActionTypes'
import {List, Map, fromJS} from 'immutable'

const initialState = Map({
  uploadData: List(),
  txnID: '',
  requestingValuation: false,
  uploading: false,
  requestingMCGenerationOrValuation: false,

})

const MarginUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MARGIN_CALL_UPLOAD:
      return state.withMutations((state) => state.set('uploadData', fromJS(action.uploadData).toList()).set('txnID', '').set('requestingValuation', false).set('uploading', false))

    case UPDATE_MARGIN_CALL_UPLOAD:
      return state.set('uploadData',
        state.get('uploadData').map(
          uploadRecord => {
            if (uploadRecord.get('mgnCallUploadId') === action.uploadId) {
              return uploadRecord.set('totalCallAmount', action.newTotalCallAmt)
            } else {
              return uploadRecord
            }
          }
        ))

    case REQUESTING_VALUATION:
      return state.set('requestingValuation', true)

    case UPLOADING_PORTFOLIO:
      return state.withMutations((state) => state.set('uploading', true).set('uploadData', List()))

    case UPDATE_REQUESTING_STATE:
      return state.set('requestingMCGenerationOrValuation', action.flag)

    case MARGIN_CALL_GENERATED:
      //console.log(action.updatedPortfolios)
      return state.withMutations(state => state.set('uploadData', state.get('uploadData').map(x => {
        const flag = action.updatedPortfolios.uploadMarginCallDetails.filter(y => {
          return x.get('marginAgreement') === y.marginAgreement && x.get('callType') === y.callType
        })
        if(flag.length){
          // console.log({portfolioId: x.get('portfolioId'), ...flag[0]})
          return fromJS({portfolioId: x.get('portfolioId'), ...flag[0]})
        }
        else
          return x
      })).set('requestingMCGenerationOrValuation', false))

    default:
      return state
  }
}

export default MarginUploadReducer