import React, {PropTypes} from 'react'
import AgreementsSummaryTable from './sub-components/AgreementsSummaryTable'
import AgreementsTable from './sub-components/AgreementsTable'
import mockAgreementsSummary from './mock/mockAgreementsSummary'
import mockAgreements from './mock/mockAgreements'
import _ from 'lodash'
import * as TYPES from '../../constants/AgreementsConstants'
import ImportAgreements from './sub-components/ImportAgreements'
import {CreateAgreementsMain} from '../agreements-create/CreateAgreementsMain'
import styles from './Agreements.css'


export default class Agreements extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filterText: '',
      activePopup: ''
    }

    this.handlerClosePopup = this.handlerClosePopup.bind(this)
  }

  componentWillMount() {
    const {
      summaryData, onInitAgreementSummary,
      agreementsData, onInitAgreements
    } = this.props

    // TODO endpoint of agreement summary data goes here
    if (_.isEmpty(summaryData)) {
      onInitAgreementSummary(mockAgreementsSummary)
    }

    // TODO endpoint of agreement data goes here
    if (_.isEmpty(agreementsData)) {
      onInitAgreements(mockAgreements)
    }
  }

  handlerClosePopup() {
    this.setState({
      activePopup: ''
    })
  }

  render() {
    const {
      summaryData,
      isCptySummaryExpanded,
      onSetCptySummaryExpanded,
      typeSelected,
      onSetAgreementTypeSelected,
      agreementsData
    } = this.props

    return (
      <div className={styles.compContainer}>
        {
          (this.state.activePopup == 'IMPORT') &&
          <ImportAgreements propHandlerCloseImportPopup={this.handlerClosePopup}/>
        }
        {
          (this.state.activePopup == 'CREATE') &&
          <CreateAgreementsMain propHandlerClosePopup={this.handlerClosePopup}/>
        }
        <div className={styles.headerContainer}>
          <div className={styles.compTitle}>Agreement</div>
          <div className={styles.btnContainer}>
            <button className={styles.agreementBtnStyle}
                    onClick={
                      () => {
                        (this.state.activePopup == '') &&
                        this.setState({activePopup: 'IMPORT'})
                      }}>Import
            </button>
            <button className={styles.agreementBtnStyle}
                    onClick={
                      () => {
                        (this.state.activePopup == '') &&
                        this.setState({activePopup: 'CREATE'})
                      }}>Create
            </button>
          </div>
        </div>
        <input type="text" placeholder="Search" className={styles.searchInput}
               value={this.state.filterText}
               onChange={(e) => this.setState({filterText: e.target.value})}/>
        <div className={styles.labelContainer}>
          <span className={
            styles.statusLabel + ' ' + ((typeSelected == TYPES.AGREEMENT_TYPE_SELECTED_INCOMING)
              ? styles.unselected : styles.outLabel)}
                onClick={() => onSetAgreementTypeSelected(TYPES.AGREEMENT_TYPE_SELECTED_OUTGOING)}>
            Outgoing
          </span>
          <span className={
            styles.statusLabel + ' ' + ((typeSelected == TYPES.AGREEMENT_TYPE_SELECTED_OUTGOING)
              ? styles.unselected : styles.inLabel)}
                onClick={() => onSetAgreementTypeSelected(TYPES.AGREEMENT_TYPE_SELECTED_INCOMING)}>
            Incoming
          </span>
        </div>
        <AgreementsSummaryTable propSummaryData={summaryData}
                                propIsCptySummaryExpanded={isCptySummaryExpanded}
                                propHandlerCptyExpand={onSetCptySummaryExpanded}
                                propTypeSelected={typeSelected}/>
        <AgreementsTable propFiltertext={this.state.filterText}
                         propAgreements={agreementsData}/>
      </div>
    )
  }
}

Agreements.PropTypes = {
  summaryData: PropTypes.object.isRequired,
  isCptySummaryExpanded: PropTypes.bool.isRequired,
  typeSelected: PropTypes.string.isRequired,
  onSetCptySummaryExpanded: PropTypes.func.isRequired,
  onSetAgreementTypeSelected: PropTypes.func.isRequired
}