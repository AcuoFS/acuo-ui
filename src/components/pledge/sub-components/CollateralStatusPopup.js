import React from 'react'
import CollateralAllocateTab from './CollateralAllocateTab'
import CollateralAmendEarmarkTab from './CollateralAmendEarmarkTab'
import CollateralRemoveEarmarkTab from './CollateralRemoveEarmarkTab'
import styles from '../Pledge.css'


export default class CollateralAllocatePopup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      toggle: "",
      selectedTab: 'allocate'
    }

    this.showPopup = this.showPopup.bind(this)
    // this.allocateCollateral = this.allocateCollateral.bind(this)
    // this.cancelCollateral = this.cancelCollateral.bind(this)
    // this.onRemoveFromEarmarked = this.onRemoveFromEarmarked.bind(this)
    this.removeCollateralBox = this.removeCollateralBox.bind(this)
    this.selectTab = this.selectTab.bind(this)
    this.checkSelection = this.checkSelection.bind(this)
    this.checkContent = this.checkContent.bind(this)
  }

  // allocateCollateral(e) {
  //   this.setState({
  //     allocateCollateral: e.currentTarget.dataset.ref
  //   })
  // }

  showPopup(e) {
    this.setState({
      toggle: e.currentTarget.dataset.ref
    })
  }

  checkSelection(selection) {
    return (selection == this.state.selectedTab ? styles.selectedTab : '')
  }

  selectTab(e) {
    this.setState({
      selectedTab: e.currentTarget.dataset.ref
    })
  }

  removeCollateralBox(e) {
    this.setState({
      toggle: ""
    })

    e.stopPropagation()
  }

  checkContent(selection) {
    return (selection == this.state.selectedTab ? styles.showContent : '')
  }

  checkAmountExceeding(total, amount) {
    if (amount > total)
      return (
        <div className={styles.errorPopUp}>
          Amount entered is larger than available.
        </div>
      )
  }

  render(){
    const {propCollateralType, propAssetId, propAssetIdType, statusClass,
      propStatus, propIsDisplayAll, listOfMarginCallName, rawPrice} = this.props

    return (
      <div className={styles.relative} onClick={this.showPopup}
           data-ref={propCollateralType + propAssetId + propAssetIdType}>
        <span className={statusClass}>{propStatus}</span>
        <div
          className={(propIsDisplayAll ? styles.boxed : styles.leftBoxed ) + ' ' +
          ((this.state.toggle == propCollateralType + propAssetId + propAssetIdType) ? styles.showBox : '')}>
          <div className={styles.tabHolder}>
            <div
              className={styles.tab + ' ' + this.checkSelection('allocate')}
              data-ref="allocate"
              onClick={this.selectTab}>
              Allocate to Call
            </div>
            <div
              className={styles.tab + ' ' + this.checkSelection('amend')}
              data-ref="amend"
              onClick={this.selectTab}>
              Amend
            </div>
            <div
              className={styles.tab + ' ' + this.checkSelection('remove')}
              data-ref="remove"
              onClick={this.selectTab}>
              Remove
            </div>

            <div className={styles.closeButton} onClick={this.removeCollateralBox}>
              x
            </div>
          </div>

          <div className="content">
            <CollateralAllocateTab checkContent={this.checkContent}
                                   checkAmountExceeding={this.checkAmountExceeding}
                                   listOfMarginCallName={listOfMarginCallName}
                                   rawPrice={rawPrice}/>

            <CollateralAmendEarmarkTab checkContent={this.checkContent}
                                       checkAmountExceeding={this.checkAmountExceeding}
                                       rawPrice={rawPrice}/>

            <CollateralRemoveEarmarkTab checkContent={this.checkContent}/>

          </div>
        </div>
      </div>

    )
  }

}