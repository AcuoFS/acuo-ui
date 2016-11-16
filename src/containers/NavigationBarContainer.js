import { connect } from 'react-redux'
import { NavigationBarComponent } from '../components'

const mapStateToProp = state =>({
    timeUpdated : state.getIn(['display', 'timeUpdated'])
})

const mapDispatchToProps = dispatch =>({

})

const NavigationBarContainer = connect(
    mapStateToProp,
    mapDispatchToProps
)(NavigationBarComponent)

export default NavigationBarContainer

