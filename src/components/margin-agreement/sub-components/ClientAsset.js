import React from 'react'
import MarginAgreementPortfolio from './MarginAgreementPortfolio'
import styles from '../MarginAgreementList.css'

export default class ClientAsset extends React.Component {

  render() {
    const {
      marginData, actStyle, orgName,
      assetsName, handlerTotalMargin, handlerSelectedItem,
      handlerUpdateAdj, adjAmt
    } = this.props

    return (
      <div className={styles.actPanel + ' ' + styles[actStyle]}>
        <MarginAgreementPortfolio marginData={marginData}
                                  orgName={orgName}
                                  assetsName={assetsName}
                                  handlerTotalMargin={handlerTotalMargin}
                                  handlerSelectedItem={handlerSelectedItem}
                                  handlerUpdateAdj={handlerUpdateAdj}
                                  adjAmt={adjAmt}/>

      </div>
    )


  }
}

