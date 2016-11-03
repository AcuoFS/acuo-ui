/**
 * Created by vikassaryal on 2/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import {FilterContainer} from '../shared/filters/filter'
import styles from '../../global.css'
import stylesRecon from './reconcile.css'
import Nav from '../../components/shared/navbar/navbar'

class Reconcile extends React.Component{


  render(){
    return(
      <div className={styles.globalStyles}>
        <Nav/>
        <FilterContainer/>
      </div>
    )
  }
}

export default Reconcile