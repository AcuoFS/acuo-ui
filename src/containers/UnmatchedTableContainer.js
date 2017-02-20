import {connect} from 'react-redux'
import UnmatchedTable from '../components/unmatched_portfolio/sub-components/UnmatchedTable'
import {initUnmatchedPortfolio} from '../actions/UnmatchedPortfolioActions'

const mapStateToProps = state => ({
  unmatchedPortfolios: state.UnmatchedPortfolioReducer.get('unmatchedPortfolios').toJS()
})

const mapDispatchToProps = dispatch => ({
  onInitUnmatchedPortfolio: (unmatchedPortfolios) => {
    dispatch(initUnmatchedPortfolio(unmatchedPortfolios))
  }
})

const UnmatchedTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnmatchedTable)

export default UnmatchedTableContainer