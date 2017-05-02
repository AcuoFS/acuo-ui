import React from 'react'
import MarginAgreementAssets from './MarginAgreementAssets'
import styles from '../MarginAgreementList.css'

export default class ClientAsset extends React.Component {

  render() {
    const {
      marginData, actStyle, orgName,
      assetsName, handlerTotalMargin, handlerSelectedItem,
      handlerUpdateAdj, adjAmt,
      firstLevelList, secondLevelList,
      onSelectSecondLevelItem, currencyInfo
    } = this.props

    return (
      <div className={styles.actPanel + ' ' + styles[actStyle]}>
        <MarginAgreementAssets marginData={marginData}
                               orgName={orgName}
                               assetsName={assetsName}
                               handlerTotalMargin={handlerTotalMargin}
                               handlerSelectedItem={handlerSelectedItem}
                               handlerUpdateAdj={handlerUpdateAdj}
                               adjAmt={adjAmt}
                               firstLevelList={firstLevelList}
                               secondLevelList={secondLevelList}
                               onSelectSecondLevelItem={onSelectSecondLevelItem}
                               party={'client'}
                               currencyInfo={currencyInfo}/>

      </div>
    )


  }
}

