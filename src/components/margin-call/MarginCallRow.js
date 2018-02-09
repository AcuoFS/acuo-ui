/**
 * Created by Hz on 2017-01-13.
 * this is a single row, data from parent should be - row
 */
import React from 'react'
import styles from './MarginCall.css'
import {checkNegative} from '../../utils/formatNegativeAmount'
import {checkBox, checkBoxWithTick} from '../../../images/common'
import MarginCallAgreementDetailRow from './sub-components/MarginCallAgreementDetailRow'


export default class MarginCallRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // isChecked: props.isChecked,
      isExpanded: false
    }

    this.toggleIsChecked = this.toggleIsChecked.bind(this)
    this.onArrowClick = this.onArrowClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // Make sure it's really an update of the checkbox from
    // parent before update of state from prop
    // if (nextProps.isChecked != this.props.isChecked) {
    //   this.setState({
    //     isChecked: nextProps.isChecked
    //   })
    // }
  }

  toggleIsChecked() {
    // update parent via callback
    this.props.propHandlerSingleRow(this.props.row, this.props.selected)
    // this.setState(state => Object.assign({}, state, {isChecked: !state.isChecked}))
  }

  onArrowClick(e) {
    // this.props.spillContents(e)
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render() {
    const {isOpen, displayAll, spillContents, row:item, propHandlerOnTotalMargin} = this.props
    const id = 'temp_static_id'

    let agreementDetailComp
    if (this.state.isExpanded) {
      agreementDetailComp = <MarginCallAgreementDetailRow propAgreementDetailObj={item.agreementDetails}/>
    }

    return (
      <div className={styles.groupContainer + ' ' + (this.props.selected ? styles.highlightedGroup : '')}>
        <div className={styles.flexContainer + ' ' +
        (this.state.isExpanded ? styles.contentRowExpand : styles.contentRow)}>
          <div className={styles.cell}>
            {/*<input type="checkbox" checked={this.state.isChecked} onChange={this.toggleIsChecked} />*/}
            <img className={styles.rowCheckbox} onClick={this.toggleIsChecked} src={this.props.selected ? checkBoxWithTick : checkBox}/>
          </div>
          <div className={styles.cell}>{item.legalEntity || '-'}</div>
          <div className={styles.cell}>{item.cptyOrg || '-'}</div>
          <div className={styles.cell}>{item.cptyEntity || '-'}</div>
          <div className={styles.cell + ' marginAgreement'}>{item.marginAgreement || '-'}</div>
          <div className={styles.cell + ' ' + styles.ccyCell + ' portfolioId'}>{item.portfolioId || '-'}</div>
          <div className={styles.cell + ' ' + styles.dateCell + ' ' + styles.boldCellText}>
            {item.valuationDate || '-'}
          </div>
          <div className={styles.cell + ' ' + styles.largeCell + ' exposure'}>{checkNegative(item.exposure || 0)}</div>
          <div className={styles.cell + ' ' + styles.callTypeCell + ' callType'}>{item.callType || '-'}</div>
          <div className={styles.cell + ' ' + styles.dateCell + ' ' + styles.boldCellText + ' callDate'}>
            {item.callDate || '-'}
          </div>
          <div className={styles.cell + ' ' + styles.ccyCell}>{item.currency || '-'}</div>
          <div className={styles.cell + ' ' + styles.largeCell + ' ' + styles.boldCellText
          + ' ' + styles.clickableCell}
               onClick={(e) => propHandlerOnTotalMargin(item.totalCallAmount, item.mgnCallUploadId, e.pageX, e.pageY, this.state.isExpanded)}>
            {checkNegative(item.totalCallAmount || 0)}
            <div className={styles.tooltip}>
              Click to edit
            </div>
          </div>
          <div className={styles.cell + ' ' + styles.largeCell}>{checkNegative(item.collateralValue || 0)}</div>
          <div className={styles.cell + ' ' + styles.largeCell}>{item.pendingCollateral || '-'}</div>
          <div className={styles.cell} onClick={(e) => this.onArrowClick(e)} data-ref={id}></div>
        </div>
        {agreementDetailComp}
      </div>
    )

  }
}
