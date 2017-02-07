/**
 * Created by panyong on 22/11/16.
 */
import React from 'react'
import {render} from 'react-dom'
import OptItem from './sub-components/OptItem'
import ChooseCalls from './sub-components/ChooseCalls'
import Selection from '../pledge-selection/Selection'
import CollateralAssetGroup from './sub-components/CollateralAssetGroup'
import {OPTIMISATION_URL,MARGIN_SELECTION_URL} from '../../constants/APIcalls'
import styles from './Pledge.css'

import { List } from 'immutable'

class Pledge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      dropdown: "./images/common/minusbox.png",

      toggleColwidthL: styles.minDivL, 
      toggleColwidthR: styles.expandDivR,

      toggleHideCol: styles.showCol,
      toggleShowHideL : false, 
      toggleShowHideR : true,
      sideways: "./images/pledge/sideways-min.png",
      selectionSideway: "./images/pledge/sideways-max.png",
      chsCallsTickState: 'None',
      checkbox: "./images/pledge/checkbox.png",
      selTickBox: 'none'
    }
    this.changeSideways = this.changeSideways.bind(this)
    this.onPledgeButtonClick = this.onPledgeButtonClick.bind(this)
    // this.renderCollateralItems = this.renderCollateralItems.bind(this)

    fetch(OPTIMISATION_URL).then(response => {
      return response.json()
    }).then(obj => {
      this.props.onInitOptimisationSettings(obj.items)
    })

    fetch(MARGIN_SELECTION_URL).then(response => {
      return response.json()
    }).then(obj => {
      this.props.initSelection(obj)
    })
  }

  changeSideways() {
    if (this.state.open) {
      this.setState({
        open: false,
        toggleShowHideL : true,
        toggleShowHideR : false,
        toggleColwidthL: styles.expandDivL,
        toggleColwidthR: styles.minDivR,
        toggleHideCol: styles.hideCol,
        sideways: "./images/pledge/sideways-max.png",
        selectionSideway: "./images/pledge/sideways-min.png",
      })
    } else {
      this.setState({
        open: true,
        toggleColwidthL: styles.minDivL,
        toggleColwidthR: styles.expandDivR,
        toggleHideCol: styles.showCol,
        toggleShowHideL : false,
        toggleShowHideR : true,
        sideways: "./images/pledge/sideways-min.png",
        selectionSideway: "./images/pledge/sideways-max.png",
      })
    }
  }

  renderOptItems(optimisation, onUpdateOptimisationSettings){
    if(optimisation) {
      return optimisation.map((x,index) => {
        return (<OptItem sldName={x.get('name')}
                         allocation={x.get('rating')}
                         onUpdate={onUpdateOptimisationSettings}
                         key={index}/>)
      })
    }
  }

  renderSelection(x, onTogglePendingAllocation, pendingAllocation, index){
    return (<Selection  sideways={this.state.selectionSideway}
                        clicked={this.changeSideways}
                        chkTick={this.chkTick}
                        toggleL={this.state.toggleShowHideL}
                        toggleR={this.state.toggleShowHideR}
                        marginCall={x}
                        key={index}
                        onTogglePendingAllocation={onTogglePendingAllocation}
                        pendingAllocationStore={pendingAllocation}/>)
  }

  //generic checker
  checkIfExist(something){
    return something || List()
  }


  onPledgeButtonClick(e){


    alert('Pledge Button Click')
  }

  sumOfIMVM(sumSelX, x) {
    return sumSelX + (x.getIn(['allocated', 'initialMargin'])
        ? (x.getIn(['allocated', 'initialMargin']).size
        + x.getIn(['allocated', 'variationMargin']).size)
        : 0 )
  }

  isShowPledgeBtn(selection) {
    if (selection) {
      for (const statement of selection) {
        if (statement.get('allocated')) {
          return true
        }
      }
    }
    return false
  }

  render() {
    const { optimisation, selection, onUpdateOptimisationSettings, onTogglePendingAllocation,
      pendingAllocation, sliderCheckbox, onToggleCheckall, onAllocate,
      collateral, onRemoveFromEarmarked, onPledge} = this.props

    let collateralHeader = (
      <div className={styles.collateralRow + ' ' + styles.collateralHeader + ' ' + styles.collateralTableExpanded}>
        <div className={styles.collateralCell}>Asset</div>
        <div className={styles.collateralCell}>Total Value</div>
        <div className={styles.collateralCell}>CCY</div>
        <div className={styles.collateralCell}>Delivery Time</div>
        <div className={styles.collateralCell}>Status</div>
        <div className={styles.collateralCell}>Rating</div>
        <div className={styles.collateralCell}>Maturity Date</div>
      </div>
    )

    if(this.state.open){
      collateralHeader = (
        <div className={styles.collateralRow + ' ' + styles.collateralHeader + ' ' + styles.collateralTableExpanded}>
          <div className={styles.collateralCell}>Asset</div>
          <div className={styles.collateralCell}>Total Value</div>
          <div className={styles.collateralCell}>CCY</div>
          <div className={styles.collateralCell}>Delivery Time</div>
          <div className={styles.collateralCell}>Status</div>
          <div className={styles.collateralCell}>Rating</div>
          <div className={styles.collateralCell}>Maturity Date</div>
          <div className={styles.collateralCell}>Internal Cost (bps)</div>
          <div className={styles.collateralCell}>Opportunity Cost (bps)</div>
          <div className={styles.collateralCell}>ISIN</div>
          <div className={styles.collateralCell}>Venue</div>
          <div className={styles.collateralCell}>Acc ID</div>
        </div>
      )
    }

    let collateralAssetGroupList = []

    if (collateral) {
      const collateralJSList = collateral.toJS()
      for (const key of Object.keys(collateralJSList)) {
        collateralAssetGroupList = [...collateralAssetGroupList,
          <CollateralAssetGroup key={key}
                                propCollateralType={key}
                                propCollateralAssetList={collateralJSList[key]}
                                propIsExpanded={true}
                                propIsDisplayAll={this.state.open}
                                propHandleOnRemoveFromEarmarked={onRemoveFromEarmarked}/>
        ]
      }
    }


    return (

        <div className={styles.pledgeContainer}>
          <div className={styles.sliderAndStatus}>
            <div className={styles.panel} id={styles.optSetting}>
              <div className={styles.panelTitle}>Optimization Setting <img src={'./images/pledge/locked.png'} /></div>
              <div className={styles.optPnlWrap}>
                {this.renderOptItems(optimisation, onUpdateOptimisationSettings)}
              </div>
              <div className={styles.buttonHolder}>
                <ChooseCalls tickImg={sliderCheckbox[0]} tickState={sliderCheckbox[1]}
                             tickClick={onToggleCheckall}/>

                <div className={styles.optButton + ' ' +
                (this.checkIfExist(pendingAllocation).size > 0 ? '' : styles.btnDisabled )}
                     onClick={() => onAllocate(pendingAllocation.toJS(), optimisation.toJS())}>
                  Allocate
                </div>

                {/*<div className={styles.optButton + ' ' +*/}
                {/*(this.checkIfExist(selection).reduce(this.sumOfIMVM, 0) > 0*/}
                  {/*? styles.optBtnPledge*/}
                  {/*: styles.btnDisabled )}*/}
                     {/*onClick={() => onPledge(selection.toJS())}>*/}
                  {/*Pledge*/}
                {/*</div>*/}

                <div className={styles.optButton + ' ' +
                (this.isShowPledgeBtn(selection)
                  ? styles.optBtnPledge
                  : styles.btnDisabled )}
                     onClick={() => onPledge(selection.toJS())}>
                  Pledge
                </div>


              </div>
              {/* change btnEnabled to btnDisabled to disable the button*/}
            </div>

            <div className={styles.panel} id={styles.pleStatus}>
              {/*<div className={styles.panelTitle}>Pledge Status</div>*/}
              <img src="./images/pledge/Pledge-status-widget.png"/>
            </div>
          </div>

          <div className={styles.secDivider}></div>

          <div className={styles.flexContainer}>

            <div className={styles.col_L + ' ' + this.state.toggleColwidthL}>

              {this.checkIfExist(selection)
                .map((x, index) => this.renderSelection(x, onTogglePendingAllocation, pendingAllocation, index))}

            </div>

            <div className={styles.col_R + ' ' + this.state.toggleColwidthR}>
              <div className={styles.panel}>
                <div className={styles.panelTitle}>Collateral
                  <img src={this.state.sideways} className={styles.imageRight} onClick={this.changeSideways}/>
                </div>

                <div className={styles.collateralTable}>

                  {collateralHeader}

                  {collateralAssetGroupList}

                  {/*<CollateralAssetGroup propCollateralType={"Earmarked"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('earmarked').toJS() : [] }
                                        propIsExpanded={true}
                                        propIsDisplayAll={this.state.open}
                                        propHandleOnRemoveFromEarmarked={this.props.onRemoveFromEarmarked}/>

                  <CollateralAssetGroup propCollateralType={"Cash"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('cash').toJS() : [] }
                                        propIsExpanded={true}
                                        propIsDisplayAll={this.state.open}/>

                  <CollateralAssetGroup propCollateralType={"MM Instruments"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('mmInstruments').toJS() : [] }
                                        propIsExpanded={true}
                                        propIsDisplayAll={this.state.open}/>

                  <CollateralAssetGroup propCollateralType={"Soverign Bonds"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('sovereignBonds').toJS() : [] }
                                        propIsExpanded={true}
                                        propIsDisplayAll={this.state.open}/>

                  <CollateralAssetGroup propCollateralType={"Govt Agencies"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('govtAgencies').toJS() : [] }
                                        propIsExpanded={false}
                                        propIsDisplayAll={this.state.open}/>

                  <CollateralAssetGroup propCollateralType={"Corporate Debt"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('corporateDebt').toJS() : [] }
                                        propIsExpanded={false}
                                        propIsDisplayAll={this.state.open}/>

                  <CollateralAssetGroup propCollateralType={"Corporate Equity"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('corporateEquity').toJS() : [] }
                                        propIsExpanded={true}
                                        propIsDisplayAll={this.state.open}/>*/}
                </div>

              </div>
            </div>

          </div>
        </div>

    )
  }
}

export default Pledge
