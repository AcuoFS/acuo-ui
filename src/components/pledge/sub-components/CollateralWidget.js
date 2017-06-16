import React from 'react';
import PropTypes from 'prop-types'
import CollateralAssetGroup from './CollateralAssetGroup'
import {COLLATERAL_URL} from '../../../constants/APIcalls'
import _ from 'lodash'
import {fromJS} from 'immutable'
import {filterByAllPropertiesOfObj} from '../../../utils'
import styles from '../Pledge.css'
import selfStyles from './CollateralWidget.css'

export default class CollateralWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filterText: ''
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  componentWillMount() {
    if (_.isEmpty(this.props.collateral)) {
      fetch(COLLATERAL_URL).then((response) => {
        return response.json()
      }).then((obj) => {
        this.props.onCollateralDataAvailable(fromJS(obj.items))
      })
    }
  }

  handleFilterChange(value) {
    this.setState({
      filterText: value
    })
  }

  getAdditionalColumns(listOfNames , sortColumnBy, collateralSortedBy) {

    const headerType = (columnName, i) => {
     if(/*columnName!=='Internal Cost (bps)' && columnName!=='Opportunity Cost (bps)'*/ true){
      return(
       <div className={styles.collateralCell} key={i}>

        <div className={styles.collateralHeaderCell + ' ' + ( collateralSortedBy==columnName? styles.sortedBy : '')}
              onClick={e=>{ sortColumnBy(columnName) }}>
              {columnName}
        </div>

       </div> )
     }
     else {return <div className={styles.collateralCell} key={i}> {columnName} </div>}
    }//End-headerType()

    return _.map( listOfNames,
                  (columnName, i) => headerType(columnName, i) )
  }

  /**
   * Function that filters(all properties of asset) and
   * creates a list of group components for rendering
   *
   * @param collateralJSList
   * @param collateralAssetGroupList
   * @param open
   * @param onRemoveFromEarmarked
   * @returns {*}
   */
  createAssetGrpCompList(collateralJSList, open, onRemoveFromEarmarked, filterText) {
    let collateralAssetGroupList = [];
    let newCollateralObj = {}

    _.forOwn(collateralJSList, (value, key) => {
      newCollateralObj = Object.assign(
        {},
        newCollateralObj,
        {[key]: filterByAllPropertiesOfObj(value, filterText)}
      )
    })

    _.forOwn(newCollateralObj, (value, key) => {
      collateralAssetGroupList = [...collateralAssetGroupList,
        <CollateralAssetGroup key={key}
                              propCollateralType={key}
                              propCollateralAssetList={value}
                              propIsExpanded={true}
                              propIsDisplayAll={open}
                              propHandleOnRemoveFromEarmarked={onRemoveFromEarmarked} />
      ]
    })

    return collateralAssetGroupList
  }

  /**
   * Fields:
   * asset.assetName
   * asset.price
   * asset.ccy
   * asset.deliveryTime
   * asset.status
   * asset.rating
   * asset.maturityDate
   * asset.internalCostPct
   * asset.externalCostPct
   * asset.oppCostPct
   * asset.assetId
   * asset.venue
   * asset.acctId
   * asset.assetId
   * asset.assetIdType
   * @param collateralList
   * @param filterText
   */
  // filterByAllProperties(collateralList, filterText) {
  //   return _.filter(collateralList,
  //     o => {
  //       let isAnyPropertyMatches = false
  //
  //       // Check for all properties
  //       _.forOwn(o, (value) => {
  //         isAnyPropertyMatches = _.toUpper(String(value)).match(new RegExp(_.toUpper(filterText)))
  //
  //         // Stop iteration if matches; return false to stop
  //         return !isAnyPropertyMatches
  //       })
  //
  //       // Include into filteredList when any property matches
  //       return isAnyPropertyMatches
  //     })
  // }

  shouldComponentUpdate(nextProps){
   return !_.isEqual(this.props, nextProps)
  }

  render() {
    const {
      toggleColwidthR,
      sideways,
      open,
      collateral,
      changeSideways,
      onRemoveFromEarmarked,
      sortColumnBy,
      sortedCollateral,
      collateralSortedBy
    } = this.props

    return (
      <div className={styles.col_R + ' ' + toggleColwidthR}>
        <div className={styles.panel}>
          <div className={styles.panelTitle}>Collateral
            <input type="text" placeholder="Search" className={selfStyles.searchInput}
                   value={this.state.filterText}
                   onChange={(e) => this.handleFilterChange(e.target.value)}/>
            <img src={sideways} className={styles.imageRight} onClick={changeSideways}/>
          </div>

          <div className={styles.collateralTable}>

            <div className={styles.collateralRow + ' ' + styles.collateralHeader + ' ' + styles.collateralTableExpanded}>
              <div className={styles.collateralCell}>
               <span className={styles.collateralHeaderCell + ' ' + ( collateralSortedBy=="assetName"? styles.sortedBy : '')} onClick={e=>sortColumnBy("assetName")}>Asset</span>
              </div>
              <div className={styles.collateralCell}>
               <span className={styles.collateralHeaderCell + ' ' + ( collateralSortedBy=="price"? styles.sortedBy : '')} onClick={e=>sortColumnBy("price")}>Total Value</span>
              </div>
              <div className={styles.collateralCell}>
                <span className={styles.collateralHeaderCell + ' ' + ( collateralSortedBy=="ccy"? styles.sortedBy : '')} onClick={e=>sortColumnBy("ccy")}>CCY</span>
              </div>
              <div className={styles.collateralCell}>
                Delivery Time
              </div>
              <div className={styles.collateralCell}>
                <span className={styles.collateralHeaderCell + ' ' + ( collateralSortedBy=="status"? styles.sortedBy : '')} onClick={e=>sortColumnBy("status")}>Status</span>
              </div>
              <div className={styles.collateralCell}>
                <span className={styles.collateralHeaderCell + ' ' + ( collateralSortedBy=="rating"? styles.sortedBy : '')} onClick={e=>sortColumnBy("rating")}>Rating</span>
              </div>
              <div className={styles.collateralCell}>
                <div className={styles.collateralHeaderCell + ' ' + ( collateralSortedBy=="maturityDate"? styles.sortedBy : '')} onClick={e=>sortColumnBy("maturityDate")}>Maturity Date</div>
              </div>
              {
                open && this.getAdditionalColumns(
                  [
                    'Internal Cost (bps)',
                    'Opportunity Cost (bps)',
                    'ISIN',
                    'Venue',
                    'Acc ID'
                  ], sortColumnBy, collateralSortedBy)
              }
            </div>

            {
              collateral &&
              this.createAssetGrpCompList(
               collateral,
               open,
               onRemoveFromEarmarked,
               this.state.filterText)
            }

          </div>

        </div>
      </div>

    )
  }
}

CollateralWidget.PropTypes = {
  toggleColwidthR: PropTypes.object.isRequired,
  sideways: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  collateral: PropTypes.object.isRequired,
  changeSideways: PropTypes.func.isRequired,
  onRemoveFromEarmarked: PropTypes.func.isRequired
}
