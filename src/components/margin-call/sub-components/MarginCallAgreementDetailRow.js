import React, {PropTypes} from 'react'
import styles from './MarginCallAgreementDetailRow.css'


export default class MarginCallAgreementRow extends React.Component {
  render(){
    const {
      propAgreementDetailObj
    } = this.props

    return (
      <div>
        <div className={styles.agreeRow + ' ' + styles.agreeHeaderRow}>
          <div></div>
          <div>Threshold</div>
          <div>Minimum Transfer</div>
          <div>Rounding</div>
          <div>Net Required</div>
          <div>Rate</div>
          <div>Trade Count</div>
          <div></div>
        </div>
        <div className={styles.agreeRow}>
          <div></div>
          <div>{propAgreementDetailObj.threshold}</div>
          <div>{propAgreementDetailObj.minTransfer}</div>
          <div>{propAgreementDetailObj.rounding}</div>
          <div>{propAgreementDetailObj.netRequired}</div>
          <div>{propAgreementDetailObj.rate}</div>
          <div className={styles.boldText}>{propAgreementDetailObj.tradeCount}</div>
          <div></div>
        </div>
      </div>
    )
  }
}

MarginCallAgreementRow.PropTypes = {
  propAgreementDetailObj: PropTypes.object.isRequired
}