/**
 * Created by panyong on 4/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import styles from './actions.css'
import {connect} from 'react-redux'
import {List} from 'immutable'
import ActionLineItem from './actionlineitem-component'
import * as actionCreators from '../../../action_creators'


class Actions extends React.Component{
  constructor(props) {
    super(props)
    this.displayLineItems = this.displayLineItems.bind(this)
    if(!this.getRecon().isEmpty()){
      this.props.lineItemInsertion(this.getRecon())
    }
  }
  getRecon(){
    return this.props.recon || List()
  }
  numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
    return x;
  }
  renderAssetItem(asset){
    if(asset.get('clientAssets'))
      return asset.get('clientAssets').map((x) => {
        if(x.get('data'))
          return (<div key={x.get('groupName')}>{x.get('data').map((y) => {
            return <ActionLineItem
              topLevel={y.get('firstLevel')}
              key={y.get('firstLevel') + x.get('groupName')}
              totalAmount={y.get('secondLevel').reduce((amount, j)=> {
                return amount + j.get('amount')
              },0)}
            />
          })} <hr/></div>)
      })
  }
  renderCptyItem(asset){
    if(asset.get('counterpartyAssets'))
      return asset.get('counterpartyAssets').map((x) => {
        if(x.get('data'))
          return (<div key={x.get('groupName')}>{x.get('data').map((y) => {
            return <ActionLineItem
              topLevel={y.get('firstLevel')}
              key={y.get('firstLevel') + x.get('groupName')}
              totalAmount={y.get('secondLevel').reduce((amount, j)=> {
                return amount + j.get('amount')
              },0)}
            />
          })} <hr/></div>)
      })
  }
  displayTotalAssetMargin(i){
    //  console.log(i.toJS())
     if(i.get('clientAssets')) {
       return this.numberWithCommas((i.get('clientAssets').reduce((asset, x) => {
         return asset + x.get('data').reduce((data, y) => {
           return data + y.get('secondLevel').reduce((amount, z) => {
             return amount + z.get('amount')
           }, 0)
         }, 0)
       }, 0)/1000000).toFixed(2))
     }
  }
  displayTotalCptyMargin(i){
    //  console.log(i.toJS())
     if(i.get('counterpartyAssets')) {
       return this.numberWithCommas((i.get('clientAssets').reduce((asset, x) => {
         return asset + x.get('data').reduce((data, y) => {
           return data + y.get('secondLevel').reduce((amount, z) => {
             return amount + z.get('amount')
           }, 0)
         }, 0)
       }, 0)/1000000).toFixed(2))
     }
  }
  displayLineItems() {
    // console.log("display", this.getRecon().toJS())
    return( this.getRecon().map((x) => {
      return x.get('marginStatus').map((y) => {
        return y.get('timeFrames').map((z) => {
          return z.get('actionsList').map((i) => {
            return (
              <div className={styles.actionWrap}>
                <div className={styles.actPanel + ' ' + styles.act_L}>
                  <div className={styles.panel}>
                    <div className={styles.section+' '+styles.left}>
                      <div className={styles.legalEntityContainer}>
                        <div className={styles.legalEntity}>{i.get('legalEntity')}</div>
                        <div className={styles.legalEntityDetails}>
                          <div>{i.get('legalEntity')} - </div>
                          <div>{i.get('cptyOrg')}</div>
                          <div>Global Mutual Fund</div>
                        </div>
                      </div>

                      <div className={styles.package}> {/* table outer div*/}
                        {this.renderAssetItem(i)}
                      </div>

                      <div className={styles.sectionText}> {/* two row div for bold*/}
                        <div className={styles.sectionRow}> {/* one row div*/}
                          <div className={styles.packageLeft}>
                            <div>Total Amount Selected</div>
                          </div>
                          <div className={styles.packageRight}> 15,586,933</div>
                        </div>

                        <div className={styles.sectionRow}> {/* one row div*/}
                          <div className={styles.packageLeft}>
                            <div>Total Amount Selected</div>
                          </div>
                          <div className={styles.packageRight}> 15,586,933</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.section+' '+styles.right}>
                      <div className={styles.currency}>
                        <div>CCY:{i.get('ccy')}</div>
                        <div className={styles.viewFxRate}> View FX rate</div>
                      </div>
                      <div className={styles.viewFxRateImage}>

                      </div>
                      <div className={styles.totalMargin}>
                        <div className={styles.marginTitle}>Total Margin</div>
                        <div className={styles.marginValue}>{this.displayTotalAssetMargin(i)} </div>
                        <div className={styles.marginUnit}>Millions</div>
                      </div>
                      <div className={styles.tradeDetails}> View Trade Details</div>
                    </div>
                  </div>
                </div>

                <div className={styles.actPanel + ' ' + styles.act_C}>
                  {/*Action button goes here*/}
                  <div className={styles.btnWrap}>
                    <div className={styles.actFig}>95%</div>
                    <div className={styles.actBtn + ' ' + styles.actBtnOrange}>OK</div>
                  </div>
                </div>

                <div className={styles.actPanel + ' ' + styles.act_R}>
                  <div className={styles.panel}>
                    <div className={styles.section+' '+styles.left}>
                      <div className={styles.legalEntityContainer}>
                        <div className={styles.legalEntity}>{i.get('legalEntity')}</div>
                        <div className={styles.legalEntityDetails}>
                          <div>{i.get('legalEntity')} - </div>
                          <div>{i.get('cptyOrg')} </div>
                          <div>Global Mutual Fund</div>
                        </div>
                      </div>

                      <div className={styles.package}> {/* table outer div*/}
                        {this.renderCptyItem(i)}
                      </div>

                      <div className={styles.sectionText}> {/* two row div for bold*/}
                        <div className={styles.sectionRow}> {/* one row div*/}
                          <div className={styles.packageLeft}>
                            <div>Total Amount Selected</div>
                          </div>
                          <div className={styles.packageRight}> 15,586,933</div>
                        </div>

                        <div className={styles.sectionRow}> {/* one row div*/}
                          <div className={styles.packageLeft}>
                            <div>Total Amount Selected</div>
                          </div>
                          <div className={styles.packageRight}> 15,586,933</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.section+' '+styles.right}>
                      <div className={styles.currency}>
                        <div>CCY:USD</div>
                        <div className={styles.ViewFxRate}> View FX rate</div>
                      </div>
                      <div className={styles.totalMargin}>
                        <div className={styles.marginTitle}>Total Margin</div>
                        <div className={styles.marginValue}>{this.displayTotalCptyMargin(i)}</div>
                        <div className={styles.marginUnit}>Millions</div>
                      </div>
                      <div className={styles.tradeDetails}> View Trade Details</div>
                    </div>
                    {/*Right panel content goes here*/}
                  </div>
                </div>
              </div>)
            })
          })
        })
      }))
    }

    render(){
      return(
        <div className={styles.actionContainer}>
          {this.displayLineItems()}
        </div>
      )
    }
  }

  function mapStateToProps(state){
    //console.log('map state to props', state.getIn(['display', 'derivatives']))
    return{
      recon : state.getIn(['display', 'derivatives'])
    }
  }
  export const ActionsFilter = connect(mapStateToProps, actionCreators)(Actions)
