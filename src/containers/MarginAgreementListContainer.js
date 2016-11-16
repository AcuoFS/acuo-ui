import { connect } from 'react-redux'
import { MarginAgreementsComponent } from '../components'


const mapStateToProps = state => ({
  derivatives : state.getIn(['display', 'derivatives']),
  recon : state.getIn(['data', 'recon'])
})

const mapDispatchToProps = dispatch => ({

})

const MarginAgreementsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MarginAgreementsComponent)

export default MarginAgreementsContainer
