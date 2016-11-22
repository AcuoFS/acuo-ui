import React from 'react'
import {
    FilterContainer,
    MarginAgreementListContainer,
    NavigationBarContainer
} from '../../containers'
import stylesG from '../../static/global.css'
import styles from './Reconcile.css'
import { connect } from 'react-redux'
import { lineItemInsertion } from '../../actions'
import { fromJS } from 'immutable'


class Reconcile extends React.Component{

    constructor(props){
        super(props)

        fetch('https://acuo.herokuapp.com/json').then((response) => {
            return response.json()
        }).then((obj) => {
            this.props.onLineItemInsertion(fromJS(obj.recon))
        })
    }

    render(){
        return(
            <div className={stylesG.globalStyles}>
                <NavigationBarContainer curPage={this.props.location.pathname}/>
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

const mapStateToProps = state => ({
    recon : state.getIn(['data', 'recon'])
})

const mapDispatchToProps = dispatch => ({
    onLineItemInsertion: (lineItem) => {
        dispatch(lineItemInsertion(lineItem))
    }
})

const ReconcileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Reconcile)

export { ReconcileContainer }
