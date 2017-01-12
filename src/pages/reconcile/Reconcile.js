import React from 'react'
import {
  FilterContainer,
  MarginAgreementListContainer,
  NavigationBarContainer
} from '../../containers'
import stylesG from '../../static/global.css'
import styles from './Reconcile.css'
import { connect } from 'react-redux'
import { lineItemInsertion, filterStateStatus } from '../../actions'


class Reconcile extends React.Component {

  constructor(props) {
    super(props)

    this.props.onLoad()
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
        <FilterContainer/>
        <MarginAgreementListContainer/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  numberOfItems: (state.mainReducer.getIn(['display', 'derivatives']) ? state.mainReducer.getIn(['display', 'derivatives']).reduce((sum, x) => {
    return sum + x.get('marginStatus').reduce((sum, y) => {
        return sum + y.get('timeFrames').reduce((sum, z) => {
            return sum + z.get('actionsList').size
          }, 0)
      }, 0)
  }, 0) : 0)
})

const mapDispatchToProps = dispatch => ({
  onLineItemInsertion: (lineItem) => {
    dispatch(lineItemInsertion(lineItem))
  },
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
