import React from 'react'
import MarginAgreementPortfolio from './MarginAgreementPortfolio'
import Dispute from './Dispute'
import {TAB_MARGIN_AGREEMENT_PORTFOLIO, TAB_MARGIN_AGREEMENT_DISPUTE} from '../../../constants/ComponentConstant'
import styles from '../MarginAgreementList.css'


export default class CounterPartyAssets extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      selectedTab : TAB_MARGIN_AGREEMENT_DISPUTE
    }
    this.handleOnTabSelect = this.handleOnTabSelect.bind(this)
  }

  handleOnTabSelect(e){

    console.log(e.currentTarget.value)

    if(e.currentTarget.dataset.value == TAB_MARGIN_AGREEMENT_PORTFOLIO){

      this.setState((prevState) => ({
        selectedTab: TAB_MARGIN_AGREEMENT_PORTFOLIO
      }));
    }else {
      this.setState((prevState) => ({
        selectedTab: TAB_MARGIN_AGREEMENT_DISPUTE
      }));
    }
  }

  render(){
    const {
      marginData, actStyle, orgName,
      assetsName, handlerTotalMargin, handlerSelectedItem
    } = this.props

    let activeTabComponent = null
    if(this.state.selectedTab == TAB_MARGIN_AGREEMENT_PORTFOLIO){
      activeTabComponent = <MarginAgreementPortfolio marginData={marginData}
                                                     orgName={orgName}
                                                     assetsName={assetsName}
                                                     handlerTotalMargin={handlerTotalMargin}
                                                     handlerSelectedItem={handlerSelectedItem}/>
    }
    else{
      activeTabComponent = <Dispute marginData={marginData}
                                    actStyle={actStyle}
                                    orgName={orgName}
                                    assetsName={assetsName}
                                    handlerTotalMargin={handlerTotalMargin}
                                    handlerSelectedItem={handlerSelectedItem}/>
    }

    return (
      <div className={styles.actPanel + ' ' + styles[actStyle]}>
        <ul className={styles.tabs14}>
          <li onClick={this.handleOnTabSelect} data-value={TAB_MARGIN_AGREEMENT_PORTFOLIO}>
            <img src="./images/reconcile/reconcile_tab_hidden.png"/>
          </li>
          <li onClick={this.handleOnTabSelect} data-value={TAB_MARGIN_AGREEMENT_DISPUTE}>
            <img src="./images/reconcile/dispute_tab_shown.png"/>
          </li>
        </ul>
        {activeTabComponent}
      </div>

    )
  }
}

