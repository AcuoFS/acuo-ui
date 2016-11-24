import { connect } from 'react-redux'
import { GraphComponent } from '../components'


const mapStateToProps = state => ({
    currentTime : state.getIn(['display', 'timeUpdated']),
    derivatives : state.getIn(['display', 'derivatives'])
})

const mapDispatchToProps = dispatch => ({

})

const GraphContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GraphComponent)

export default GraphContainer