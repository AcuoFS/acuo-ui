import React from 'react'
import * as ICONS from '../../../../images/agreements'
import styles from './AgreementsTable.css'


export default class AgreementsTable extends React.Component {
  render() {
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
          <div className={styles.agreeTableCell}></div>
          <div className={styles.agreeTableCell}></div>
          <div className={styles.agreeTableCell}></div>
        </div>
        <div className={styles.agreeTableRow}>
          <div className={styles.agreeTableCell}>Acuo Sg vs Counterparty C</div>
          <div className={styles.agreeTableCell}>Acuo SG</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>ISDA Group</div>
          <div className={styles.agreeTableCell}>14-11-2016</div>
          <div className={styles.agreeTableCell}>Pending New</div>
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
        <div className={styles.agreeTableRow}>
          <div className={styles.agreeTableCell}>Acuo Sg vs Counterparty C</div>
          <div className={styles.agreeTableCell}>Acuo SG</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>ISDA Group</div>
          <div className={styles.agreeTableCell}>14-11-2016</div>
          <div className={styles.agreeTableCell}>Pending Assigned</div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.checkActive}/>
          </div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.crossChosen}/>
          </div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.editChosen}/>
          </div>
        </div>
        <div className={styles.agreeTableRow}>
          <div className={styles.agreeTableCell}>Acuo Sg vs Counterparty C</div>
          <div className={styles.agreeTableCell}>Acuo SG</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>ISDA Group</div>
          <div className={styles.agreeTableCell}>14-11-2016</div>
          <div className={styles.agreeTableCell}>Rejected</div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.checkChosen}/>
          </div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.crossInactive}/>
          </div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.editInactive}/>
          </div>
        </div>
        <div className={styles.agreeTableRow}>
          <div className={styles.agreeTableCell}>Acuo Sg vs Counterparty C</div>
          <div className={styles.agreeTableCell}>Acuo SG</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>ISDA Group</div>
          <div className={styles.agreeTableCell}>14-11-2016</div>
          <div className={styles.agreeTableCell}>Active</div>
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
        <div className={styles.agreeTableRow}>
          <div className={styles.agreeTableCell}>Acuo Sg vs Counterparty C</div>
          <div className={styles.agreeTableCell}>Acuo SG</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>ISDA Group</div>
          <div className={styles.agreeTableCell}>14-11-2016</div>
          <div className={styles.agreeTableCell}>Change Request</div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.checkActive}/>
          </div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.crossChosen}/>
          </div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.editChosen}/>
          </div>
        </div>
        <div className={styles.agreeTableRow}>
          <div className={styles.agreeTableCell}>Acuo Sg vs Counterparty C</div>
          <div className={styles.agreeTableCell}>Acuo SG</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>Counterparty C</div>
          <div className={styles.agreeTableCell}>ISDA Group</div>
          <div className={styles.agreeTableCell}>14-11-2016</div>
          <div className={styles.agreeTableCell}>Discontinued Req.</div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.checkChosen}/>
          </div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.crossInactive}/>
          </div>
          <div className={styles.agreeTableCell + ' ' + styles.iconCell}>
            <img className={styles.iconStyle} src={ICONS.editInactive}/>
          </div>
        </div>
      </div>
    )
  }
}