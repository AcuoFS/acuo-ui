import { connect } from 'react-redux'
import { TableComponent } from '../components'
import { filterStateDeriv } from '../actions'

const mapStateToProps = state => ({
  derivatives: state.mainReducer.getIn(['display', 'derivatives'])
})

const mapDispatchToProps = dispatch => ({
  redirect: (e) => {
    dispatch(filterStateDeriv(e.currentTarget.dataset.ref))
  }
})

const TableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)

export default TableContainer
