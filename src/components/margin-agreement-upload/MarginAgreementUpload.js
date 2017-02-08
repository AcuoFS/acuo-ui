import React from 'react'
import ClientAsset from '../margin-agreement/sub-components/ClientAsset'
import CounterPartyAssets from '../margin-agreement/sub-components/CounterPartyAssets'
import styles from './MarginAgreementUpload.css'
import portfolioStyles from '../margin-agreement/MarginAgreementList.css'


export default class MarginAgreementUpload extends React.Component {
  render() {

    const {
      propPortfolioData,
      propHandlerTotalMargin,
      propHandlerSelectedItem,
      propHandlerUpdateAdj,
      propAdjAmt,
      propFirstLevelList,
      propSecondLevelList,
      propOnSelectSecondLevelItem,
      propIsUploading,
      propOnTogglePortfolioPopup
    } = this.props

    return (
      <div className={styles.popupContainer + ' ' + (propIsUploading ? styles.showPopup : '')}>

        <div className={styles.closeBtn} onClick={()=>propOnTogglePortfolioPopup()}>x</div>

        <div className={styles.portfolioContainer}>
          <ClientAsset marginData={propPortfolioData}
                       actStyle={'act_L'}
                       orgName={'legalEntity'}
                       assetsName={'clientAssets'}
                       handlerTotalMargin={propHandlerTotalMargin}
                       handlerSelectedItem={propHandlerSelectedItem}
                       handlerUpdateAdj={propHandlerUpdateAdj}
                       adjAmt={propAdjAmt}
                       firstLevelList={propFirstLevelList}
                       secondLevelList={propSecondLevelList}
                       onSelectSecondLevelItem={propOnSelectSecondLevelItem}/>

          <div className={portfolioStyles.actPanel + ' ' + portfolioStyles.act_C}>

          </div>

          <CounterPartyAssets marginData={propPortfolioData}
                              actStyle={'act_R'}
                              orgName={'cptyOrg'}
                              assetsName={'counterpartyAssets'}
                              handlerTotalMargin={propHandlerTotalMargin}
                              handlerSelectedItem={propHandlerSelectedItem}
                              firstLevelList={propFirstLevelList}
                              secondLevelList={propSecondLevelList}
                              onSelectSecondLevelItem={propOnSelectSecondLevelItem}
                              isUploading={propIsUploading}/>
        </div>

        <div className={styles.portfolioTableContainer}>select portfolio</div>
      </div>
    )
  }
}