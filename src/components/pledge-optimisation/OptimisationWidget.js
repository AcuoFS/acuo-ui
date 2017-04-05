import React from 'react'
import OptItem from './sub-components/OptItem'
import ChooseCalls from '../pledge/sub-components/ChooseCalls'
import {List} from 'immutable'
import sharedStyles from '../pledge/Pledge.css'
import styles from './OptimisationWidget.css'


const TAB_OBJECTIVE = 'TAB_OBJECTIVE'
const TAB_CONSTRAINTS = 'TAB_CONSTRAINTS'

export default class OptimisationWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTab: TAB_OBJECTIVE
    }
  }

  //generic checker
  checkIfExist(something) {
    return something || List()
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

  isObjectiveTab(curTab) {
    return TAB_OBJECTIVE === curTab
  }

  isConstraintsTab(curTab) {
    return TAB_CONSTRAINTS === curTab
  }

  render() {
    const {
      optimisation, selection, onUpdateOptimisationSettings,
      pendingAllocation, sliderCheckbox, onToggleCheckall, onAllocate,
      onPledge
    } = this.props

    return <div className={sharedStyles.panel} id={styles.optSetting}>
      <div className={sharedStyles.panelTitle}>Optimization Setting <img src={'./images/pledge/locked.png'}/></div>
      <div className={styles.tabHolder}>
        <div className={styles.tab + ' ' + (this.isObjectiveTab(this.state.currentTab) && styles.selectedTab)}
             onClick={() => this.setState({currentTab: TAB_OBJECTIVE})}>
          Objective
        </div>
        <div className={styles.tab + ' ' + (this.isConstraintsTab(this.state.currentTab) && styles.selectedTab)}
             onClick={() => this.setState({currentTab: TAB_CONSTRAINTS})}>
          Constraints
        </div>
      </div>
      {this.isObjectiveTab(this.state.currentTab) &&
      <div>
        <div className={styles.optPnlWrap}>
          {optimisation && optimisation.map((x, index) => (
            <OptItem sldName={x.get('name')}
                     allocation={x.get('rating')}
                     onUpdate={onUpdateOptimisationSettings}
                     key={index}/>
          ))}
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
      </div>}

      {this.isConstraintsTab(this.state.currentTab) &&
      <div>constraints</div>}

    </div>

  }
}