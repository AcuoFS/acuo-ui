/**
* Created by panyong on 4/11/16.
*/
import React from 'react'
import { render } from 'react-dom'
import {List} from 'immutable'
import MarginAgreementDetail from './MarginAgreementDetail'
import styles from './MarginAgreementList.css'


export default class MarginAgreementList extends React.Component{
  constructor(props) {
    super(props)
    this.displayLineItems = this.displayLineItems.bind(this)
    if(!this.getRecon().isEmpty()){
      this.props.onLineItemInsertion(this.getRecon())
    }
    // this.getCurrencyInfo = this.getCurrencyInfo.bind(this)
    this.getTotalAmount = this.getTotalAmount.bind(this)
    this.getPercentage = this.getPercentage.bind(this)
    this.getBtnColour = this.getBtnColour.bind(this)
    this.reconData = this.reconData.bind(this)
    this.onSelectedItem = this.onSelectedItem.bind(this)
  }
  getRecon(){
    return this.props.recon || List()
  }
  onSelectedItem(guid, assetName){
    this.props.onSelectedItem(guid, assetName)
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
        return <MarginAgreementDetail
          GUID={asset.get('GUID')}
          topLevel={y.get('firstLevel')}
          key={y.get('firstLevel') + x.get('groupName')}
          totalAmount={y.get('secondLevel').reduce((amount, j)=> {
            return amount + j.get('amount')
          },0)}
          secondLevel={y.get('secondLevel')}
          handlerSelectedItem={this.onSelectedItem}
          />
      })} <hr/></div>)
    })
  }
  renderCptyItem(asset){
    if(asset.get('counterpartyAssets'))
    return asset.get('counterpartyAssets').map((x) => {
      if(x.get('data'))
      return (<div key={x.get('groupName')}>{x.get('data').map((y) => {
        return <MarginAgreementDetail
          GUID={asset.get('GUID')}
          topLevel={y.get('firstLevel')}
          key={y.get('firstLevel') + x.get('groupName')}
          totalAmount={y.get('secondLevel').reduce((amount, j)=> {
            return amount + j.get('amount')
          },0)}
          secondLevel={y.get('secondLevel')}
          handlerSelectedItem={this.onSelectedItem}
          id={asset.get('GUID')}
          />
      })} <hr/></div>)
    })
  }
  displayTotalAssetMargin(i){
    //  console.log(i.toJS())
    if(i.get('clientAssets')) {
      return i.get('clientAssets').reduce((asset, x) => {
        return asset + x.get('data').reduce((data, y) => {
          return data + y.get('secondLevel').reduce((amount, z) => {
            return amount + z.get('amount')
          }, 0)
        }, 0)
      }, 0)
    }
  }
  displayTotalCptyMargin(i){
    //  console.log(i.toJS())
    if(i.get('counterpartyAssets')) {
      return i.get('counterpartyAssets').reduce((asset, x) => {
        return asset + x.get('data').reduce((data, y) => {
          return data + y.get('secondLevel').reduce((amount, z) => {
            return amount + z.get('amount')
          }, 0)
        }, 0)
      }, 0)
    }
  }
  getCurrencyInfo(ccy, baseCCY){
    if(ccy)
      return ccy.map((x)=> {
        return(
          <div key={Math.random()}>{x.get('ccy') + '/' + baseCCY + "=" + x.get('exchangeRate')}</div>
        )
      })
    else
      return
  }

  getTotalAmount(asset){
    if(asset){
      return asset.reduce((sum, x) => {
        return sum + x.get('data').reduce((sum, y) => {
          return sum + y.get('secondLevel').reduce((sum, z) => {
              return sum + (z.get('checked')? z.get('amount') : 0)
            }, 0)
          }, 0)
      }, 0)
    }else{
      return 0
    }
  }

  getTotalReconAmount(asset){
    if(asset){
      return asset.reduce((sum, x) => {
        return sum + x.get('data').reduce((sum, y) => {
          return sum + y.get('secondLevel').reduce((sum,z) => {
            return sum + (z.get('recon')? z.get('amount'): 0)
          }, 0)
        }, 0)
      }, 0)
    }else{
      return 0
    }
  }

  getPercentage(actionItem){
    if(actionItem.get('clientAssets') && actionItem.get('counterpartyAssets')){
      if(this.getTotalReconAmount(actionItem.get('clientAssets'))){
        // console.log(actionItem.get('clientAssets').toJS())
        // console.log(this.displayTotalAssetMargin(actionItem) * 1000000)
        // console.log(this.getTotalReconAmount(actionItem.get('clientAssets')))

        return ((this.displayTotalAssetMargin(actionItem) - (this.getTotalReconAmount(actionItem.get('clientAssets')))) / (this.displayTotalCptyMargin(actionItem) - (this.getTotalReconAmount(actionItem.get('counterpartyAssets')))) * 100).toFixed(0)
      }
      else if(this.getTotalAmount(actionItem.get('clientAssets'))) {
        return (this.getTotalAmount(actionItem.get('clientAssets')) / this.getTotalAmount(actionItem.get('counterpartyAssets')) * 100).toFixed(0)
      }
      else{
        return (this.displayTotalAssetMargin(actionItem) / this.displayTotalCptyMargin(actionItem) * 100).toFixed(0)
      }
    }else{
      return 0.00
    }
  }

  getBtnColour(percentage){
    switch(true){
      case (percentage < 90.00 || percentage > 110):
        return styles.actBtnRed
      case (percentage < 95.00 || percentage > 105):
        return styles.actBtnOrange
      default:
        return styles.actBtnGreen
    }
  }

  getTextColour(percentage){
    switch(true){
      case (percentage < 90.00 || percentage > 110):
        return styles.actTextRed
      case (percentage < 95.00 || percentage > 105):
        return styles.actTextOrange
      default:
        return styles.actTextGreen
    }
  }
  reconData(){
    this.props.onReconItem()
  }
  displayLineItems() {

    console.log("displayLineItems:" + this.getRecon().toJSON())


    return( this.getRecon().map((x) => {
      return x.get('marginStatus').map((y) => {
        //console.log("y:" + y)
        return y.get('timeFrames').map((z) => {
          //console.log("z:" + z)
          return z.get('actionsList').map((i) => {
            //console.log("i:" + i)
            return (
              <div className={styles.actionWrap}>
                <div className={styles.actPanel + ' ' + styles.act_L}>
                  <div className={styles.panel}>
                    <div className={styles.section+' '+styles.left}>
                      <div className={styles.legalEntityContainer}>
                        <div className={styles.legalEntity}>{i.get('legalEntity')}</div>
                        <div className={styles.legalEntityDetails}>
                          <div>{i.get('legalEntity')} - </div>
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
                          <div className={styles.packageRight}>{this.numberWithCommas(this.getTotalAmount(i.get('clientAssets')))}</div>
                        </div>
                        <div className={styles.sectionRow}> {/* one row div*/}
                          <div className={styles.packageLeft}>
                            <div>Total Reconciled</div>
                          </div>
                          <div className={styles.packageRight}>{this.numberWithCommas(this.getTotalReconAmount(i.get('clientAssets')))}</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.section+' '+styles.right}>
                      <div className={styles.currency}>
                        <div>CCY:{i.get('ccy')}</div>
                        <div className={styles.viewFxRate}> View FX rate
                          <div className={styles.viewFxRateImage}>
                            <div>
                              {this.getCurrencyInfo(i.get('currencyInfo'), i.get('ccy'))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.totalMargin}>
                        <div className={styles.marginTitle}>Total Margin</div>
                        <div className={styles.marginValue}>{((this.displayTotalAssetMargin(i) - this.getTotalReconAmount(i.get('clientAssets')))/1000000).toFixed(2)} </div>
                        <div className={styles.marginUnit}>Millions</div>
                      </div>
                      <div className={styles.tradeDetails}> View Trade Details</div>
                    </div>
                  </div>
                </div>

                <div className={styles.actPanel + ' ' + styles.act_C}>
                  {/*Action button goes here*/}
                  <div className={styles.btnWrap}>
                    <div className={styles.actFig + ' ' + this.getTextColour(this.getPercentage(i))}>{this.getPercentage(i)}%</div>
                    <div className={styles.actBtn + ' ' + this.getBtnColour(this.getPercentage(i))} onClick={this.reconData}>OK</div>
                  </div>
                </div>

                <div className={styles.actPanel + ' ' + styles.act_R}>
                  <div className={styles.panel}>
                    <div className={styles.section+' '+styles.left}>
                      <div className={styles.legalEntityContainer}>
                        <div className={styles.legalEntity}>{i.get('cptyOrg')}</div>
                        <div className={styles.legalEntityDetails}>
                          <div>{i.get('cptyOrg')} - </div>
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
                          <div className={styles.packageRight}>{this.numberWithCommas(this.getTotalAmount(i.get('counterpartyAssets')))}</div>
                        </div>

                        <div className={styles.sectionRow}> {/* one row div*/}
                          <div className={styles.packageLeft}>
                            <div>Total Reconciled</div>
                          </div>
                          <div className={styles.packageRight}>{this.numberWithCommas(this.getTotalReconAmount(i.get('counterpartyAssets')))}</div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.section+' '+styles.right}>
                      <div className={styles.currency}>
                        <div>CCY:{i.get('ccy')}</div>
                        <div className={styles.viewFxRate}> View FX rate

                          <div className={styles.viewFxRateImage}>
                            <div>
                              {this.getCurrencyInfo(i.get('currencyInfo'), i.get('ccy'))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.totalMargin}>
                        <div className={styles.marginTitle}>Total Margin</div>
                        <div className={styles.marginValue}>{((this.displayTotalCptyMargin(i) - this.getTotalReconAmount(i.get('counterpartyAssets')))/1000000).toFixed(2)}</div>
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