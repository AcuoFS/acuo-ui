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
      currentAsset: {}
    }

    this.togglePendingAllocation = this.togglePendingAllocation.bind(this)
    this.setDeselectionPopup = this.setDeselectionPopup.bind(this)
    this.clearDeselectionPopup = this.clearDeselectionPopup.bind(this)
    this.handlerChangeSideWaysClick = this.handlerChangeSideWaysClick.bind(this)
    this.setPopupFormValidity = this.setPopupFormValidity.bind(this)
  }

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

  renderMargin(asset, id, mgnType, guid) {
    const popupID = guid + mgnType + asset.get(ASSET.A_ID) + asset.get(ASSET.A_NAME)
    return (
      <tr key={id + "_" + asset.get(ASSET.A_ID)}
          onDrop={ e=>this.dragNdrop.ondrop_handler(e) }
          onDragOver={ e=>this.dragNdrop.onDragOver_handler(e) }
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

  dragNdrop = {  ondrop_handler: (e)=>{  let payload = e.dataTransfer.getData("text")
                                         console.log("Data ondrop |-> ",JSON.parse(payload));
                                         e.preventDefault() },

                 onDragOver_handler: (e)=>{ e.preventDefault() }
              }


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
    // Clear and close popup if selection list is collapsed
    if (!nextProps.toggleL && nextProps.toggleR) {
      this.clearDeselectionPopup()
    }
  }

  render() {
    const {
      marginCall, pendingAllocationStore,
      toggleL, toggleR, sideways,
      onRemoveAssetFromAllocate
    } = this.props

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
                          onRemoveAssetFromAllocate={onRemoveAssetFromAllocate}/>

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
                  { evlEmptyForIntMargin ?
                    <tr>
                      <td colSpan="8"
                          className={styles.notAlcText}
                          onDrop={ e=>this.dragNdrop.ondrop_handler(e) }
                          onDragOver={ e=>this.dragNdrop.onDragOver_handler(e) }
                        >
                       Collateral has not been allocated
                      </td>
                    </tr> :
                    this.checkIfExist(marginCall.getIn(['allocated', ASSET.A_LIST_IM])).map( (x, id)=>{
                       return this.renderMargin(x, id, ASSET.A_LIST_IM, marginCall.get('GUID'))
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
                          onDrop={ e=>this.dragNdrop.ondrop_handler(e) }
                          onDragOver={ e=>this.dragNdrop.onDragOver_handler(e) }
                          >
                          Collateral has not been allocated
                      </td>
                    </tr> :
                    this.checkIfExist(marginCall.getIn(['allocated', ASSET.A_LIST_VM])).map( (x, id)=>{
                      return this.renderMargin(x, id , ASSET.A_LIST_VM, marginCall.get('GUID'))
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
