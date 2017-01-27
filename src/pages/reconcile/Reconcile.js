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

// =============================================================================
// redux
const mapStateToProps = state => {
  const filters = state.ReconReducer.get('filters').toJS()
  const items   = state.ReconReducer.get('items').toJS()

  const filteredItems = filterItems(items, filters)
  const outItems = _.filter(filteredItems, ['direction', 'OUT'])

  return {
    outItems,
  }
}

// =============================================================================
// redux
class Reconcile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render() {
    const { outItems } = this.props

    return (
      <div className={stylesG.globalStyles}>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <div className={styles.titleBar}>
          <div className={styles.title}>{outItems.length} Actions to reconcile</div>
          <div className={styles.titleTriangle}></div>
        </div>
        <FilterReconPageContainer />
        <MarginAgreementListContainer />
      </div>
    )
  }
}

// =============================================================================
// connect component with redux
const ReconcileContainer = connect(
  mapStateToProps,
  {}
)(Reconcile)

export {ReconcileContainer}
