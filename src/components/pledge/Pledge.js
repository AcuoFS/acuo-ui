/**
 * Created by panyong on 22/11/16.
 */
import React from 'react'
import Selection from '../pledge-selection/Selection'
import PledgeSelectionContainer from './../../containers/SelectionContainer'
import CollateralWidgetContainer from '../../containers/CollateralWidgetContainer'
import {OPTIMISATION_URL, MARGIN_SELECTION_URL} from '../../constants/APIcalls'
import OptimisationWidget from '../pledge-optimisation/OptimisationWidget'
import styles from './Pledge.css'

import {List} from 'immutable'

class Pledge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      dropdown: "./images/common/minusbox.png",

      toggleColwidthL: styles.minDivL,
      toggleColwidthR: styles.expandDivR,

      toggleHideCol: styles.showCol,
      toggleShowHideL: false,
      toggleShowHideR: true,
      sideways: "./images/pledge/sideways-min.png",
      selectionSideway: "./images/pledge/sideways-max.png",
      chsCallsTickState: 'None',
      checkbox: "./images/pledge/checkbox.png",
      selTickBox: 'none'
    }
    this.changeSideways = this.changeSideways.bind(this)
    this.onPledgeButtonClick = this.onPledgeButtonClick.bind(this)



    // fetch(OPTIMISATION_URL).then(response => {
    //   return response.json()
    // }).then(obj => {
    //   this.props.onInitOptimisationSettings(obj.items)
    // })

    // #OW-324
    // fetch(MARGIN_SELECTION_URL).then(response => {
    //   return response.json()
    // }).then(obj => {
    //   // console.log("Selection Response Received", obj);
    //   this.props.initSelection(obj)
    // })
  }

  componentDidMount() {
    // this.props.onInitOptimisationSettings()
    this.props.initSelection()
  }

  changeSideways() {
    if (this.state.open) {
      this.setState({
        open: false,
        toggleShowHideL: true,
        toggleShowHideR: false,
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
        toggleShowHideL: false,
        toggleShowHideR: true,
        sideways: "./images/pledge/sideways-min.png",
        selectionSideway: "./images/pledge/sideways-max.png",
      })
    }
  }

  componentWillUnmount = () => {
    this.props.resetFilters()
  }

  // #OW-324
  renderSelection(x, onTogglePendingAllocation, pendingAllocation, index, onRemoveAssetFromAllocate) {
    // console.log(x.toJS());
    return (<PledgeSelectionContainer sideways={this.state.selectionSideway}
                       clicked={this.changeSideways}
                       chkTick={this.chkTick}
                       toggleL={this.state.toggleShowHideL}
                       toggleR={this.state.toggleShowHideR}
                       marginCall={x}
                       key={index}
                       onTogglePendingAllocation={onTogglePendingAllocation}
                       pendingAllocationStore={pendingAllocation}
                       onRemoveAssetFromAllocate={onRemoveAssetFromAllocate}/>)
  }

  //generic checker
  checkIfExist(something) { return something || List() }

  onPledgeButtonClick(e) { alert('Pledge Button Click') }

  sumOfIMVM(sumSelX, x) {
    return sumSelX + (x.getIn(['allocated', 'initialMargin'])
        ? (x.getIn(['allocated', 'initialMargin']).size
        + x.getIn(['allocated', 'variationMargin']).size)
        : 0 )
  }

  render() {
    // console.log("props: ", this.props);
    const { selection, onTogglePendingAllocation, pendingAllocation, onRemoveAssetFromAllocate } = this.props

    return (
      <div className={styles.pledgeContainer}>
        <div className={styles.sliderAndStatus}>
          <OptimisationWidget {...this.props}/>
          <div className={styles.panel} id={styles.pleStatus}> <img src="./images/pledge/Pledge-status-widget.png"/> </div>
        </div>

        <div className={styles.secDivider}/>

        <div className={styles.flexContainer}>

          {/*Render Selection Widgets*/}
          <div className={styles.col_L + ' ' + this.state.toggleColwidthL}>
            {this.checkIfExist(selection).map((x, index) => this.renderSelection(x,
                                                                                 onTogglePendingAllocation,
                                                                                 pendingAllocation,
                                                                                 index,
                                                                                 onRemoveAssetFromAllocate))}
          </div>

          {/*Render Collateral Widgets*/}
          <CollateralWidgetContainer
            toggleColwidthR={this.state.toggleColwidthR}
            sideways={this.state.sideways}
            open={this.state.open}
            changeSideways={this.changeSideways}/>

        </div>
      </div>
    )
  }
}

export default Pledge
