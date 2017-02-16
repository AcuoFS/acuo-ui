import { connect } from 'react-redux'
import { TableComponent } from '../components'
import { updateReconFilter } from '../actions'

const mapStateToProps = state => ({
  derivatives: state.mainReducer.getIn(['display', 'derivatives'])
})

const mapDispatchToProps = dispatch => ({
  redirect: (value) => {
    dispatch(updateReconFilter({
      attr: 'type',
      selected: {
        label: value.toUpperCase(),
        value: value
      }
    }))
  }
})

const TableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)

export default TableContainer
