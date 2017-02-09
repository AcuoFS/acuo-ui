import { connect } from 'react-redux'
import UnmatchedTableComponent from '../components/unmatched_portfolio/sub-components/UnmatchedTable'
import { initUnmatchedPortfolio } from '../actions/UnmatchedPortfolioActions'

const mapStateToProps = state => ({
  unmatchedPortfolios: state.UnmatchedPortfolioReducer.get('unmatchedPortfolios')
})

const mapDispatchToProps = dispatch => ({
  onInitUnmatchedPortfolio: (unmatchedPortfolios) => {
    dispatch(initUnmatchedPortfolio(unmatchedPortfolios))
  }
})

const UnmatchedTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnmatchedTableComponent)

export default UnmatchedTableContainer
