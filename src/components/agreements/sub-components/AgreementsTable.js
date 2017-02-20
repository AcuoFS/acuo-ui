import React from 'react'
import * as ICONS from '../../../../images/agreements'
import mockAgreements from './mockAgreements'
import {filterByAllPropertiesOfObj} from '../../../utils'
import styles from './AgreementsTable.css'


export default class AgreementsTable extends React.Component {
  render() {
    const {propFiltertext} = this.props
    return (
      <div className={styles.agreeTable}>
        <div className={styles.agreeTableHeader}>
          <div className={styles.agreeTableCell}>Agreement</div>
          <div className={styles.agreeTableCell}>Legal Entity</div>
          <div className={styles.agreeTableCell}>Cpty Organization</div>
          <div className={styles.agreeTableCell}>Cpty Entity</div>
          <div className={styles.agreeTableCell}>Category</div>
          <div className={styles.agreeTableCell}>Active Date</div>
          <div className={styles.agreeTableCell}>Status</div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}></div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}></div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}></div>
        </div>

        {
          filterByAllPropertiesOfObj(mockAgreements, propFiltertext)
            .map((agreement, index) => (
              <div className={styles.agreeTableRow}>
                <div className={styles.agreeTableCell}>{agreement.agreementName}</div>
                <div className={styles.agreeTableCell}>{agreement.legalEntity}</div>
                <div className={styles.agreeTableCell}>{agreement.cptyOrg}</div>
                <div className={styles.agreeTableCell}>{agreement.cptyEntity}</div>
                <div className={styles.agreeTableCell}>{agreement.category}</div>
                <div className={styles.agreeTableCell}>{agreement.activeDate}</div>
                <div className={styles.agreeTableCell}>{agreement.status}</div>
                <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
                  <img className={styles.iconStyle} src={ICONS.checkInactive}/>
                </div>
                <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
                  <img className={styles.iconStyle} src={ICONS.crossActive}/>
                </div>
                <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
                  <img className={styles.iconStyle} src={ICONS.editActive}/>
                </div>
              </div>

            ))
        }

      </div>
    )
  }
}