import React from 'react'
import OptItem from './sub-components/OptItem'
import ChooseCalls from '../pledge/sub-components/ChooseCalls'
import {List} from 'immutable'
import sharedStyles from '../pledge/Pledge.css'
import styles from './OptimisationWidget.css'


export default class OptimisationWidget extends React.Component {

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

  render() {
    const {
      optimisation, selection, onUpdateOptimisationSettings,
      pendingAllocation, sliderCheckbox, onToggleCheckall, onAllocate,
      onPledge
    } = this.props

    return <div className={sharedStyles.panel} id={styles.optSetting}>
      <div className={sharedStyles.panelTitle}>Optimization Setting <img src={'./images/pledge/locked.png'}/></div>
      <div>tab bar</div>
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
    </div>

  }
}