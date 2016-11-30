import React from 'react'
import styles from './Selection.css'

export default class Selection extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            selTickState: 'None',
            selCheckbox: "./images/pledge/checkbox.png"
        }
    }

    render(){
    return(
      <div className={styles.panel}>

        <div className={styles.columnContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.titleHolder}>
                <img src={this.state.selCheckbox} className={styles.selTick} onClick={this.props.chkTick}/>
                <span className={styles.panelTitle}>Abc Securities FCM</span>
              <div className={styles.subtitle}>
                ACUO SG - ABC Securities FCM Global Fund
              </div>
            </div>
            <div className={styles.callTitle}>
              Calls Due
            </div>

            <div>
              <div className={styles.group}>

                <div className={styles.firstLevel}>
                  <div className={styles.assetName}>
                    Net Total IM Call
                  </div>
                  <div className={styles.amount}>
                    400,000
                  </div>
                </div>

                <div className={styles.firstLevel}>
                  <div className={styles.assetName}>
                    Net Total IM Call
                  </div>
                  <div className={styles.amount}>
                    400,000
                  </div>
                </div>

              </div>

              <div className={styles.group}>

                <div className={styles.firstLevel}>
                  <div className={styles.assetName}>
                    Net Total IM Call
                  </div>
                  <div className={styles.amount}>
                    400,000
                  </div>
                </div>

                <div className={styles.firstLevel}>
                  <div className={styles.assetName}>
                    Net Total IM Call
                  </div>
                  <div className={styles.amount}>
                    400,000
                  </div>
                </div>

              </div>
            </div>

            <div className={styles.total}>
              <div className={styles.firstLevel}>
                <div className={styles.assetName}>
                  Total
                </div>
                <div className={styles.amount}>
                  400,000
                </div>
              </div>
            </div>

          </div>
          <div className={styles.rightColumn}>
            <div className={styles.rightColHeading}>
              <div className={styles.rightColumnTitle + ' ' + (this.props.toggleL ? styles.showL : styles.hideL)}>
                Selection
              </div>
              <div className={styles.imageRight}>
                <img src={this.props.sideways} onClick={this.props.clicked} alt=""/>
              </div>
            </div>

            <div className={styles.ttlMarginWrap + ' ' + (this.props.toggleR ? styles.showR : styles.hideR)}>
              <div className={styles.ttlMargin}>
                <div>Total Margin</div>
                <div className={styles.bigFig + ' ' +styles.bold}>116.5</div>
                <div className={styles.bold}>Millions</div>
              </div>
            </div>

            <div className={this.props.toggleL ? styles.showL : styles.hideL}>

              <div className={styles.rightColSubSection}>
                <div className={styles.subSectionHeader}>Initial Margin</div>
                <table className={styles.selTable}>
                  <thead>
                    <tr className={styles.bold}>
                      <th></th>
                      <th>Price(Net <br/>of Haircut)</th>
                      <th>CCY</th>
                      <th>Haircut</th>
                      <th>Venue</th>
                      <th>Price</th>
                      <th>CCY</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Treasury Bill</td>
                      <td>10,000</td>
                      <td>USD</td>
                      <td>0.00%</td>
                      <td>SG</td>
                      <td>10,000</td>
                      <td>USD</td>
                      <td></td>
                    </tr>
                    <tr className={styles.bold}>
                      <td>Sub-Total</td>
                      <td>40,000</td>
                      <td></td>
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
                <table className={styles.selTable}>
                  <thead>
                  <tr className={styles.bold}>
                    <th></th>
                    <th>Price(Net <br/>of Haircut)</th>
                    <th>CCY</th>
                    <th>Haircut</th>
                    <th>Venue</th>
                    <th>Price</th>
                    <th>CCY</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Cash</td>
                    <td>10,000</td>
                    <td>USD</td>
                    <td>0.00%</td>
                    <td>SG</td>
                    <td>10,000</td>
                    <td>USD</td>
                    <td></td>
                  </tr>
                  <tr className={styles.bold}>
                    <td>Sub-Total</td>
                    <td>40,000</td>
                    <td></td>
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
