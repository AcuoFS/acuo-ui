import React from 'react'
import styles from '../Pledge.css'

export default class Collateral extends React.Component {

  constructor(props){

  }

  render() {
    return (
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

          <CollateralAssetGroup propCollateralType={"JJ_Earmarked"}
                                propHandlePlusMinus={this.handlePlusMinus}
                                propDropDownImgUrl={this.state.dropdown}
                                propStyleClass={this.state.class}
          />

          <div>
            <div className={styles.collateral_Header }>Earmarked
              <p className={styles.centerThis} onClick={this.handlePlusMinus}>
                <img src={this.state.dropdown} alt=""/>
              </p>
            </div>
            {/*<div className={this.state.class}>*/}
            <div className={styles.tableRow}>
              <div> {this.renderEarmarkedItems()}</div>
            </div>
            {/*</div>*/}
          </div>
        </div>
      </div>

    )
  }
}