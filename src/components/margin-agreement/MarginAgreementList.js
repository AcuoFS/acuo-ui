/**
 * Created by panyong on 4/11/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import MarginAgreementPortfolio from './sub-components/MarginAgreementPortfolio'
import {UNMATCHED_PORTFOLIO_URL} from '../../constants/APIcalls'
import styles from './MarginAgreementList.css'


export default class MarginAgreementList extends React.Component {
  constructor(props) {
    super(props)

    const {recon} = this.props
    this.displayLineItems = this.displayLineItems.bind(this)
    // this.getTotalAmount = this.getTotalAmount.bind(this)
    // this.getPercentage = this.getPercentage.bind(this)
    // this.getBtnColour = this.getBtnColour.bind(this)
    // this.onUpdateAdjAmount = this.onUpdateAdjAmount.bind(this)
    // this.isDisableReconButton = this.isDisableReconButton.bind(this)
  }

  displayLineItems(recon, onReconItem, onSelectFirstLevelItem, firstLevelList, secondLevelList,
                   onSelectSecondLevelItem, currencyInfo) {
    return (recon.map(x => {
      return (
        <MarginAgreementPortfolio
          key={x.get('GUID')}
          onSelectFirstLevelItem={onSelectFirstLevelItem}
          portfolioData={x}
          onReconItem={onReconItem}
          firstLevelList={firstLevelList.get(x.get('GUID'))}
          secondLevelList={secondLevelList.get(x.get('GUID'))}
          onSelectSecondLevelItem={onSelectSecondLevelItem}
          currencyInfo={currencyInfo}/>
      )

    }))
  }

  componentDidUpdate() {
    if(this.props.recon.size <= 0)
      this.props.resetFilters()
  }

  render() {

    const {
      recon, firstLevelList, secondLevelList, currencyInfo,
      onSelectSecondLevelItem,  onReconItem, onSelectFirstLevelItem
    } = this.props

    // console.log(secondLevelList.toJS())

    return (
      <div className={styles.actionContainer}>
        {this.displayLineItems(recon, onReconItem, onSelectFirstLevelItem, firstLevelList, secondLevelList,
          onSelectSecondLevelItem, currencyInfo)}
      </div>
    )
  }
}

MarginAgreementList.PropTypes = {
  recon: PropTypes.array.isRequired,
  onReconItem: PropTypes.func.isRequired,
  onSelectedItem: PropTypes.func.isRequired
}
