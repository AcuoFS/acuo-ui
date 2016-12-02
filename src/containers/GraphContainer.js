import { connect } from 'react-redux'
import { GraphComponent } from '../components'


const mapStateToProps = state => ({
    currentTime : state.mainReducer.getIn(['display', 'timeUpdated']),
    derivatives : state.mainReducer.getIn(['display', 'derivatives'])
})

const mapDispatchToProps = dispatch => ({

})

const GraphContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GraphComponent)

export default GraphContainer