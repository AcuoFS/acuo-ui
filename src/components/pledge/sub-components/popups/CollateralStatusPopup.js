import React from 'react'
import CollateralAllocateTab from './tabs/CollateralAllocateTab'
import CollateralEarmarkCollateralTab from './tabs/CollateralEarmarkCollateralTab'
import {
  POPUP_TAB_ALLOCATE,
  POPUP_TAB_EARMARK
} from '../../../../constants/CollateralTypes'
import styles from '../../Pledge.css'


export default class CollateralStatusPopup extends React.Component{
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

  render(){
    const {propCollateralType, propAssetId, propAssetIdType, statusClass,
      propStatus, propIsDisplayAll, listOfMarginCallName, rawPrice,
      checkAmountExceeding
    } = this.props

    return (
      <div className={styles.relative} onClick={this.showPopup}
           data-ref={propCollateralType + propAssetId + propAssetIdType}>
        <span className={statusClass}>{propStatus}</span>
        <div
          className={(propIsDisplayAll ? styles.boxed : styles.leftBoxed ) + ' ' +
          ((this.state.toggle == propCollateralType + propAssetId + propAssetIdType) ? styles.showBox : '')}>
          <div className={styles.tabHolder}>
            <div
              className={styles.tab + ' ' + this.checkSelection(POPUP_TAB_ALLOCATE)}
              data-ref={POPUP_TAB_ALLOCATE}
              onClick={this.selectTab}>
              Allocate to Call
            </div>
            <div
              className={styles.tab + ' ' + this.checkSelection(POPUP_TAB_EARMARK)}
              data-ref={POPUP_TAB_EARMARK}
              onClick={this.selectTab}>
              Earmark
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

            <CollateralEarmarkCollateralTab checkContent={this.checkContent}
                                            checkAmountExceeding={checkAmountExceeding}
                                            rawPrice={rawPrice}/>

          </div>
        </div>
      </div>

    )
  }

}