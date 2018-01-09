import { connect } from 'react-redux'
import { MarginCallComponent } from '../components'
import _ from 'lodash'

import *  as MarginCallUploadActions from  '../actions/MarginCallUploadActions'
// import { POST_MARGIN_CALL_IDS } from './../constants/APIcalls'

const _default = ''
const _defaultArray = []

const mapStateToProps = state => ({
  uploadData: state.MarginUploadReducer.get('uploadData')
    ? state.MarginUploadReducer.get('uploadData').toJS() : _defaultArray,
  requestingValuation: state.MarginUploadReducer.get('requestingValuation') || _default,
  requestingMCGenerationOrValuation: state.MarginUploadReducer.get('requestingMCGenerationOrValuation') || _default,
  selectedRows: state.MarginUploadReducer.get('selectedRows').toJS(),
  marginCallRows: state.MarginUploadReducer.get('marginCallRows').toJS(),
  variableOptions: state.MarginUploadReducer.get('variableOptions').toJS()
})

const checkUploadData = (data) => (data.length)

const mapDispatchToProps = dispatch => ({
  onGetMarginUploadData: (uploadData) => {
    dispatch(MarginCallUploadActions.getMarginCallUpload(uploadData))
  },
  onUpdateMarginCallUpload: (newTotalCallAmt, uploadId) => {
    dispatch(MarginCallUploadActions.updateMarginCallUpload(newTotalCallAmt, uploadId))
  },
  onPostMarginCallIDs: (idArr) => {
    dispatch(MarginCallUploadActions.updateRequestState(true))
    dispatch(MarginCallUploadActions.onRequestSendMarginCalls(idArr))

  },
  requestValuation: (referenceIDs) =>{
    dispatch(MarginCallUploadActions.updateRequestState(true))
    dispatch(MarginCallUploadActions.onRequestValuationAction(referenceIDs))
  },
  mergedGenerateMarginCalls: (referenceIDs) => {
    dispatch(MarginCallUploadActions.updateRequestState(true))
    dispatch(MarginCallUploadActions.onRequestGenerateMarginCall(referenceIDs))
  },
  onToggleRow: rowObj => {
    dispatch(MarginCallUploadActions.onToggleMarginCallRow(rowObj))
  },
  onToggleAllRows: () => {
    dispatch(MarginCallUploadActions.onToggleAllMarginCallRows())
  },
  onToggleVariableFilter: (hasArr, dontHaveArr) => {
    dispatch(MarginCallUploadActions.onToggleVariablOptions(hasArr, dontHaveArr))
  }
})

const mergeProps = (stateProps, dispatchProps) => ({
  uploadDataFlag: checkUploadData(stateProps.uploadData),
  onRequestValuation: () => {
    // dispatchProps.requestValuation(stateProps.txnID)

   },
  generateMarginCalls: (referenceIDs) => {
    const valuedStatements = stateProps.uploadData.filter(x => x.agreementDetails.tradeCount === x.agreementDetails.tradeValue)
    const keys = Object.keys(_.keyBy(valuedStatements, x => x.portfolioId))
    const newRefIDs = referenceIDs.filter(x => _.includes(keys, x))

    dispatchProps.mergedGenerateMarginCalls(newRefIDs)
  },
  ...stateProps, ...dispatchProps
})

const MarginCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MarginCallComponent)

export default MarginCallContainer
