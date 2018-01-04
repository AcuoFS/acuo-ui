import React from 'react'
import styles from './Popup_deployedHome.css'

/****
 * messy
 */

class Popup_DeployedHome extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      adjAmount: 0,
      amount: 0,
      defaultAmount: 0,
      defaultAdjAmount: 0
    }
  }

  componentDidMount() {
    const adjValue = JSON.parse(this.props.state.data.Popup_DroppedAsset).asset.adjValue
    const value = JSON.parse(this.props.state.data.Popup_DroppedAsset).asset.value

    this.setState({
      defaultAmount: parseFloat(value),
      defaultAdjAmount: adjValue ? parseFloat(adjValue) : parseFloat(value),
      amount: parseFloat(value),
      adjAmount: adjValue ? parseFloat(adjValue) : parseFloat(value)
    })
  }

  changeAdjAmount = (adjAmount) => {
    this.setState({
      adjAmount,
      amount: this.state.defaultAmount
    })
  }

  changeAmount = (amount) => {
    this.setState({
      amount,
      adjAmount: this.state.defaultAdjAmount
    })
  }

  render() {

    const props = this.props

    let genValues = (props) => {
      function AssignConstants(props) {
        if (props) {
          this.state = props.state;
          this.actions = props.actions;
          this.show = props.show;
          this.droppedLoad = JSON.parse(this.state.data.Popup_DroppedAsset);
          this.fromWidget = this.droppedLoad.widget;
          this.formPopupObject = (state, droppedLoad, show) => {
            let buildFor = {
              HomeToDeployed: (state, droppedLoad) => {
                let selectedDeployedAgreement = this.state.data.Popup_AssetToBeReplaced;
                let selectedDeployedAsset = ((show, selectedDeployedAgreement) => {
                  if (show) {
                    let agreementObj = _.clone(selectedDeployedAgreement)
                    let selectedAsset = _.find(agreementObj.SelectedDeployedAgreement.data, (a) => {
                      return a.id === agreementObj.assetID
                    })
                    return selectedAsset
                  }
                })(show, selectedDeployedAgreement)


                // console.log(droppedLoad.asset)

                return {
                  fromWho: (droppedLoad.asset ? droppedLoad.asset.counterparty : droppedLoad.asset.legalEntity),
                  fromAsset: droppedLoad.asset.asset,
                  toCounterparty: selectedDeployedAgreement.SelectedDeployedAgreement.counterparty,
                  toAgreement: selectedDeployedAgreement.SelectedDeployedAgreement.agreement,
                  toAsset: selectedDeployedAsset.asset,
                  haircut: selectedDeployedAsset.haircut,
                  amount: droppedLoad.asset.value,
                }
              }, //end-HomeToDeployed()
              DeployedToHome: (state, droppedLoad) => {
                let {agreement, asset} = droppedLoad
                let {assetCategory, SelectedHomeAsset} = state.data.Popup_AssetToBeReplaced

                // console.log(asset)

                return {
                  fromAgreement: agreement.agreement,
                  fromCounterparty: agreement.counterparty,
                  fromAsset: asset.asset,
                  fromAdjAmount: asset.adjValue,
                  fromHaircut: asset.haircut,
                  toCounterparty: (assetCategory === "pledged" ? SelectedHomeAsset.counterparty : SelectedHomeAsset.legalEntity),
                  toAsset: SelectedHomeAsset.asset,
                  amount: asset.value,
                  adjAmount: asset.adjValue

                }
              }, //end-DeployedToHome()
            }//{ buildFor }

            switch (droppedLoad.widget) {
              case 'home':
                return buildFor.HomeToDeployed(state, droppedLoad)
              case 'deployed':
                return buildFor.DeployedToHome(state, droppedLoad)
              default:
                console.error(`Application Error! Source widget is unspecified!`)
                alert(`Application Error! Source widget is unspecified!`)
                break
            }

          }//end-formPopupObject()
          this.PopupObject = this.formPopupObject(this.state, this.droppedLoad, this.show)
        }
      }

      return new AssignConstants(props)
    }

    const Values = genValues(props)

    let Render_HomeToDepoyedPopup = (PopupObject, Values, styles) => {
      return (
        <div className={(Values.show ? styles.screen : styles.screen + ' ' + styles.hide)}>
          <div className={styles.popup}>
            <div className={styles.contentHolder}>
              <div className={styles.agreement}>
                Agreement: {PopupObject.toAgreement}
              </div>

              <div className={styles.col_2}>
                <div>
                  <div>From:</div>
                </div>
                <div>
                  <div>{PopupObject.fromWho}</div>
                </div>
                <div>
                  <div>To:</div>
                </div>
                <div>
                  <div>{PopupObject.toCounterparty}</div>
                </div>
              </div>
              <div className={styles.col_2}>
                <div>
                  <div>Selected:</div>
                </div>
                <div>
                  <div>{PopupObject.fromAsset}</div>
                </div>
                <div>
                  <div>Original:</div>
                </div>
                <div>
                  <div>{PopupObject.toAsset}</div>
                </div>
              </div>
              <div className={styles.col_2}>
                <div>
                  <div>Haircut:</div>
                </div>
                <div>
                  <div>{PopupObject.haircut}</div>
                </div>
                <div>
                  <div>FX:</div>
                </div>
                <div>
                  <div>1.00</div>
                </div>
              </div>

              <div className={styles.row + ' ' + styles.topRow}>
                <div>Amount (USD):</div>
                {Values.state.ui.substituted ?
                  <div>{this.state.adjAmount == this.state.defaultAdjAmount ? this.state.amount : ''}</div>
                  :
                  <input className={styles.amtInput}
                         type="number"
                         placeholder="Enter Amount"
                         onChange={(e) => {
                           // Values.actions.Popup_Amount(e.currentTarget.value)
                           // Values.actions.calculateAdjAmount(e.currentTarget.value)
                           this.changeAmount(e.currentTarget.value)
                         }}
                         value={this.state.adjAmount == this.state.defaultAdjAmount ? this.state.amount : ''}
                  />
                }
              </div>

              { console.log(this.state.amount) }
              { console.log(this.state.defaultAmount) }
              { console.log(this.state.adjAmount) }
              { console.log(this.state.defaultAdjAmount) }

              <div className={styles.row}>
                <div>Adj. Amount (USD):</div>
                { Values.state.ui.substituted ?
                  <div>{this.state.amount == this.state.defaultAmount ? this.state.adjAmount : ''}</div>
                  :
                <input className={styles.amtInput}
                       type="number"
                       placeholder="Enter Adj. Amount"
                       onChange={(e) => this.changeAdjAmount(e.currentTarget.value)}
                       value={this.state.amount == this.state.defaultAmount ? this.state.adjAmount : ''}
                         // this.state.defaultAmount === parseFloat(Values.state.ui.Popup_Amount) ?
                         //   parseFloat(PopupObject.amount) : this.state.adjAmount }
                />
                }
              </div>
              <div className={styles.buttonHolder}>
                <div className={styles.cancelBtn}
                     onClick={() => {
                       Values.actions.Popup_onClickCancel({
                           "ui": {
                             "showPopup": !Values.show,
                             "substituted": false
                           },
                           "data": {
                             "Popup_DroppedAsset": undefined,
                             "Popup_AssetToBeReplaced": undefined,
                             "Popup_Amount": undefined
                           }
                         }
                       )
                     }}>
                  Cancel
                </div>
                { Values.state.ui.substituted ?
                  <div className={styles.confirmBtn}>Confirm</div>
                  :
                  <div className={styles.confirmBtn} onClick={(e) => {
                    Values.actions.calculateAdjAmount()}
                  }>Substitute</div>
                }
              </div>
            </div>
          </div>
        </div>
      )
    }

    let Render_DeployedToHomePopup = (PopupObject, Values, styles) => {
      return (
        <div className={(Values.show ? styles.screen : styles.screen + ' ' + styles.hide)}>
          <div className={styles.popup}>
            <div className={styles.contentHolder}>
              <div className={styles.agreement}>
                Agreement: {PopupObject.fromAgreement}
              </div>

              <div className={styles.col_2}>
                <div>
                  <div>From:</div>
                </div>
                <div>
                  <div>{PopupObject.fromCounterparty}</div>
                </div>
                <div>
                  <div>To:</div>
                </div>
                <div>
                  <div>{PopupObject.toCounterparty}</div>
                </div>
              </div>
              <div className={styles.col_2}>
                <div>
                  <div>Selected:</div>
                </div>
                <div>
                  <div>{PopupObject.fromAsset}</div>
                </div>
                <div>
                  <div>Original:</div>
                </div>
                <div>
                  <div>{PopupObject.toAsset}</div>
                </div>
              </div>
              <div className={styles.col_2}>
                <div>
                  <div>Haircut:</div>
                </div>
                <div>
                  <div>{PopupObject.fromHaircut}</div>
                </div>
                <div>
                  <div>FX:</div>
                </div>
                <div>
                  <div>1.00</div>
                </div>
              </div>

              <div className={styles.row + ' ' + styles.topRow}>
                <div>Amount (USD):</div>
                {Values.state.ui.substituted ?
                  <div>{this.state.adjAmount == this.state.defaultAdjAmount ? this.state.amount : ''}</div>
                  :
                  <input className={styles.amtInput}
                         type="number"
                         placeholder="Enter Amount"
                         onChange={(e) => {
                           // Values.actions.Popup_Amount(e.currentTarget.value)
                           Values.actions.calculateAdjAmount(e.currentTarget.value)
                           this.changeAmount(e.currentTarget.value)
                         }}
                         value={this.state.adjAmount == this.state.defaultAdjAmount ? this.state.amount : ''}
                    // value={parseFloat(Values.state.ui.Popup_Amount) || parseFloat(PopupObject.amount)}
                  />
                }
              </div>

              <div className={styles.row}>
                <div>Adj. Amount (USD):</div>
                {Values.state.ui.substituted ?
                  <div>{this.state.amount == this.state.defaultAmount ? this.state.adjAmount : ''}</div>
                  :
                  <input className={styles.amtInput}
                       type="number"
                       placeholder="Enter Adj. Amount"
                       onChange={(e) => this.changeAdjAmount(e.currentTarget.value)}
                       value={this.state.amount == this.state.defaultAmount ? this.state.adjAmount : ''}
                         // this.state.defaultAmount === parseFloat(Values.state.ui.Popup_Amount) ?
                         //   parseFloat(PopupObject.amount) : this.state.adjAmount }
                />
                }
              </div>
              <div className={styles.buttonHolder}>
                <div className={styles.cancelBtn}
                     onClick={() => {
                       Values.actions.Popup_onClickCancel({
                           ui: {
                             "showPopup": !Values.show,
                             "substituted": false
                           },
                           data: {
                             "Popup_DroppedAsset": undefined,
                             "Popup_AssetToBeReplaced": undefined,
                             "Popup_Amount": undefined,
                             "Popup_DraggingDeployedAssetID": undefined,
                           }
                         }
                       )
                     }}>
                  Cancel
                </div>
                { Values.state.ui.substituted ?
                  <div className={styles.confirmBtn}>Confirm</div>
                  :
                  <div className={styles.confirmBtn} onClick={(e) => {
                    Values.actions.calculateAdjAmount()}
                  }>Substitute</div>
                }
              </div>
            </div>
          </div>
        </div>
      )
    }

    // console.log(Values.actions)
    // console.log(this.state)

    switch (Values.fromWidget) {

      case "home":
        return Render_HomeToDepoyedPopup(Values.PopupObject, Values, styles)
      case "deployed":
        return Render_DeployedToHomePopup(Values.PopupObject, Values, styles)
      default:
        alert("Popup Failed!\n See Browser's Dev Console ")
        console.warn({
          error: {
            message: "Unable to identify where drag is started from",
            constant: fromWidget,
            component_Values: Values
          }
        })
        break
    }
  }

}//end of Component: Popup_DeployedHome()

export default Popup_DeployedHome

/* #Possible Improvements

 * Render functions for popup are seperated for the time being for easy debugging.
 Refactoring can be done (eg combining render function into one) once there's
 more clarity to the responsibility of each popup.

 * The block of fields (className={styles.col_2}) are now nested in divs. It is possible to
 reduce the nested-ness.

 */
