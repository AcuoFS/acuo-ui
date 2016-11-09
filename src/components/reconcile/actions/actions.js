/**
 * Created by panyong on 4/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import styles from './actions.css'
import {connect} from 'react-redux'
import {List} from 'immutable'
import ActionLineItem from './actionlineitem-component'


class Actions extends React.Component{
    constructor(props) {
        super(props)
        this.getLegalEntity = this.getLegalEntity.bind(this)
        this.getDerivative = this.getDerivative.bind(this)
        this.getActionList = this.getActionList.bind(this)
    }
  getDerivative(){
    return this.props.derivatives|| List()
  }

  getActionList() {
    return this.getDerivative().map((x) => {
      return x.get('marginStatus').map((y) => {
        return y.get('timeFrames').map((z) => {
          return z.get('actionsList')
        })
      })
    })
  }
  getLegalEntity() {
    return( this.getDerivative().map((x) => {
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
                                  <div> {/* 2 row div */}
                                      <ActionLineItem />
                                      <ActionLineItem />
                                  </div>
                                  <hr/>
                                  <div> {/* 4 row div */}
                                      <ActionLineItem />
                                      <ActionLineItem />
                                      <ActionLineItem />
                                      <ActionLineItem />
                                  </div>
                                  <hr/>
                                  <div> {/* 2 row div */}
                                      <ActionLineItem />
                                      <ActionLineItem />
                                  </div>
                                  <hr/>
                              </div>
                              <div className={styles.sectionText}> {/* two row div for bold*/}
                                  <div className={styles.packageRow}> {/* one row div*/}
                                      <div className={styles.packageLeft}>
                                          <div>Total Amount Selected</div>
                                      </div>
                                      <div className={styles.packageRight}> 15,586,933</div>
                                  </div>

                                  <div className={styles.packageRow}> {/* one row div*/}
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
                                  <div className={styles.viewFxRate}> View FX rate</div>
                              </div>
                              <div className={styles.totalMargin}>
                                  <div className={styles.marginTitle}>Total Margin</div>
                                  <div className={styles.marginValue}>116.5</div>
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
                                  <div className={styles.legalEntity}>ACUO SG</div>
                                  <div className={styles.legalEntityDetails}>
                                      <div>ACUO SG - </div>
                                      <div>Counterparty A </div>
                                      <div>Global Mutual Fund</div>
                                  </div>
                              </div>
                              <div className={styles.package}> {/* table outer div*/}
                                  <div > {/* 2 row div */}
                                      <ActionLineItem />
                                      <ActionLineItem />
                                  </div>
                                  <hr/>
                                  <div> {/* 4 row div */}
                                      <ActionLineItem />
                                      <ActionLineItem />
                                      <ActionLineItem />
                                      <ActionLineItem />
                                  </div>
                                  <hr/>
                                  <div> {/* 2 row div */}
                                      <ActionLineItem />
                                      <ActionLineItem />
                                  </div>
                                  <hr/>
                              </div>

                              <div className={styles.sectionText}> {/* two row div for bold*/}
                                  <div className={styles.packageRow}> {/* one row div*/}
                                      <div className={styles.packageLeft}>
                                          <div>Total Amount Selected</div>
                                      </div>
                                      <div className={styles.packageRight}> 15,586,933</div>
                                  </div>

                                  <div className={styles.packageRow}> {/* one row div*/}
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
                                  <div className={styles.marginValue}>116.5</div>
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
              {this.getLegalEntity()}
            </div>
        )
    }
}

function mapStateToProps(state){
  //console.log('map state to props', state.getIn(['display', 'derivatives']))
  return{
    derivatives : state.getIn(['display', 'derivatives'])
  }
}
export const ActionsFilter = connect(mapStateToProps)(Actions)
