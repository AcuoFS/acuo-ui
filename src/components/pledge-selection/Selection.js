import React from 'react'
import { numberWithCommas } from '../../utils/numbersWithCommas'
import DeselectionPopup from './DeselectionPopup'
import { List, toJS } from 'immutable'
import styles from './Selection.css'

export default class Selection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openedDeselectionPopup: ""
    }

    this.togglePendingAllocation = this.togglePendingAllocation.bind(this)
    this.setDeselectionPopup = this.setDeselectionPopup.bind(this)
    this.clearDeselectionPopup = this.clearDeselectionPopup.bind(this)
    this.handlerChangeSideWaysClick = this.handlerChangeSideWaysClick.bind(this)
  }

  renderGroup(x, GUID) {
    return (
      <div className={styles.group} key={x.get('groupName')+GUID}>
        {this.checkIfExist(x.get('data')).map((y, index) => {
          return (
            <div className={styles.firstLevel} key={index}>
              <div className={styles.assetName}>
                {y.get('firstLevel')}
              </div>
              <div className={styles.amount}>
                {numberWithCommas(y.get('secondLevel').reduce((sum, z) => {
                  return sum + parseFloat(z.get('amount'))
                }, 0))}
              </div>
            </div>)
        })}
      </div>
    )
  }

  renderMargin(x, mgnType){
    const popupID = x.get('GUID') + mgnType + x.get('assetName')

    return (
      <tr key={x.get('assetName')}>
        <td>{x.get('assetName')}</td>
        <td>{numberWithCommas(x.get('valuePostHaircut'))}</td>
        <td>{x.get('CCY')}</td>
        <td>{x.get('haircut')}%</td>
        <td>{x.get('value')}</td>
        <td>{numberWithCommas(x.get('FX'))}</td>
        <td>{x.get('venue')}</td>
        <td>
          <div className={styles.earmarkAssetButton}
               data-ref={popupID}
               onClick={this.setDeselectionPopup}>
            <img src="./images/pledge/cancel.png"></img>
            <div className={styles.tooltip}>
              Move to Earmarked
            </div>
          </div>

        </td>
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

  calSubTotal(a, s){
    if(a.getIn(['allocated', s]))
      return (a.getIn(['allocated', s]).reduce((SumX , x)=>{return SumX + parseFloat(x.get('price'))},0))
    else
      return 0
  }
  calTotal(a, i, j){
    return this.calSubTotal(a, i) + this.calSubTotal(a, j)
  }

  setDeselectionPopup(e) {
    this.setState({
      openedDeselectionPopup: e.currentTarget.dataset.ref
    })
  }

  clearDeselectionPopup() {
    this.setState({
      openedDeselectionPopup: ""
    })
  }

  handlerChangeSideWaysClick(){
    const {clicked, toggleL} = this.props
    clicked()

    // Clear popup when selection panel is collapsed
    if(toggleL){
     this.clearDeselectionPopup()
    }
  }

  render() {
    const { marginCall, pendingAllocationStore } = this.props

    let evlEmptyForIntMargin = this.checkIfExist(marginCall.getIn(['allocated', 'initialMargin'])).isEmpty()
    let evlEmptyForVariMargin = this.checkIfExist(marginCall.getIn(['allocated', 'variationMargin'])).isEmpty()
    let evlEmptyForMargin = !this.checkIfExist(marginCall.getIn(['allocated', 'initialMargin'])).isEmpty() || !this.checkIfExist(marginCall.getIn(['allocated', 'variationMargin'])).isEmpty()

    return (
      <div className={styles.panel} key={marginCall.get('GUID')}>
        <DeselectionPopup propOpenedDeselectionPopup={this.state.openedDeselectionPopup}
                          propHandlerClearPopup={this.clearDeselectionPopup}/>

        <div className={styles.columnContainer}>
          <div className={styles.leftColumn + ' ' + (!this.props.toggleL ? styles.bigger : '')}>
            <div className={styles.titleHolder}>
              <img src={(this.checkIfExist(pendingAllocationStore).includes(marginCall.get('GUID')) ? "./images/pledge/checkboxwithtick.png" : "./images/pledge/checkbox.png")} className={styles.selTick} onClick={this.togglePendingAllocation} data-ref={marginCall.get('GUID')}/>
              <span className={styles.panelTitle}>{marginCall.get('GUID')}</span>
              <div className={styles.subtitle}>
                {marginCall.get('legalEntity')} - {marginCall.get('GUID')}
              </div>
            </div>
            <div className={styles.callTitle}>
              Calls Due
            </div>

            <div>

              {this.checkIfExist(marginCall.get('clientAssets')).map(x => this.renderGroup(x, marginCall.get('GUID')))}

            </div>

            <div className={styles.total}>
              <div className={styles.firstLevel}>
                <div className={styles.assetName}>
                  Total
                </div>
                <div className={styles.amount}>
                  {numberWithCommas(this.checkIfExist(marginCall.get('clientAssets')).reduce((sum, x) => {
                    return sum + x.get('data').reduce((sum, y) => {
                      return sum + y.get('secondLevel').reduce((sum, z) => {
                        return sum + parseFloat(z.get('amount'))
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
                <img src={this.props.sideways} onClick={this.handlerChangeSideWaysClick} alt=""/>
              </div>
            </div>

            <div className={styles.ttlMarginWrap + ' ' + (this.props.toggleR ? styles.showR : styles.hideR)}>
              <div className={styles.ttlMargin}>
                <div>Total Allocated</div>
                <div className={styles.bigFig + ' ' +styles.bold}>
                  {Math.round((marginCall.getIn(['allocated', 'marginTotal']) || 0)/10000)/100}
                </div>
                <div className={styles.bold}>Million</div>
              </div>
            </div>

            <div className={this.props.toggleL ? styles.showL : styles.hideL}>

              <div className={styles.rightColSubSection}>
                <div className={styles.subSectionHeader}>Initial Margin</div>
                <table className={styles.selTable + ( evlEmptyForIntMargin ? ' ' + styles.notAllocated : '')}>
                  <thead>
                    <tr className={styles.bold}>
                      <th></th>
                      <th>Value(post <br/>haircut)</th>
                      <th>CCY</th>
                      <th>Haircut</th>
                      <th>Value</th>
                      <th>FX</th>
                      <th>Venue</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  { evlEmptyForIntMargin ?
                      <tr>
                        <td colSpan="8" className={styles.notAlcText}>Collateral has not been allocated</td>
                      </tr> :
                      this.checkIfExist(marginCall.getIn(['allocated', 'initialMargin'])).map(
                        x => this.renderMargin(x,'initialMargin'))
                  }
                    <tr className={styles.bold}>
                      <td>Sub-Total</td>
                      <td>
                        {numberWithCommas((marginCall.getIn(['allocated', 'initialMarginTotal']) || 0).toFixed(2))}
                      </td>
                      <td>USD</td>
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
                <table className={styles.selTable + ( evlEmptyForVariMargin ? ' ' + styles.notAllocated : '')}>
                  <thead>
                    <tr className={styles.bold}>
                      <th></th>
                      <th>Value(post <br/>haircut)</th>
                      <th>CCY</th>
                      <th>Haircut</th>
                      <th>Value</th>
                      <th>FX</th>
                      <th>Venue</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                  { evlEmptyForVariMargin ?
                        <tr>
                          <td colSpan="8" className={styles.notAlcText}>Collateral has not been allocated</td>
                        </tr> :
                      this.checkIfExist(marginCall.getIn(['allocated', 'variationMargin'])).map(
                        x => this.renderMargin(x,'variationMargin'))
                  }


                  <tr className={styles.bold}>
                    <td>Sub-Total</td>
                    <td>
                      {numberWithCommas((marginCall.getIn(['allocated', 'variationMarginTotal']) || 0).toFixed(2))}
                    </td>
                    <td>USD</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
                <table className={styles.selTable}>
                  <tbody>
                    <tr className={styles.bold}>
                      <td>Total</td>
                      <td className={styles.totalTable1 + ( evlEmptyForMargin ? ' ' + styles.notAll : '' )}>{numberWithCommas((marginCall.getIn(['allocated', 'marginTotal']) || 0).toFixed(2))}</td>
                      <td className={styles.totalTable2 + ( evlEmptyForMargin ? ' ' + styles.notAll : '' )}>USD</td>
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
