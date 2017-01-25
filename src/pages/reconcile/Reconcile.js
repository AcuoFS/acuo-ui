import React from 'react'
import {
  FilterReconPageContainer,
  MarginAgreementListContainer,
  NavigationBarContainer
} from '../../containers'
import stylesG from '../../static/global.css'
import styles from './Reconcile.css'
import { connect } from 'react-redux'
import { filterStateStatus } from '../../actions'


class Reconcile extends React.Component {

  constructor(props) {
    super(props)

    this.props.onLoad()
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render() {

    const { numberOfItems } = this.props

    return (
      <div className={stylesG.globalStyles}>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <div className={styles.titleBar}>

          <div className={styles.title}>{numberOfItems} Actions to reconcile</div>
          <div className={styles.titleTriangle}></div>
        </div>
        <FilterReconPageContainer/>
        <MarginAgreementListContainer/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  numberOfItems: state.ReconReducer.get('items').reduce((sum, x) => {
    return (x.get('direction') == 'OUT' ? sum + 1 : sum)
  }, 0)
})

const mapDispatchToProps = dispatch => ({
  onLoad: ()=> {
    setTimeout(()=>{
      dispatch(filterStateStatus('unrecon'))
    }, 2000)
  }
})

const ReconcileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reconcile)

export {ReconcileContainer}
