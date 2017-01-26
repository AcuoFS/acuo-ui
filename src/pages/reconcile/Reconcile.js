import React from 'react'
import _ from 'lodash'
import {
  FilterReconPageContainer,
  MarginAgreementListContainer,
  NavigationBarContainer
} from '../../containers'
import filterItems from '../../utils/filterItems'
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

const mapStateToProps = state => {
  const filters = state.ReconReducer.get('filters').toJS()
  const items   = state.ReconReducer.get('items').toJS()

  const filteredItems = filterItems(items, filters)

  const outItems = _.filter(filteredItems, ['direction', 'OUT'])

  return {
    numberOfItems: outItems.length
  }
}

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
