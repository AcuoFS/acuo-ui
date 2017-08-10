import React from 'react'
import _ from 'lodash'
import {checkNegative} from '../../utils'
import DeselectionPopup from './sub-components/DeselectionPopup'
import {List, toJS} from 'immutable'
import * as ASSET from '../../constants/AllocatedAssetAttributes'
import * as ALLOCATED from '../../constants/AllocatedAttributes'
import styles from './Selection.css'
import AllocatePopup from './popup-allocate.js'

export default class Selection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openedDeselectionPopup: "",
      isValidPopupForm: false,
      currentAsset: {},
      allocationPopup: false,
      assetAllocated: null,
      existingAsset: null,
      agreementName: null,
      marginType: null
    }

    this.togglePendingAllocation = this.togglePendingAllocation.bind(this)
    this.setDeselectionPopup = this.setDeselectionPopup.bind(this)
    this.clearDeselectionPopup = this.clearDeselectionPopup.bind(this)
    this.handlerChangeSideWaysClick = this.handlerChangeSideWaysClick.bind(this)
    this.setPopupFormValidity = this.setPopupFormValidity.bind(this)
    this.popupUnmount = this.popupUnmount.bind(this)
  }

  popupUnmount(){
   this.setState(
      (prevState)=>{
        let clone = _.clone(prevState)
        _.update(clone, 'allocationPopup', ()=>false)
        _.update(clone, 'marginType', ()=>null)
        _.update(clone, 'assetAllocated', ()=>null)
        _.update(clone, 'existingAsset', ()=>null)
       return clone
      } )
  }// end popupUnmount()

  renderGroup(x, GUID) {
    return (
      <div className={styles.group} key={x.get('groupName') + GUID}>
        {this.checkIfExist(x.get('data')).map((y, index) => {
          return (
            <div className={styles.firstLevel} key={index}>
              <div className={styles.assetName}>
                {y.getIn(['firstLevel', 'name'])}
              </div>
              <div className={styles.amount}>
                {/*{checkNegative(y.getIn(['firstLevel', 'secondLevel']).reduce((sum, z) => {*/}
                  {/*return sum + parseFloat(z.get('amount'))*/}
                {/*}, 0))}*/}
                {checkNegative(parseFloat(y.getIn(['firstLevel', 'amount'])))}
              </div>
            </div>)
        })}
      </div>
    )
  }

  renderMargin(asset, id, agreementName, mgnType, guid) {
    const popupID = guid + mgnType + asset.get(ASSET.A_ID) + asset.get(ASSET.A_NAME)
    return (
      <tr key={id + "_" + asset.get(ASSET.A_ID)}
          onDrop={ e=>this.dragNdrop.ondrop_handler(e, this.state, asset, mgnType) }
          onDragOver={ e=>this.dragNdrop.onDragOver_handler(e) }
          onDragLeave={ e=>this.dragNdrop.onDragLeave_handler(e) }
          >
        <td>{asset.get(ASSET.A_NAME)}</td>
        <td>{checkNegative(asset.get(ASSET.A_NET_AMT))}</td>
        <td>{asset.get(ASSET.A_CCY)}</td>
        <td>{asset.get(ASSET.A_HAIRCUT_PCT)}%</td>
        <td>{checkNegative(asset.get(ASSET.A_AMT))}</td>
        <td>{checkNegative(asset.get(ASSET.A_FX))}</td>
        <td>{asset.get(ASSET.A_VENUE)}</td>
        <td>
          <div className={styles.earmarkAssetButton}
               onClick={() => {
                 this.setDeselectionPopup(popupID, asset.toJS())
               }}>
            <img src="./images/pledge/cancel.png"></img>
            {/*<div className={styles.tooltip}>*/}
              {/*Move to Earmarked*/}
            {/*</div>*/}
          </div>

        </td>
      </tr>
    )
  }

  dragNdrop = {
    ondrop_handler: (e, state, existingData, marginType) => {
      e.currentTarget.style.background = "white"
      let droppedData = e.dataTransfer.getData("text")
      this.setState((prevState) => {
        let clone = _.clone(prevState)
        _.update(clone, 'allocationPopup', () => true)
        _.update(clone, 'marginType', () => marginType)
        _.update(clone, 'assetAllocated', () => JSON.parse(droppedData))
        if (existingData) _.update(clone, 'existingAsset', () => existingData.toJS())
        return clone
      })
      e.preventDefault()
    },

    onDragOver_handler: (e) => {
      e.currentTarget.style.background = "#e5e5e5"
      e.preventDefault()
    },

    onDragLeave_handler: (e) => {
      e.currentTarget.style.background = "white"
    }

  } // end dragNdrop{}


  togglePendingAllocation(e) {
    this.props.onTogglePendingAllocation(e.currentTarget.dataset.ref)
  }

  //generic checker
  checkIfExist(something) {
    return something || List()
  }

  calSubTotal(a, s) {
    if (a.getIn(['allocated', s]))
      return (a.getIn(['allocated', s]).reduce((SumX, x) => {
        return SumX + parseFloat(x.get('price'))
      }, 0))
    else
      return 0
  }

  calTotal(a, i, j) {
    return this.calSubTotal(a, i) + this.calSubTotal(a, j)
  }

  setDeselectionPopup(popupID, asset) {
    this.setState({
      openedDeselectionPopup: popupID,
      currentAsset: asset
    })
  }

  clearDeselectionPopup() {
    this.setState({
      openedDeselectionPopup: "",
      isValidPopupForm: false
    })
  }

  handlerChangeSideWaysClick({clicked, toggleL}) {
    clicked()

    // Clear popup when selection panel is collapsed
    if (toggleL) {
      this.clearDeselectionPopup()
    }
  }

  setPopupFormValidity(isValid) {
    this.setState({isValidPopupForm: isValid})
  }

  // Before change of props
  componentWillReceiveProps(nextProps) {
    if (!nextProps.toggleL && nextProps.toggleR) {
      this.clearDeselectionPopup()
    }
  }

  componentDidMount(){
    this.setState({agreementName: this.props.marginCall.get('agreementName')})
  }

  render() {
    const {
      pendingAllocationStore,
      toggleL, toggleR, sideways,
      onRemoveAssetFromAllocate
    } = this.props

    const {marginCall} = this.props // As of 26May17, only Variation and Initial Margin Types have been implemented. Remember to cater for other marginTypes in the future

    let evlEmptyForIntMargin = this.checkIfExist(marginCall.getIn(['allocated', ASSET.A_LIST_IM])).isEmpty()
    let evlEmptyForVariMargin = this.checkIfExist(marginCall.getIn(['allocated', ASSET.A_LIST_VM])).isEmpty()
    let evlEmptyForMargin = !this.checkIfExist(marginCall.getIn(['allocated', ASSET.A_LIST_IM])).isEmpty() || !this.checkIfExist(marginCall.getIn(['allocated', ASSET.A_LIST_VM])).isEmpty()

    return (
      <div className={styles.panel} key={marginCall.get('GUID')}>

        <DeselectionPopup propOpenedDeselectionPopup={this.state.openedDeselectionPopup}
                          propHandlerClearPopup={this.clearDeselectionPopup}
                          propIsValidFlag={this.state.isValidPopupForm}
                          propDeselectAsset={this.state.currentAsset}
                          GUID={marginCall.get('GUID')}
                          propHandlerSetFormValidity={this.setPopupFormValidity}
                          onRemoveAssetFromAllocate={onRemoveAssetFromAllocate}
         />

        { this.state.allocationPopup &&
          <AllocatePopup popupUnmount={this.popupUnmount}
                         agreementName={marginCall.get('agreementName')}
                         allocatedAsset={this.state.assetAllocated}
                         existingAsset={this.state.existingAsset}
                         marginType={this.state.marginType}  /> }

        <div className={styles.columnContainer}>
          <div className={styles.leftColumn + ' ' + (!toggleL ? styles.bigger : '')}>
            <div className={styles.titleHolder}>
              <img
                src={(this.checkIfExist(pendingAllocationStore).includes(marginCall.get('GUID')) ? "./images/pledge/checkboxwithtick.png" : "./images/pledge/checkbox.png")}
                className={styles.selTick} onClick={this.togglePendingAllocation} data-ref={marginCall.get('GUID')}/>
              <span className={styles.panelTitle}>{marginCall.get('legalEntity')}</span>
              <div className={styles.subtitle}>
                {marginCall.get('agreementName')}
                {/*- {marginCall.get('GUID')}*/}
              </div>
            </div>
            <div className={styles.callTitle}>
              Calls Due
            </div>
            <div>
              {this.checkIfExist(marginCall.get('clientAssets')).map(x => this.renderGroup(x, marginCall.get('GUID')))}
            </div>
            <div className={styles.total}>
              <div className={styles.firstLevel}>
                <div className={styles.assetName}>
                  Total
                </div>
                <div className={styles.amount}>
                  {/*{checkNegative(this.checkIfExist(marginCall.get('clientAssets')).reduce((sum, x) => {*/}
                    {/*return sum + x.get('data').reduce((sum, y) => {*/}
                        {/*return sum + y.getIn(['firstLevel','secondLevel']).reduce((sum, z) => {*/}
                            {/*return sum + parseFloat(z.get('amount'))*/}
                          {/*}, 0)*/}
                      {/*}, 0)*/}
                  {/*}, 0))}*/}
                  {checkNegative(this.checkIfExist(marginCall.get('clientAssets')).reduce((sum, x) => {
                    return sum + x.get('data').reduce((sum, y) => {
                        return sum + parseFloat(y.getIn(['firstLevel','amount']))
                      }, 0)
                  }, 0))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.rightColHeading}>
              <div className={styles.rightColumnTitle + ' ' + (toggleL ? styles.showL : styles.hideL)}>
                Selection
              </div>
              <div className={styles.imageRight}>
                <img src={sideways}
                     onClick={() => {
                       this.handlerChangeSideWaysClick(this.props)
                     }} alt="" className={styles.cursorPointer}/>
              </div>
            </div>

            <div className={styles.ttlMarginWrap + ' ' + (toggleR ? styles.showR : styles.hideR)}>
              <div className={styles.ttlMargin}>
                <div>Total Allocated</div>
                <div className={styles.bigFig + ' ' + styles.bold}>
                  {Math.round((marginCall.getIn(['allocated', ALLOCATED.MGN_TOTAL]) || 0) / 10000) / 100}
                </div>
                <div className={styles.bold}>Million</div>
              </div>
            </div>

            <div className={toggleL ? styles.showL : styles.hideL}>

              <div className={styles.rightColSubSection}>
                <div className={styles.subSectionHeader}>Initial Margin</div>
                <table className={styles.selTable + ( evlEmptyForIntMargin ? ' ' + styles.notAllocated : '')}>
                  <thead>
                  <tr className={styles.bold}>
                    <th></th>
                    <th>Net Amt.</th>
                    <th>CCY</th>
                    <th>Haircut</th>
                    <th>Amt.</th>
                    <th>FX</th>
                    <th>Venue</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  { evlEmptyForIntMargin ?
                    <tr>
                      <td colSpan="8"
                          className={styles.notAlcText}
                          onDrop={ e=>this.dragNdrop.ondrop_handler(e, this.state, false , ASSET.A_LIST_IM) }
                          onDragOver={ e=>this.dragNdrop.onDragOver_handler(e) }
                          onDragLeave={ e=>this.dragNdrop.onDragLeave_handler(e) }
                        >
                       Collateral has not been allocated
                      </td>
                    </tr> :
                    this.checkIfExist(marginCall.getIn(['allocated', ASSET.A_LIST_IM])).map( (x, id)=>{
                       return this.renderMargin(x,
                                                id,
                                                marginCall.toJS().agreementName,
                                                ASSET.A_LIST_IM,
                                                marginCall.get('GUID'))
                    })
                  }
                  <tr className={styles.bold}>
                    <td>Sub-Total</td>
                    <td>
                      {checkNegative(parseFloat(marginCall.getIn(['allocated', ALLOCATED.IM_TOTAL]) || 0).toFixed(2))}
                    </td>
                    <td>USD</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.rightColSubSection}>
                <div className={styles.subSectionHeader}>Variation Margin</div>
                <table className={styles.selTable + ( evlEmptyForVariMargin ? ' ' + styles.notAllocated : '')}>
                  <thead>
                  <tr className={styles.bold}>
                    <th></th>
                    <th>Adj. value</th>
                    <th>CCY</th>
                    <th>Haircut</th>
                    <th>Value</th>
                    <th>FX</th>
                    <th>Venue</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>

                  { evlEmptyForVariMargin ?
                    <tr>
                      <td colSpan="8"
                          className={styles.notAlcText}
                          onDrop={ (e)=>{this.dragNdrop.ondrop_handler(e, this.state, false, ASSET.A_LIST_VM)} }
                          onDragOver={ e=>this.dragNdrop.onDragOver_handler(e) }
                          onDragLeave={ e=>this.dragNdrop.onDragLeave_handler(e) }
                          >
                          Collateral has not been allocated
                      </td>
                    </tr> :
                    this.checkIfExist(marginCall.getIn(['allocated', ASSET.A_LIST_VM])).map( (x, id)=>{
                      return this.renderMargin(x,
                                               id ,
                                               marginCall.toJS().agreementName,
                                               ASSET.A_LIST_VM,
                                               marginCall.get('GUID'))
                    })
                  }


                  <tr className={styles.bold}>
                    <td>Sub-Total</td>
                    <td>
                      {checkNegative(parseFloat(marginCall.getIn(['allocated', ALLOCATED.VM_TOTAL]) || 0).toFixed(2))}
                    </td>
                    <td>USD</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
                <table className={styles.selTable}>
                  <tbody>
                  <tr className={styles.bold}>
                    <td>Total</td>
                    <td
                      className={styles.totalTable1 + ( evlEmptyForMargin ? ' ' + styles.notAll : '' )}>{checkNegative(parseFloat(marginCall.getIn(['allocated', ALLOCATED.MGN_TOTAL]) || 0).toFixed(2))}</td>
                    <td className={styles.totalTable2 + ( evlEmptyForMargin ? ' ' + styles.notAll : '' )}>USD</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>

      </div>
    )
  }
}
