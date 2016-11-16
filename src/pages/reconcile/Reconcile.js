import React from 'react'
import { render } from 'react-dom'
import { NavContainer } from '../../components'
import FilterContainer from '../../containers/FilterContainer'
import MarginAgreementListContainer from '../../containers/MarginAgreementListContainer'
import stylesG from '../../static/global.css'
import styles from './Reconcile.css'


class Reconcile extends React.Component{
    render(){
        return(
            <div className={stylesG.globalStyles}>
                <NavContainer curPage={this.props.location.pathname}/>
                <div className={styles.titleBar}>

                    <div className={styles.title}>14 Actions to reconcile</div>
                    <div className={styles.titleTriangle}></div>
                </div>
                <FilterContainer/>
                <MarginAgreementListContainer/>
            </div>
        )
    }
}

export { Reconcile }
