/**
 * Created by vikassaryal on 2/11/16.
 */
import React from 'react'
import { render } from 'react-dom'

import styles from '../../global.css'
import stylesRecon from './reconcile.css'


class Reconcile extends React.Component{


  render(){
    return(
      <div className={styles.globalStyles}>
        recon page
      </div>
    )
  }
}

export default Reconcile