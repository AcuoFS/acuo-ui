/**
 * Created by achalkagwad on 9/11/16.
 */
import React from 'react'
import styles from './actions.css'
import {connect} from 'react-redux'
import ActionLineItemExpand from './actionlineitemexpand-component.js'
import * as actionCreators from '../../../action_creators'

export default class ActionLineItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            expand: "./images/reconcile/plus.png",
            checkbox: "./images/reconcile/checkbox.png",
            cbTicked: false,
            cbLvl1: styles.show,
            pkgLvl2: styles.hide
        }
        this.handleClick = this.handleClick.bind(this)
        this.handlePlusMinus = this.handlePlusMinus.bind(this)
        this.firstLevelSelect = this.firstLevelSelect.bind(this)
        this.checkSecondLevelSelections = this.checkSecondLevelSelections.bind(this)
    }

    sendAction(i, j){
      this.props.selectedItems(i,j)
    }

    handleClick(){
        if(this.state.cbTicked){
            this.setState({
                cbTicked: false,
                checkbox: "./images/reconcile/checkbox.png"
            })
        }else {
            this.setState({
                cbTicked: true,
                checkbox: "./images/reconcile/checkboxwithtick.png"
            });
        }
    }

    numberWithCommas(x) {
      x = x.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
      return x;
    }

    handlePlusMinus(){
        if(this.state.open){
            this.setState({
                open: false,
                expand: "./images/reconcile/plus.png",
                cbLvl1: styles.show,
                pkgLvl2: styles.hide
            })
        }else {
            this.setState({
                open: true,
                expand: "./images/reconcile/minus.png",
                cbLvl1: styles.hide,
                pkgLvl2: styles.show
            })
        }
    }

    renderHidden(){
      return this.props.secondLevel.map((x) => {
        return (
          <div className={styles.packageLvl2+' '+this.state.pkgLvl2} key={Date.now() * Math.random()}>
            {/* have second level table rendering structure here */}
            <div className={styles.packageRow}>
              <div className={styles.packageLeft}>
                <div className={styles.packageCheckBox} onClick={(e) => {this.handleClick(e);this.sendAction(this.props.GUID, x.get('assetName'))}}>
                  {x.get('recon') ? '' : <img src={x.get('checked') ? "./images/reconcile/checkboxwithtick.png" : "./images/reconcile/checkbox.png"} alt=""/>}
                </div>
                <div className={styles.packageText}>{ x.get('assetName') }</div>
              </div>
              <div className={styles.packageRight}>{ this.numberWithCommas(x.get('amount')) }</div>
            </div>
          </div>
        )
      })
    }

  firstLevelSelect(){
    this.props.secondLevel.map(x =>(
      this.props.selectedItems(this.props.GUID, x.get('assetName'))))
  }

  checkSecondLevelSelections(){
    if(this.props.secondLevel.size <= this.props.secondLevel.reduce((count, x) => {
      return count + (x.get('checked') ? 1 : 0)}, 0)){
      return "./images/reconcile/checkboxwithtick.png"
    }else{
      return "./images/reconcile/checkbox.png"
    }
  }
  reconSecondLevelSelections(){
    if(this.props.secondLevel.size <= this.props.secondLevel.reduce((count, x) => {
      return count + (x.get('recon') ? 1 : 0)}, 0))
      {
        return false
      }else{
        return true
      }
    }

    render(){
        return(
        <div>
            <div className={styles.packageRow}> {/* one row div*/}
                <div className={styles.packageLeft}>
                    <div className={styles.packageCheckBox+' '+this.state.cbLvl1} onClick={this.firstLevelSelect}>
                        {!this.reconSecondLevelSelections() ? '' : <img src={this.checkSecondLevelSelections()} />}
                    </div>
                    <div className={styles.packageText}>{this.props.topLevel}</div>
                    <ActionLineItemExpand doClick={this.handlePlusMinus} image={this.state.expand}/>
                </div>
                <div className={styles.packageRight}>{this.numberWithCommas(this.props.totalAmount)}</div>
            </div>
            {this.renderHidden()}
        </div>
        )
    }
}
function mapStateToProps(state){
  return{
    recon : state.getIn(['display', 'derivatives'])
  }
}
export const ActionLineItemContainer = connect(mapStateToProps, actionCreators)(ActionLineItem)
