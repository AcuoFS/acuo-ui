import React from 'react'
import styles from './AssetsPanel.css'
import PanelWindow from './deployedViews/PanelWindow.js'
import AssetsHomeTableView from './deployedViews/TableView/AssetsHomeTableView.js'
/*Actions*/
import {AssetsPanel} from '../../../actions/AssetsActions.js'
//Mock Data
import {HomePledgedContentNew, HomePrincipalContentNew} from '../mockData/mockData.js'
import TableStyles from './TableStyles.js'


const AssetsHomeComponent = (props) => {
  let state = props.state
  let actions = props.actions;

  let ExpandedVertically = state.ui.HomePanel_ExpandedVertically;
  let AssetsDeployedPanelExpandedSideways = state.ui.DeployedPanel_ExpandedSideways; //default: false
  let HomeWidgetSideExpanded = !AssetsDeployedPanelExpandedSideways
  let IsPledgeSelected = state.ui.HomePanel_IsPledgeSelected;
  let FetchedHomeAssetData = (IsPledgeSelected ? HomePledgedContentNew : HomePrincipalContentNew)

  let cellWidth = {
    expanded: [12, 12, 8, 14, 7, 11, 6, 6, 11, 10],
    minimized: [16, 25, 16, 29, 13]
  }

  let generateContent = (IsPledgeSelected, response, HomeWidgetSideExpanded) => {
    /* Asserts Logs */
    let assert = {
      ExpectPledgeOrPrincipal: (IsPledgeSelected, asset) => {
        (IsPledgeSelected === true ? console.assert(asset.counterparty != undefined, {
          error: `Expecting Pledge data but no Counterparty specified`,
          asset
        }) : console.assert(asset.legalEntity != undefined, {
          error: `Expecting Principal data but Legal Entity specified`,
          asset
        }))
      },
      AssetContainsMissingField: (asset) => {
        _.map(asset, (el, key) => console.assert(el != undefined && el != null && el.trim() != "", {
          error: `Asset's ${key} is missing`,
          asset
        }))
      }
    }
    /* Helper Functions */
    let run = {
      getHeader: (HomeWidgetSideExpanded) => {
        return (HomeWidgetSideExpanded ?
          ['Asset', (IsPledgeSelected === true ? 'Counterparty' : 'Legal Entity'), 'Quantity', 'Value', 'Rating', 'Maturity', 'Int. Cost', 'Opp. Cost', 'Custodian', 'Region'] :
          ['Asset', (IsPledgeSelected === true ? 'Counterparty' : 'Legal Entity'), 'Quantity', 'Value', 'Rating'])
      },
      getRow: (IsPledgeSelected, response, HomeWidgetSideExpanded) => {
        return _.reduce(response,
          (acc, asset) => {
            assert.ExpectPledgeOrPrincipal(IsPledgeSelected, asset)
            assert.AssetContainsMissingField(asset)

            let assetInfo = (HomeWidgetSideExpanded ?
              [asset.asset, (IsPledgeSelected == true ? asset.counterparty : asset.legalEntity), asset.quantity, asset.value, asset.rating, asset.maturityDate, asset.intCost, asset.oppCost, asset.custodian, asset.region] :
              [asset.asset, (IsPledgeSelected == true ? asset.counterparty : asset.legalEntity), asset.quantity, asset.value, asset.rating])

            return _.concat(acc, {assetID: asset.id, assetInfo})
          },
          [])
      },
      formContentObject: (Header, RowData) => ({Header, RowData})
    }
    /*-------------------------------------------------*/

    let Header = run.getHeader(HomeWidgetSideExpanded)
    let RowData = run.getRow(IsPledgeSelected, response, HomeWidgetSideExpanded)
    return run.formContentObject(Header, RowData)
  } //end generateContent()

  return (
    <div className={ExpandedVertically ? (styles.assetsPanelFrameExpandedVertically) : (styles.assetsPanelFrame)}>
      <div className={styles.assetsPanelHeader}>
        <span className={styles.assetsPanelTitleText}> At Home </span>
        {
          <img className={styles.assetsPanelHeaderSideExpandBtn}
               src={(AssetsDeployedPanelExpandedSideways ? "images/assets_deployed/minimize-sideways.svg" : "images/assets_deployed/expand-sideways.svg")}
               onClick={() => {
                 actions.DeployedPanel_ToggleSideExpand(!AssetsDeployedPanelExpandedSideways)
               }}/>
        }

      </div>
      <PanelWindow>
        {
          <AssetsHomeTableView state={state}
                               actions={actions}
                               Content={generateContent(IsPledgeSelected, FetchedHomeAssetData, HomeWidgetSideExpanded)}
                               cellWidth={cellWidth}
                               TableStyle={TableStyles.HomeTableStyle}/>
        }

      </PanelWindow>
      <div className={styles.panelResizeHandle}
           onClick={() => {
             actions.HomePanel_ToggleVerticalExpand(!ExpandedVertically)
           }}>
        &#9650;  &#9660;
      </div>

    </div>
  )
}

export default AssetsHomeComponent
