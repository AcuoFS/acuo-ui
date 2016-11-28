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
      // sidewaysMin :"./../../../images/pledge/sideways-min.png",
      sideways: "./../../../images/pledge/sideways-max.png"
    }
    this.handlePlusMinus = this.handlePlusMinus.bind(this);
    this.changeSideways = this.changeSideways.bind(this)
  }

  changeSideways() {
    if (this.state.open) {
      this.setState({
        open: false,
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


  render() {
    return (
      <div className={styles.pledgeContainer}>
        <div className={styles.sliderAndStatus}>
          <div className={styles.panel} id={styles.optSetting}>
            <div className={styles.panelTitle}>Optimization Setting</div>
            <div className={styles.optPnlWrap}>
              <OptItem sldName="Operations" allocation="72"/>
              <OptItem sldName="Liquidity" allocation="36"/>
              <OptItem sldName="Cost" allocation="18"/>
              <OptItem sldName="Haircut" allocation="44"/>
            </div>
            <div className={styles.buttonHolder}>
              <ChooseCalls />
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

            <Selection/>
          </div>

          <div className={styles.col_R + ' ' + this.state.toggleColwidthR}>
            <div className={styles.panel}>
              <div className={styles.panelTitle}>Collateral
                <img src={this.state.sideways} className={styles.imageRight } onClick={this.changeSideways}/>
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
                <div className={this.state.class}>

                  <div className={styles.tableRow}>
                    <div>Cash</div>
                    <div>12,000</div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  <div>
                    <div>Japan (2 Years Issue)</div>
                  </div>

                </div>
              </div>

              <div>
                <div className={styles.collateral_Header}>Cash
                  <p className={styles.centerThis } onClick={this.handlePlusMinus} >
                    <img src={this.state.dropdown} alt=""/>
                  </p>
                </div>
                <div className={this.state.class}>
                  <div>Cash</div>
                  <div>Cash</div>
                </div>
              </div>
              <div>
                <div className={styles.collateral_Header}>MM Instruments
                  <p className={styles.centerThis} onClick={this.handlePlusMinus} >
                    <img src={this.state.dropdown} alt=""/>
                  </p>
                </div>
                <div className={this.state.class}>
                  <div>Treasury Bill</div>
                  <div>Singapore T-Bills</div>
                  <div>Japan (2 Years Issue)</div>
                </div>
              </div>

              <div>
                <div className={styles.collateral_Header}>Soverign Bonds
                  <p className={styles.centerThis} onClick={this.handlePlusMinus}>
                    <img src={this.state.dropdown} alt=""/>
                  </p>
                </div>
                <div className={this.state.class}>
                </div>
              </div>

              <div>
                <div className={styles.collateral_Header}>Govt Agencies
                  <p className={styles.centerThis} onClick={this.handlePlusMinus}>
                    <img src={this.state.dropdown} alt=""/>
                  </p>
                </div>
                <div className={this.state.class}>
                </div>
              </div>
              <div>
                <div className={styles.collateral_Header}>Corporate Debt
                  <p className={styles.centerThis} onClick={this.handlePlusMinus}>
                    <img src={this.state.dropdown} alt=""/>
                  </p>
                </div>
                <div className={this.state.class}>
                </div>
              </div>

              <div>
                <div className={styles.collateral_Header}>Corporate Equity
                  <p className={styles.centerThis} onClick={this.handlePlusMinus}>
                    <img src={this.state.dropdown} alt=""/>
                  </p>
                </div>
                <div className={this.state.class}>
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