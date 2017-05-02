import React from 'react'
import OptItem from './sub-components/OptItem'
import ChooseCalls from '../pledge/sub-components/ChooseCalls'
import {List} from 'immutable'
import Constraints from './sub-components/Constraints'
import AnalysisWidget from './sub-components/Analysis'
import sharedStyles from '../pledge/Pledge.css'
import styles from './OptimisationWidget.css'


const TAB_OBJECTIVE = 'TAB_OBJECTIVE'
const TAB_CONSTRAINTS = 'TAB_CONSTRAINTS'
export const CONSTRAINTS_MIN = 0
export const CONSTRAINTS_MAX = 999
export const STATE_MAX_MOVEMENTS = 'maxMovements'
export const STATE_EXCLUDE_DAYS = 'excludeDays'


export default class OptimisationWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTab: TAB_OBJECTIVE,
      isAllocateButtonClicked: false, // TODO temp state just for static page before integration
      isFungible: false,
      [STATE_MAX_MOVEMENTS]: CONSTRAINTS_MAX,
      [STATE_EXCLUDE_DAYS]: CONSTRAINTS_MIN,
      isShow: false,
      activeRow: ' '
    }
    this.selectActiveRow = this.selectActiveRow.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  selectActiveRow(name) {
    this.setState({
        activeRow: name
      }
    );
  }

  contentClass(isShow) {
    if(isShow) {
      return (styles.show);
    }
    return (styles.invisible);
  }

  arrowClass(arrow) {
    if(arrow) {
      return (styles.down);
    }
    return (styles.up);
  }

  handleToggle() {
    this.setState(function(prevState) {
      return {
        isShow: !prevState.isShow,
        arrow: !prevState.arrow
      };
    });
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
      onPledge,
      scenarioAnalysis
    } = this.props

    return <div>
    <div className={sharedStyles.panel} id={styles.optSetting}>
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

        <div className={styles.objectiveParamsBar}>
          <div className={styles.objectiveParamCont}>
            <div className={styles.objectiveTitle}>Daily Cost (USD)</div>
            <div>{this.state.isAllocateButtonClicked ? '123,456,789' : '-'}</div>
          </div>
          <div className={styles.objectiveParamCont}>
            <div className={styles.objectiveTitle}>Monthly Cost (USD)</div>
            <div>{this.state.isAllocateButtonClicked ? '123,456,789' : '-'}</div>
          </div>
          <div className={styles.objectiveParamCont}>
            <div className={styles.objectiveTitle}>Reserved Liquidity Ratio (%)</div>
            <div>{this.state.isAllocateButtonClicked ? '1.00' : '-'}</div>
          </div>
        </div>

        <div className={styles.buttonHolder}>
          <ChooseCalls tickImg={sliderCheckbox[0]} tickState={sliderCheckbox[1]}
                       tickClick={onToggleCheckall}/>

          <div className={styles.optButton + ' ' +
          (this.checkIfExist(pendingAllocation).size > 0 ? '' : styles.btnDisabled )}
               onClick={() => {
                 onAllocate(pendingAllocation.toJS(), optimisation.toJS())
                 this.setState({isAllocateButtonClicked: true})
               }}>
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

      {/*TODO propMovementsFromOpt should be set to a value from the endpoint*/}
      {this.isConstraintsTab(this.state.currentTab) &&
      <Constraints propIsFungible={this.state.isFungible}
                   propHandlerToggleFungible={() =>
                     this.setState({isFungible: !this.state.isFungible})}
                   propGetStateProperty={(stateProperty) => this.state[stateProperty]}
                   propSetStatePropertyWithValue={(stateProperty, newValue) =>
                     this.setState({[stateProperty]: newValue})}
                   propIsAllocateClicked={this.state.isAllocateButtonClicked}
                   propMovementsFromOpt={this.state.isAllocateButtonClicked ? 76 : ''}/>}

    </div>
    <div className={styles.panel} id={styles.scenAnalysis}>
      <div className={styles.row + ' ' + styles.header}>
        <div className={styles.cell}>
          Apply
        </div>
        <div className={styles.cell}>
          Scenario Analysis
        </div>
        <div className={styles.cell}>
          Cost (USD)
        </div>
        <div className={styles.cell}>
          Cost Savings (USD)
        </div>
        <div className={styles.cell}>
          Reserved Liq. Ratio(%)
        </div>
        <div className={styles.cell}>
          <div className={styles.arrowContainer} onClick={this.handleToggle}>
            <div className={this.arrowClass(this.state.arrow)}>
              <div className={styles.switchArrow}>
                <div className={styles.arrowLine} id={styles.line1}></div>
                <div className={styles.arrowLine} id={styles.line2}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={this.contentClass(this.state.isShow)} id={styles.innerContent}>
        <form action="">
          {scenarioAnalysis
            .map((x,index) =>
            <AnalysisWidget
              key={index}
              name={x.name}
              cost={x.cost}
              savings={x.savings}
              ratio={x.ratio}
              isActive={x.name === this.state.activeRow}
              toggle={this.selectActiveRow}
            />)
          }
        </form>
      </div>
    </div>
  </div>

  }
}
