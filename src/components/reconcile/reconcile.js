/**
 * Created by vikassaryal on 2/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import {FilterContainer} from '../shared/filters/filter'
import {ActionsFilter} from './actions/actions'
import stylesG from '../../global.css'
import styles from './reconcile.css'
import {NavContainer} from '../../components/shared/navbar/navbar'
import * as actionCreators from '../../action_creators'

class Reconcile extends React.Component{
  constructor(props){
    super(props)

    fetch('https://acuo.herokuapp.com/json').then((response) => {
        return response.json()
    }).then((obj) => {
      console.log(obj.recon)
        this.props.lineItemInsertion(fromJS(obj.recon))
    })
  }

  render(){
    return(
      <div className={stylesG.globalStyles}>
        <NavContainer curPage={this.props.location.pathname}/>
        <div className={styles.titleBar}>

            <div className={styles.title}>14 Actions to reconcile</div>
            <div className={styles.titleTriangle}></div>
        </div>
        <FilterContainer/>
        <ActionsFilter/>
      </div>
    )
  }
}

function mapStateToProps(state){
  //console.log('map state to props', state.getIn(['display', 'derivatives']))
  return{
    recon : state.getIn(['data', 'recon'])
  }
}

export const ReconcileContainer = connect(mapStateToProps, actionCreators)(Reconcile)
