/**
 * Created by panyong on 22/11/16.
 */
import React from 'react'
import {render} from 'react-dom'
import styles from './Pledge.css'
import OptItem from './sub-components/OptItem'
import ChooseCalls from './sub-components/ChooseCalls'
import Selection from '../pledge-selection/Selection'

class Pledge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      class: styles.sectionOpen,
      dropdown: "./../../../images/pledge/minusbox.png",
      toggleColwidthL: styles.minDivL, 
      toggleColwidthR: styles.expandDivR,
      toggleHideCol: styles.showCol,
      toggleShowHideL : styles.hideL, 
      toggleShowHideR : styles.showR,
      sideways: "./../../../images/pledge/sideways-max.png",
      chsCallsTickState: 'None',
      checkbox: "./images/pledge/checkbox.png",
      selTickBox: 'none'
    }
    this.handlePlusMinus = this.handlePlusMinus.bind(this)
    this.changeSideways = this.changeSideways.bind(this)
    this.changeTickState = this.changeTickState.bind(this)
    this.chkTick = this.chkTick.bind(this)
    // this.renderCollateralItems = this.renderCollateralItems.bind(this)

    fetch('http://52.74.186.112:8081/optimisation').then(response => {
      return response.json()
    }).then(obj => {
      this.props.onInitOptimisationSettings(obj)
    })
  }

  changeSideways() {
    if (this.state.open) {
      this.setState({
        open: false,
        toggleShowHideL : styles.showL,
        toggleShowHideR : styles.hideR,
        toggleColwidthL: styles.expandDivL,
        toggleColwidthR: styles.minDivR,
        toggleHideCol: styles.hideCol,
        sideways: "./../../../images/pledge/sideways-max.png"
      })
    } else {
      this.setState({
        open: true,
        toggleColwidthL: styles.minDivL,
        toggleColwidthR: styles.expandDivR,
        toggleHideCol: styles.showCol,
        toggleShowHideL : styles.hideL,
        toggleShowHideR : styles.showR,
        sideways: "./../../../images/pledge/sideways-min.png"
      })
    }
  }

  handlePlusMinus() {
    if (this.state.open) {
      this.setState({
        open: false,
        class: styles.sectionClose,
        dropdown: "./../../../images/pledge/plusbox.png"
      })
    } else {
      this.setState({
        open: true,
        class: styles.sectionOpen,
        dropdown: "./../../../images/pledge/minusbox.png"
      })
    }
  }

  renderCollateralItems(collateralItem) {
    let collaterals = this.props.collateral

    if (collaterals) {
      let x = collaterals.get(collateralItem)
      return this.renderItems(x)
    }
  }

  renderItems(value) {
    return value.map((x) => {
      return (
        <div className={this.state.class}>
          <div>{x.get('assetName')}</div>
          <div>{x.get('price')}</div>
          <div>{x.get('ccy')}</div>
          <div>{x.get('deliveryTime')}</div>
          <div>{x.get('status')}</div>
          <div>{x.get('rating')}</div>
          <div>{x.get('maturityDate')}</div>
          <div>{x.get('internalCostPct')}</div>
          <div>{x.get('externalCostPct')}</div>
          <div>{x.get('OppCostPct')}</div>
          <div>{x.get('isin')}</div>
          <div>{x.get('venue')}</div>
          <div>{x.get('acctId')}</div>
        </div>
      )
    })
  }

  changeTickState() {
    if (this.state.chsCallsTickState === 'None') {
      // when state is 'None'
      this.setState({
        chsCallsTickState: 'All',
        checkbox: "./images/pledge/checkboxwithtick.png"
      })
    } else if (this.state.chsCallsTickState === 'All') {
      // when state is 'All'
      this.setState({
        chsCallsTickState: 'Selected',
        checkbox: "./images/pledge/checkbox.png"
      })
    } else {
      // when state is 'Selected'
      this.setState({
        chsCallsTickState: 'None',
        checkbox: "./images/pledge/checkbox.png"
      })
    }
  }

  chkTick() {
    if (this.state.selTickBox === 'none') {
      this.setState({
        selTickBox: 'ticked'
      })
    } else {
      this.setState({
        selTickBox: 'none'
      })
    }
  }

  renderOptItems(optimisation){
    // if(optimisation)
    //   optimisation.map(x => {
    //     return (<OptItem sldName={x.name} allocation={x.rating}/>)
    //   })
  }

  render() {
    const { optimisation } = this.props
    return (
        <div className={styles.pledgeContainer}>
          <div className={styles.sliderAndStatus}>
            <div className={styles.panel} id={styles.optSetting}>
              <div className={styles.panelTitle}>Optimization Setting</div>
              <div className={styles.optPnlWrap}>
                {this.renderOptItems(optimisation)}
              </div>
              <div className={styles.buttonHolder}>
                <ChooseCalls tickImg={this.state.checkbox} tickState={this.state.chsCallsTickState}
                             tickClick={this.changeTickState}/>
                <div className={styles.optButton} id={styles.optBtnAllocate}>Allocate</div>
                <div className={styles.optButton + ' ' + styles.btnEnabled} id={styles.optBtnPledge}>Pledge</div>
              </div>
              {/* change btnEnabled to btnDisabled to disable the button*/}
            </div>

            <div className={styles.panel} id={styles.pleStatus}>
              {/*<div className={styles.panelTitle}>Pledge Status</div>*/}
              <img src="./../../../images/pledge/Pledge-status-widget.png"/>
            </div>
          </div>

          <div className={styles.secDivider}></div>

          <div className={styles.flexContainer}>
            <div className={styles.col_L + ' ' + this.state.toggleColwidthL}>

              <Selection sideways={this.state.sideways}
                         clicked={this.changeSideways}
                         chkTick={this.chkTick}
                         toggleL={this.state.toggleShowHideL} 
                         toggleR={this.state.toggleShowHideR}
              />
            </div>

            <div className={styles.col_R + ' ' + this.state.toggleColwidthR}>
              <div className={styles.panel}>
                <div className={styles.panelTitle}>Collateral
                  <img src={this.state.sideways} className={styles.imageRight} onClick={this.changeSideways}/>
                </div>
                <div className={styles.collateral_LabelBar}>
                  <div>Asset</div>
                  <div>Price</div>
                  <div>CCY</div>
                  <div>Delivery Time</div>
                  <div>Status</div>
                  <div>Rating</div>
                  <div>Maturity Date</div>
                  <div>Internal Cost</div>
                  <div>External Cost</div>
                  <div>Opp. Cost</div>
                  <div>ISIN</div>
                  <div>Venue</div>
                  <div>Acc ID</div>
                </div>

                <div>
                  <div className={styles.collateral_Header }>Earmarked
                    <p className={styles.centerThis} onClick={this.handlePlusMinus}>
                      <img src={this.state.dropdown} alt=""/>
                    </p>
                  </div>
                  {/*<div className={this.state.class}>*/}
                    <div className={styles.tableRow}>
                      <div> {this.renderCollateralItems('earmarked')}</div>
                    </div>
                  {/*</div>*/}
                </div>

                <div>
                  <div className={styles.collateral_Header}>Cash
                    <p className={styles.centerThis } onClick={this.handlePlusMinus}>
                      <img src={this.state.dropdown} alt=""/>
                    </p>
                  </div>
                  <div className={this.state.class}>
                    <div> {this.renderCollateralItems('cash')}</div>
                  </div>
                </div>
                <div>
                  <div className={styles.collateral_Header}>MM Instruments
                    <p className={styles.centerThis} onClick={this.handlePlusMinus}>
                      <img src={this.state.dropdown} alt=""/>
                    </p>
                  </div>
                  <div className={this.state.class}>
                    <div> {this.renderCollateralItems('mmInstruments')}</div>
                  </div>
                </div>

                <div>
                  <div className={styles.collateral_Header}>Soverign Bonds
                    <p className={styles.centerThis} onClick={this.handlePlusMinus}>
                      <img src={this.state.dropdown} alt=""/>
                    </p>
                  </div>
                  <div className={this.state.class}>
                    {this.renderCollateralItems('sovereignBonds')}
                  </div>
                </div>

                <div>
                  <div className={styles.collateral_Header}>Govt Agencies
                    <p className={styles.centerThis} onClick={this.handlePlusMinus}>
                      <img src={this.state.dropdown} alt=""/>
                    </p>
                  </div>
                  <div className={this.state.class}>
                    {this.renderCollateralItems('govtAgencies')}
                  </div>
                </div>
                <div>
                  <div className={styles.collateral_Header}>Corporate Debt
                    <p className={styles.centerThis} onClick={this.handlePlusMinus}>
                      <img src={this.state.dropdown} alt=""/>
                    </p>
                  </div>
                  <div className={this.state.class}>
                    {this.renderCollateralItems('corporateDebt')}
                  </div>
                </div>

                <div>
                  <div className={styles.collateral_Header}>Corporate Equity
                    <p className={styles.centerThis} onClick={this.handlePlusMinus}>
                      <img src={this.state.dropdown} alt=""/>
                    </p>
                  </div>
                  <div className={this.state.class}>
                    {this.renderCollateralItems('corporateEquity')}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

    )
  }
}

export default Pledge