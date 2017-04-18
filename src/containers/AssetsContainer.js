import { connect } from 'react-redux';
import { AssetsComponent } from '../components'

const mapStateToProps = (stateProps, ownProps) => {return null}

const mapDispatchToProps = (dispatch, ownProps) => {return null}

const AssetsContainer =  connect(
 mapStateToProps,
 mapDispatchToProps
)(AssetsComponent)

export default AssetsContainer;
