/**
 * Created by achalkagwad on 9/11/16.
 */
import React, {PropTypes} from 'react'
import MarginAgreementDetailExpand from './MarginAgreementDetailExpand'
import {List} from 'immutable'
import {numberWithCommas} from '../../../utils/numbersWithCommas'
import styles from '../MarginAgreementList.css'


export default class MarginAgreementDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      expand: "./images/reconcile/plus.png",
      checkbox: "./images/reconcile/checkbox.png",
      cbTicked: false,
      cbLvl1: styles.show,
      pkgLvl2: styles.hide
    }
    this.handleClick = this.handleClick.bind(this)
    this.handlePlusMinus = this.handlePlusMinus.bind(this)
    this.firstLevelSelect = this.firstLevelSelect.bind(this)
  }

  sendAction(i, j) {
    this.props.handlerSelectedItem(i, j)
  }

  handleClick() {
    if (this.state.cbTicked) {
      this.setState({
        cbTicked: false,
        checkbox: "./images/reconcile/checkbox.png"
      })
    } else {
      this.setState({
        cbTicked: true,
        checkbox: "./images/reconcile/checkboxwithtick.png"
      });
    }
  }

  handlePlusMinus() {
    if (this.state.open) {
      this.setState({
        open: false,
        expand: "./images/reconcile/plus.png",
        cbLvl1: styles.show,
        pkgLvl2: styles.hide
      })
    } else {
      this.setState({
        open: true,
        expand: "./images/reconcile/minus.png",
        cbLvl1: styles.hide,
        pkgLvl2: styles.show
      })
    }
  }

  renderHidden(secondLevel, GUID, discrepancy, secondLevelDiscrepancy) {

    return secondLevel.map((x, index) => {

      let highlightThis = (x.get('assetName') == secondLevelDiscrepancy)

      return (
        <div className={ x.get('recon') ? styles.packageRowGrey : (discrepancy && highlightThis ? styles.packageRowHighLight : '')} key={index}>
          <div className={styles.packageLvl2 + ' ' + this.state.pkgLvl2} key={Date.now() * Math.random()}>
            {/* have second level table rendering structure here */}
            <div className={styles.packageRow}>
              <div className={styles.packageLeft}>
                <div className={styles.packageCheckBox} onClick={(e) => {
                  this.handleClick(e);
                  this.sendAction(GUID, x.get('assetName'))
                }}>
                  {x.get('recon') ? '' : <img
                    src={x.get('checked') ? "./images/reconcile/checkboxwithtick.png" : "./images/reconcile/checkbox.png"}
                    alt=""/>}
                </div>
                <div className={styles.secondLevelText}>{ x.get('assetName') }</div>
              </div>
              <div className={styles.packageRight}>{ numberWithCommas(x.get('amount')) }</div>
            </div>
          </div>
        </div>
      )
    })
  }

  firstLevelSelect() {
    const {secondLevel, handlerSelectedItem, GUID} = this.props
    secondLevel.map(secondLevelAsset => (
        handlerSelectedItem(GUID, secondLevelAsset.get('assetName'))
      )
    )
  }

  render() {

    const {
      topLevel, secondLevel, GUID,
      totalAmount, isSecondLevel, checkboxImageUrl, discrepancy, secondLevelDiscrepancy
    } = this.props

    return (
      <div className={ isSecondLevel ? styles.packageRowGrey : ''}>

        <div className={ styles.packageRow + ' ' + (discrepancy && !this.state.open ? styles.packageRowHighLight : '')}> {/* one row div*/}
          <div className={styles.packageLeft}>
            <div className={styles.packageCheckBox + ' ' + this.state.cbLvl1}
                 onClick={this.firstLevelSelect}>
              {isSecondLevel ? '' : <img src={checkboxImageUrl}/>}
            </div>
            <div className={styles.packageText}>{topLevel}</div>
            <MarginAgreementDetailExpand
              doClick={this.handlePlusMinus}
              image={this.state.expand}
            />
          </div>
          <div className={styles.packageRight}>{numberWithCommas(totalAmount)}</div>
        </div>

        {this.renderHidden(secondLevel, GUID, discrepancy, secondLevelDiscrepancy)}
      </div>
    )
  }
}

MarginAgreementDetail.PropTypes = {
  GUID: PropTypes.string.isRequired,
  topLevel: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
  secondLevel: PropTypes.instanceOf(List).isRequired,
  handlerSelectedItem: PropTypes.func.isRequired,
  isSecondLevel: PropTypes.bool.isRequired,
  checkboxImageUrl: PropTypes.string.isRequired
  // discrepancy:
}
