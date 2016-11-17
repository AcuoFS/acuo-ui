/**
 * Created by achalkagwad on 9/11/16.
 */
import React from 'react'
import styles from './MarginAgreementList.css'
import MarginAgreementDetailExpand from './MarginAgreementDetailExpand'


export default class MarginAgreementDetail extends React.Component {
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
    render(){
        return(
        <div>
            <div className={styles.packageRow}> {/* one row div*/}
                <div className={styles.packageLeft}>
                    <div className={styles.packageCheckBox+' '+this.state.cbLvl1} onClick={this.handleClick}>
                        <img src={this.state.checkbox} alt=""/>
                    </div>
                    <div className={styles.packageText}>Net Total IM</div>
                    <MarginAgreementDetailExpand doClick={this.handlePlusMinus} image={this.state.expand}/>
                </div>
                <div className={styles.packageRight}> 15,586,933</div>
            </div>

            <div className={styles.packageLvl2+' '+this.state.pkgLvl2}>

                {/* have second level table rendering structure here */}
                <div className={styles.packageRow}>
                    <div className={styles.packageLeft}>
                        <div className={styles.packageCheckBox} onClick={this.handleClick}>
                            <img src={this.state.checkbox} alt=""/>
                        </div>
                        <div className={styles.packageText}>asda adqwewqer rewr</div>
                    </div>
                    <div className={styles.packageRight}> XX,XXX,XXX</div>
                </div>

            </div>
        </div>
        )
    }
}

// <div className={styles.packageRow}> {/* one row div*/}
//     <div className={styles.packageLeft}>
//         <div className={styles.packageCheckBox} onClick={this.handleClick}>
//             <img src={this.state.checkbox} alt=""/>
//         </div>
//         <div className={styles.packageText}>
//             Net Total IM
//         </div>
//         <div className={styles.packageExpand}> + </div>
//     </div>
//     <div className={styles.packageRight}> 15,586,933</div>
// </div>
