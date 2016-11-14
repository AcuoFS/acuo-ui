/**
 * Created by achalkagwad on 9/11/16.
 */
import React from 'react'
import styles from './actions.css'
import ActionLineItemExpand from './actionlineitemexpand-component.js'

export default class ActionLineItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            checkbox: "./images/reconcile/checkbox.png"
        }
        this.handleClick = this.handleClick.bind(this)

    }
    handleClick(){
        if(this.state.open){
            this.setState({
                open: false,
                checkbox: "./images/reconcile/checkbox.png"
            })
        }else {
            this.setState({
                open: true,
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
    render(){
        return(
        <div className={styles.packageRow}> {/* one row div*/}
            <div className={styles.packageLeft}>
                <div className={styles.packageCheckBox} onClick={this.handleClick}>
                    <img src={this.state.checkbox} alt=""/>
                </div>
                <div className={styles.packageText}>{this.props.topLevel}</div>
                <ActionLineItemExpand/>
            </div>
            <div className={styles.packageRight}>{this.numberWithCommas(this.props.totalAmount)}</div>
        </div>
        )
    }
}
