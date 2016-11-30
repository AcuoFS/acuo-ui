import React from 'react'
import styles from './Selection.css'
import { numberWithCommas } from '../../utils/numbersWithCommas'

import { List } from 'immutable'

export default class Selection extends React.Component {
  constructor(props) {
    super(props)

    this.togglePendingAllocation = this.togglePendingAllocation.bind(this)
  }

  renderGroup(x, GUID) {
    return (
      <div className={styles.group} key={x.get('groupName')+GUID}>
        {this.checkIfExist(x.get('data')).map(y => {
          return (
            <div className={styles.firstLevel} key={y.get('assetName')}>
              <div className={styles.assetName}>
                {y.get('firstLevel')}
              </div>
              <div className={styles.amount}>
                {numberWithCommas(y.get('secondLevel').reduce((sum, z) => {
                  return sum + z.get('amount')
                }, 0))}
              </div>
            </div>)
        })}
      </div>
    )
  }

  renderMargin(x){
    return (
      <tr key={x.get('assetName')}>
        <td>{x.get('assetName')}</td>
        <td>{numberWithCommas(x.get('priceNetHaircut'))}</td>
        <td>{x.get('priceNetHaircutCcy')}</td>
        <td>{x.get('haircutPct')}%</td>
        <td>{x.get('venue')}</td>
        <td>{numberWithCommas(x.get('price'))}</td>
        <td>{x.get('priceCcy')}</td>
        <td></td>
      </tr>
    )
  }

  togglePendingAllocation(e){
    this.props.onTogglePendingAllocation(e.currentTarget.dataset.ref)
  }

  //generic checker
  checkIfExist(something){
    return something || List()
  }

  render() {
    const { marginCall, pendingAllocationStore } = this.props

    return (
      <div className={styles.panel} key={marginCall.get('GUID')}>

        <div className={styles.columnContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.titleHolder}>
              <img src={(this.checkIfExist(pendingAllocationStore).includes(marginCall.get('GUID').toString()) ? "./images/pledge/checkboxwithtick.png" : "./images/pledge/checkbox.png")} className={styles.selTick} onClick={this.togglePendingAllocation} data-ref={marginCall.get('GUID')}/>
              <span className={styles.panelTitle}>{marginCall.get('marginCallName')}</span>
              <div className={styles.subtitle}>
                {marginCall.get('legalEntity')} - {marginCall.get('marginCallName')}
              </div>
            </div>
            <div className={styles.callTitle}>
              Calls Due
            </div>

            <div>

              {this.checkIfExist(marginCall.get('ClientAssets')).map(x => this.renderGroup(x, marginCall.get('GUID')))}

            </div>

            <div className={styles.total}>
              <div className={styles.firstLevel}>
                <div className={styles.assetName}>
                  Total
                </div>
                <div className={styles.amount}>
                  {numberWithCommas(this.checkIfExist(marginCall.get('ClientAssets')).reduce((sum, x) => {
                    return sum + x.get('data').reduce((sum, y) => {
                      return sum + y.get('secondLevel').reduce((sum, z) => {
                        return sum + z.get('amount')
                        }, 0)
                    }, 0)
                  }, 0))}
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
                <div className={styles.bigFig + ' ' +styles.bold}>{numberWithCommas((this.checkIfExist(marginCall.get('ClientAssets')).reduce((sum, x) => {
                  return sum + x.get('data').reduce((sum, y) => {
                      return sum + y.get('secondLevel').reduce((sum, z) => {
                          return sum + z.get('amount')
                        }, 0)
                    }, 0)
                }, 0) / 1000000).toFixed(1))}</div>
                <div className={styles.bold}>Million</div>
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
                    {this.checkIfExist(marginCall.getIn(['allocated', 'initialMargin'])).map(x => this.renderMargin(x))}
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
                  {this.checkIfExist(marginCall.getIn(['allocated', 'variationMargin'])).map(x => this.renderMargin(x))}
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
