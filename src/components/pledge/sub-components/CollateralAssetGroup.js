import React, {PropTypes} from 'react'
import CollateralAssetContainer from '../../../containers/CollateralAssetContainer'
import {formatDate} from '../../../utils/formatDate'
import {checkNegative} from '../../../utils'
import {COLLATERAL_EARMARKED} from '../../../constants/CollateralTypes'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import _ from 'lodash'
import styles from '../Pledge.css'
import transitions from './CAGTransitions.css'


export default class CollateralAssetGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isGroupExpanded: props.propIsExpanded
    }

    this.handlePlusMinus = this.handlePlusMinus.bind(this)
  }

  getPlusMinusImgURL(isExpanded) {
    if (isExpanded) {
      return './images/common/minusbox.png'
    } else {
      return './images/common/plusbox.png'
    }
  }

  handlePlusMinus() {
    this.setState({
      isGroupExpanded: !this.state.isGroupExpanded
    })
  }

  /**
   * Create the number(11/6) of empty cells for group header
   *
   * @param propIsDisplayAll
   * @returns {Array}
   */
  getEmptyCellDomList(propIsDisplayAll) {
    // no of empty cells and list of divs
    let emptyCellList = []

    _.times((propIsDisplayAll ? 11 : 6), (i) => {
      emptyCellList = [...emptyCellList,
        <div className={styles.collateralCell} key={i}></div>]
    })

    return emptyCellList
  }

  render() {
    const {
      propCollateralType,
      propCollateralAssetList,
      propIsDisplayAll,
      propHandleOnRemoveFromEarmarked
    } = this.props

    const groupHeaderStyle = (propCollateralType == COLLATERAL_EARMARKED) ? styles.collateralExpandEarmarkedRow : styles.collateralExpandRow

    // []list of CollateralAsset components
    let componentList
    if (propCollateralAssetList && this.state.isGroupExpanded) {
      componentList = propCollateralAssetList.map((asset, index) => (
        <CollateralAssetContainer
          key={index}
          rowStyle={"tableRow"}
          propAsset={asset.assetName || '-'}
          propPrice={checkNegative(asset.price)}
          rawPrice={asset.price || '-'}
          propCcy={asset.ccy || '-'}
          propDeliveryTime={asset.deliveryTime || '-'}
          propStatus={asset.status || '-'}
          propRating={asset.rating || '-'}
          propMaturityDate={asset.maturityDate ? formatDate(asset.maturityDate) : '-'}
          propInternalCost={asset.internalCostPct || '-'}
          propExternalCost={asset.externalCostPct || '-'}
          propOppCost={asset.oppCostPct || '-'}
          propIsin={asset.assetId || '-'}
          propVenue={asset.venue || '-'}
          propAcctId={asset.acctId || '-'}
          propIsDisplayAll={propIsDisplayAll}
          propCollateralType={propCollateralType}
          propAssetId={asset.assetId || '-'}
          propAssetIdType={asset.assetIdType || '-'}
          propHandleOnRemoveFromEarmarked={propHandleOnRemoveFromEarmarked}
        />
      ))
    }

    return (
      <ReactCSSTransitionGroup component="div" className={styles.collateralRowGroup}
                               transitionName={transitions}
                               transitionEnterTimeout={500}
                               transitionLeaveTimeout={300}>
        <div className={styles.collateralRow + ' ' + groupHeaderStyle}>
          <div className={styles.collateralCell}>
            <div>{propCollateralType}</div>
            {
              (propCollateralAssetList.length > 0) &&
              <div onClick={this.handlePlusMinus}>
                <img src={this.getPlusMinusImgURL(this.state.isGroupExpanded)} alt=""
                     className={styles.cursorPointer}/>
              </div>
            }
          </div>
          {this.getEmptyCellDomList(propIsDisplayAll)}
        </div>

        {componentList}

      </ReactCSSTransitionGroup>
    )
  }
}

CollateralAssetGroup.PropTypes = {
  propCollateralType: PropTypes.string.isRequired,
  propIsExpanded: PropTypes.bool.isRequired,
  propCollateralAssetList: PropTypes.array
}

CollateralAssetGroup.defaultProps = {
  propCollateralAssetList: []
}
