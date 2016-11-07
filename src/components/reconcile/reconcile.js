/**
 * Created by vikassaryal on 2/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import {FilterContainer} from '../shared/filters/filter'
import Actions from './actions/actions'
import stylesG from '../../global.css'
import styles from './reconcile.css'
import Nav from '../../components/shared/navbar/navbar'

class Reconcile extends React.Component{


  render(){
    return(
      <div className={stylesG.globalStyles}>
        <Nav curPage={this.props.location.pathname}/>
        <div className={styles.titleBar}>

            <div className={styles.title}>14 Actions to reconcile</div>
            <div className={styles.titleTriangle}></div>
        </div>
        <FilterContainer/>
        <Actions/>
      </div>
    )
  }
}

export default Reconcile