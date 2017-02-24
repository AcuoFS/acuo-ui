import React from 'react'
import CollateralAllocateTab from './tabs/CollateralAllocateTab'
import CollateralAmendEarmarkTab from './tabs/CollateralAmendEarmarkTab'
import CollateralRemoveEarmarkTab from './tabs/CollateralRemoveEarmarkTab'
import {
  POPUP_TAB_ALLOCATE,
  POPUP_TAB_AMEND,
  POPUP_TAB_REMOVE_EARMARK
} from '../../../../constants/CollateralTypes'
import styles from '../../Pledge.css'


export default class CollateralAllocatePopup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      toggle: "",
      selectedTab: POPUP_TAB_ALLOCATE
    }

    this.showPopup = this.showPopup.bind(this)
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

  showPopup(popupId) {
    this.setState({
      toggle: popupId
    })
  }

  checkSelection(selection, selectedTab) {
    return (selection == selectedTab ? styles.selectedTab : '')
  }

  selectTab(tab) {
    this.setState({
      selectedTab: tab
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

  render(){
    const {propCollateralType, propAssetId, propAssetIdType, statusClass,
      propStatus, propIsDisplayAll, listOfMarginCallName, rawPrice,
      checkAmountExceeding} = this.props

    return (
      <div className={styles.relative} onClick={() =>
        this.showPopup(propCollateralType + propAssetId + propAssetIdType)}>
        <span className={statusClass}>{propStatus}</span>

        {
          (this.state.toggle == propCollateralType + propAssetId + propAssetIdType) &&
          <div className={(propIsDisplayAll ? styles.boxed : styles.leftBoxed )
          + ' ' + styles.showBox}>
            <div className={styles.tabHolder}>
              <div
                className={styles.tab + ' ' +
                this.checkSelection(POPUP_TAB_ALLOCATE, this.state.selectedTab)}
                onClick={() => this.selectTab(POPUP_TAB_ALLOCATE)}>
                Allocate to Call
              </div>
              <div
                className={styles.tab + ' ' +
                this.checkSelection(POPUP_TAB_AMEND, this.state.selectedTab)}
                onClick={() => this.selectTab(POPUP_TAB_AMEND)}>
                Amend
              </div>
              <div
                className={styles.tab + ' ' +
                this.checkSelection(POPUP_TAB_REMOVE_EARMARK, this.state.selectedTab)}
                onClick={() => this.selectTab(POPUP_TAB_REMOVE_EARMARK)}>
                Remove
              </div>

              <div className={styles.closeButton} onClick={this.removeCollateralBox}>
                x
              </div>
            </div>

            <div className="content">
              <CollateralAllocateTab checkContent={this.checkContent}
                                     checkAmountExceeding={checkAmountExceeding}
                                     listOfMarginCallName={listOfMarginCallName}
                                     rawPrice={rawPrice}/>

              <CollateralAmendEarmarkTab checkContent={this.checkContent}
                                         checkAmountExceeding={checkAmountExceeding}
                                         rawPrice={rawPrice}/>

              <CollateralRemoveEarmarkTab checkContent={this.checkContent}/>

            </div>
          </div>
        }
      </div>

    )
  }

}