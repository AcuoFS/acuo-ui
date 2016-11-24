import { connect } from 'react-redux'
import { TableComponent } from '../components'

const mapStateToProps = state => ({
    derivatives : state.getIn(['display', 'derivatives'])
})

const mapDispatchToProps = dispatch => ({

})

const TableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TableComponent)

export default TableContainer
