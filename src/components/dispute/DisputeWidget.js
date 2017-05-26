import React from 'react';
import PropTypes from 'prop-types'
import DisputeTable from './sub-components/DisputeTable'
import * as DISPUTE_FILTER from '../../constants/DisputeFilters'
import mockData from './MockDisputes'
import styles from './DisputeWidget.css'


export default class DisputeWidget extends React.Component {
  componentWillMount() {
    const {disputeData, onInitDisputeData} = this.props
    if (disputeData.length == 0) {
      // TODO fetch from endpoint when it's ready
      onInitDisputeData(mockData)
    }
  }

  generateFilterButton(type, display, disputeFilter, onUpdateDisputeFilter) {
    return (
      <button className={styles.btnStyle + ' '
      + ((disputeFilter == type) ? styles.btnInactive : styles.btnActive)}
              onClick={() => onUpdateDisputeFilter(type)}
              disabled={disputeFilter == type}>
        {display}
      </button>
    )
  }

  render() {
    const {
      disputeFilter,
      onUpdateDisputeFilter
    } = this.props

    return (
      <div className={styles.compContainer}>
        <div className={styles.compTitle}>Dispute Management</div>
        <div className={styles.btnContainer}>
          {this.generateFilterButton(DISPUTE_FILTER.CURRENT_MONTH, 'Current month',
            disputeFilter, onUpdateDisputeFilter)}
          {this.generateFilterButton(DISPUTE_FILTER.THREE_MONTHS, '3 months ago',
            disputeFilter, onUpdateDisputeFilter)}
          {this.generateFilterButton(DISPUTE_FILTER.SIX_MONTHS, '6 months ago',
            disputeFilter, onUpdateDisputeFilter)}
        </div>
        <DisputeTable {...this.props} dateFilter={disputeFilter}/>
      </div>
    )
  }
}

DisputeWidget.PropTypes = {
  disputeData: PropTypes.arrayOf(PropTypes.object).isRequired,
  dateFilter: PropTypes.string.isRequired,
  onUpdateDisputeFilter: PropTypes.func.isRequired,
  onInitDisputeData: PropTypes.func.isRequired
}