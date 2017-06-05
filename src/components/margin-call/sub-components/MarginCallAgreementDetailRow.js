import React from 'react';
import PropTypes from 'prop-types'
import styles from './MarginCallAgreementDetailRow.css'


const MarginCallAgreementDetailRow = ({propAgreementDetailObj}) => (
  <div>
    <div className={styles.agreeRow + ' ' + styles.agreeHeaderRow}>
      <div></div>
      <div>Threshold</div>
      <div>Min Transfer</div>
      <div>Rounding</div>
      <div>Net Required</div>
      <div>FX rate</div>
      <div>Total Trade Count</div>
      <div>Trades Valued</div>
      <div>Px Source</div>
      <div></div>
    </div>
    <div className={styles.agreeRow}>
      <div></div>
      <div>{propAgreementDetailObj.threshold || '-'}</div>
      <div>{propAgreementDetailObj.minTransfer || '-'}</div>
      <div>{propAgreementDetailObj.rounding || '-'}</div>
      <div>{propAgreementDetailObj.netRequired || '-'}</div>
      <div>{propAgreementDetailObj.rate || '-'}</div>
      <div className={styles.boldText}>{propAgreementDetailObj.tradeCount || '-'}</div>
      <div>{propAgreementDetailObj.tradeValue || '-'}</div>
      <div>{propAgreementDetailObj.pricingSource || '-'}</div>
      <div></div>
    </div>
  </div>
)

MarginCallAgreementDetailRow.PropTypes = {
  propAgreementDetailObj: PropTypes.object.isRequired
}

export default MarginCallAgreementDetailRow

