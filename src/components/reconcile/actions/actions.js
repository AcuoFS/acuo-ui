/**
 * Created by panyong on 4/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import styles from './actions.css'
import {connect} from 'react-redux'
import {List} from 'immutable'


class Actions extends React.Component{
    constructor(props){
      super(props)
      this.getLegalEntity = this.getLegalEntity.bind(this)
      this.getDerivative = this.getDerivative.bind(this)
      this.getActionList = this.getActionList.bind(this)
      this.state = {

        }
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
                          <div className={styles.panelTitle}>
                            {i.get('legalEntity')}
                          </div>
                          <div>{i.get('legalEntity')}-{i.get('cptyOrg')}</div>
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
