import React from 'react'
// index.js import doesn't work well with containers, use explicit
import UnmatchedTableContainer from '../../containers/UnmatchedTableContainer'
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
    // { propOnTogglePortfolioPopup } = this.props
    return (
      <div className={styles.compContainer}>
        <div className={styles.flexCont}>
          <div className={styles.compHeader}>Select Portfolio</div>
          <div className={styles.searchCont}>
            <div className={styles.searchLabel}>Search by Counterparty name</div>
            <input className={styles.searchInput} type="text"
                   onChange={(e) => this.onSearch(e.target.value)}/>
          </div>
          <div className={styles.closeBtn} onClick={() => this.props.propOnTogglePortfolioPopup()}>x</div>
        </div>
        <UnmatchedTableContainer onTableRow={this.onTableRow}
                                 filterText={this.state.filterText}
                                 selectedList={this.state.selectedList}
         />

        <div className={ styles.buttonContainer }>
         {
          (this.state.selectedList.length > 0 ?
           <button className={styles.okButton} onClick={this.onGenerate}>OK</button>  :
           <button className={styles.okButtonDisabled} disabled="true">OK</button> )
          }
       </div>

      </div>
    )
  }
}
