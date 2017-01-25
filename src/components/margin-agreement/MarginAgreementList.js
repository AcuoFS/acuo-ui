/**
 * Created by panyong on 4/11/16.
 */
import React, {PropTypes} from 'react'
import {List, Map, toJS} from 'immutable'
import MarginAgreementPortfolio from './sub-components/MarginAgreementPortfolio'
import styles from './MarginAgreementList.css'


export default class MarginAgreementList extends React.Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   adjAmount: 0.0
    // }

    const {recon} = this.props
    this.displayLineItems = this.displayLineItems.bind(this)
    // this.getTotalAmount = this.getTotalAmount.bind(this)
    // this.getPercentage = this.getPercentage.bind(this)
    // this.getBtnColour = this.getBtnColour.bind(this)
    // this.onUpdateAdjAmount = this.onUpdateAdjAmount.bind(this)
    // this.isDisableReconButton = this.isDisableReconButton.bind(this)
  }

  displayLineItems(recon, onReconItem, onSelectedItem) {
    return (recon.map((x) => {

      if(x.get('direction') == 'OUT')
      return (
        <MarginAgreementPortfolio
          key={x}
          onSelectedItem={onSelectedItem}
          portfolioData={x}
          onReconItem={onReconItem}/>
      )

    }))
  }

  render() {
    const {recon, onReconItem, onSelectedItem} = this.props
    return (
      <div className={styles.actionContainer}>
        {this.displayLineItems(recon, onReconItem, onSelectedItem)}
      </div>
    )
  }
}

MarginAgreementList.PropTypes = {
  recon: PropTypes.instanceOf(List).isRequired,
  onReconItem: PropTypes.func.isRequired,
  onSelectedItem: PropTypes.func.isRequired
}

MarginAgreementList.defaultProps = {
  recon: List()
}
