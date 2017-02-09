import React from 'react'
// index.js import doesn't work well with containers, use explicit
// import UnmatchedTableContainer from '../../containers/UnmatchedTableContainer'
import UnmatchedTable from './sub-components/UnmatchedTable'
import styles from './UnmatchedPortfolio.css'


export default class UnmatchedPortfolio extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedList: [],
      filterText: ''
    }
    this.onTableRow = this.onTableRow.bind(this)
  }

  onTableRow(portfolio, isChecked) {
    if (isChecked) {
      this.setState({
        selectedList: [...this.state.selectedList, portfolio]
      })
    } else {
      this.setState({
        selectedList: this.state.selectedList.filter(row =>
        row.msId != portfolio.msId)
      })
    }
  }

  onSearch(text) {
    this.setState({
      filterText: text
    })
  }

  render() {
    return (
      <div className={styles.compContainer}>
        <div className={styles.flexCont}>
          <div className={styles.compHeader}>Select Portfolio</div>
          <div className={styles.searchCont}>
            <div className={styles.searchLabel}>Search by Counterparty name</div>
            <input className={styles.searchInput} type="text"
                   onChange={(e) => this.onSearch(e.target.value)}/>
          </div>
        </div>
        <UnmatchedTable unmatchedPortfolios={this.props.unmatchedPortfolios}
                        onTableRow={this.onTableRow}
                        filterText={this.state.filterText}
                        selectedList={this.state.selectedList}/>
        <div className={
          (this.state.selectedList.length > 0)
            ? styles.buttonContainer : styles.hide}>
          <button onClick={this.onGenerate}>OK</button>
        </div>

      </div>
    )
  }
}