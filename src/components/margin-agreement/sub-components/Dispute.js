import React from 'react'
import styles from '../MarginAgreementList.css'

export default class Dispute extends React.Component{

  render(){
    const {
      marginData, actStyle, orgName,
      assetsName, handlerTotalMargin, handlerSelectedItem
    } = this.props
    return (
      <div className={styles.actPanel + ' ' + styles[actStyle]}>
        <div className={styles.panel}>
          <div className={styles.section + ' ' + styles.left}>
            <div className={styles.legalEntityContainer}>
              <div className={styles.legalEntity}>{ marginData.get(orgName) }</div>
              <div className={styles.legalEntityDetails}>
                <div>{ orgName } -</div>
                <div>Global Mutual Fund</div>
              </div>
            </div>
            <div className={styles.disputeSectionText}> {/* two row div for bold*/}
              <div className={styles.sectionRow}> {/* one row div*/}
                <div className={styles.columnleft}>
                  <div>Dispute Amount</div>
                </div>
                    <input type="text" className={styles.inputBox}/>

              </div>
              <div className={styles.sectionRow}> {/* one row div*/}
                <div className={styles.columnleft}>
                  <div>Agreed Amount</div>
                </div>
                  <input type="text" className={styles.inputBox}/>

                <div className={styles.packageRight}>
                  {/*{this.numberWithCommas(this.getTotalReconAmount(marginData.get(assetsName)))}*/}
                </div>
              </div>
              <div className={styles.sectionRow}> {/* one row div*/}
                <div className={styles.columnleft}>
                  <div>Reason Code</div>
                </div>
                  <input type="text" className={styles.inputBox}/>

                <div className={styles.packageRight}>
                  {/*{this.numberWithCommas(this.getTotalReconAmount(marginData.get(assetsName)))}*/}
                </div>
              </div>
              <div className={styles.sectionRow}> {/* one row div*/}
                <div className={styles.columnleft}>
                  <div>Comments</div>
                </div>
                  <input type="text" className={styles.inputBox}/>

                <div className={styles.packageRight}>
                  {/*{this.numberWithCommas(this.getTotalReconAmount(marginData.get(assetsName)))}*/}
                </div>
              </div>
              <div className={styles.sectionRow}> {/* one row div*/}
                <div className={styles.columnleft}>
                  <div>Dispute Amount</div>
                </div>
                  <input type="text" className={styles.inputBox}/>

                <div className={styles.packageRight}>
                  {/*{this.numberWithCommas(this.getTotalReconAmount(marginData.get(assetsName)))}*/}
                </div>
              </div>
              <div className={styles.sectionRow}> {/* one row div*/}
                <div className={styles.columnleft}>
                  <div>MTM</div>
                </div>
                  <input type="text" className={styles.inputBox}/>

                <div className={styles.packageRight}>
                  {/*{this.numberWithCommas(this.getTotalReconAmount(marginData.get(assetsName)))}*/}
                </div>
              </div>
              <div className={styles.sectionRow}> {/* one row div*/}
                <div className={styles.columnleft}>
                  <div>Collateral Balance</div>
                </div>
                  <input type="text" className={styles.inputBox}/>

                <div className={styles.packageRight}>
                  {/*{this.numberWithCommas(this.getTotalReconAmount(marginData.get(assetsName)))}*/}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    )
  }
}