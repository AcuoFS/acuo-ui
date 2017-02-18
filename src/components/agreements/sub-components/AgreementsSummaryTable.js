import React from 'react'
import {plusBox, minuxBox} from '../../../../images/common'
import styles from './AgreementsSummaryTable.css'


export default class AgreementsSummaryTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCptySummaryExpanded: true
    }

    this.handleExpandCollapse = this.handleExpandCollapse.bind(this)
  }

  handleExpandCollapse(nextClickAction) {
    this.setState({
      isCptySummaryExpanded: nextClickAction
    })
  }

  render() {
    let expandedRowOne =
      <div className={styles.summaryTableRow}>
        <div className={styles.summaryTableCell}>
          <div className={styles.entityTypeContainer}>
            Counterparty Leg
          </div>
        </div>
        <div className={styles.summaryTableCell}>6</div>
        <div className={styles.summaryTableCell}>6</div>
        <div className={styles.summaryTableCell}>6</div>
        <div className={styles.summaryTableCell}>6</div>
        <div className={styles.summaryTableCell}>6</div>
        <div className={styles.summaryTableCell}>6</div>
      </div>
    let expandedRowTwo =
      <div className={styles.summaryTableRow}>
        <div className={styles.summaryTableCell}>
          <div className={styles.entityTypeContainer}>
            Counterparty Reg VM
          </div>
        </div>
        <div className={styles.summaryTableCell}>6</div>
        <div className={styles.summaryTableCell}>6</div>
        <div className={styles.summaryTableCell}>6</div>
        <div className={styles.summaryTableCell}>6</div>
        <div className={styles.summaryTableCell}>6</div>
        <div className={styles.summaryTableCell}>6</div>
      </div>


    return (
      <div className={styles.summaryTable}>
        <div className={styles.summaryTableHeaderRow}>
          <div className={styles.summaryTableCell}></div>
          <div className={styles.summaryTableCell}>Pending New</div>
          <div className={styles.summaryTableCell}>Pending Assigned</div>
          <div className={styles.summaryTableCell}>Rejected</div>
          <div className={styles.summaryTableCell}>Active</div>
          <div className={styles.summaryTableCell}>Change Request</div>
          <div className={styles.summaryTableCell}>Discontinued Request</div>
        </div>
        <div className={styles.summaryTableRow}>
          <div className={styles.summaryTableCell}>Acuo SG</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
        </div>
        <div className={styles.summaryTableRow}>
          <div className={styles.summaryTableCell}>
            <div className={styles.entityTypeContainer}>
              Counterparty <img src={this.state.isCptySummaryExpanded ?
              minuxBox : plusBox}
                                className={styles.plusMinusStyle}
                                onClick={() => this.handleExpandCollapse(!this.state.isCptySummaryExpanded)}/>
            </div>
          </div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
          <div className={styles.summaryTableCell}>12</div>
        </div>

        {
          this.state.isCptySummaryExpanded &&
          expandedRowOne
        }

        {
          this.state.isCptySummaryExpanded &&
          expandedRowTwo
        }

      </div>
    )
  }
}