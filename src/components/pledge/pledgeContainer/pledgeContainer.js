/**
 * Created by panyong on 22/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import styles from './pledgeContainer.css'
import OptItem from './optItem'
import ChooseCalls from './chooseCalls'

class PledgeContainer extends React.Component{
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div className={styles.pledgeContainer}>
                <div className={styles.panel} id={styles.optSetting}>
                    <div className={styles.panelTitle}>Optimization Setting</div>
                    <div className={styles.optPnlWrap}>
                        <OptItem sldName="Operations"/>
                        <OptItem sldName="Liquidity"/>
                        <OptItem sldName="Cost"/>
                        <OptItem sldName="Haircut"/>
                    </div>
                    <ChooseCalls />
                    <div className={styles.optButton} id={styles.optBtnAllocate}>Allocate</div>
                    <div className={styles.optButton + ' ' +styles.btnEnabled} id={styles.optBtnPledge}>Pledge</div> {/* change btnEnabled to btnDisabled to disable the button*/}
                </div>
                <div className={styles.panel} id={styles.pleStatus}>
                    <div className={styles.panelTitle}>Pledge Status</div>
                </div>

                <div className={styles.secDivider}></div>

                <div>
                    <div className={styles.col_L}>
                        <div className={styles.panel}>
                            <div className={styles.panelTitle}>Abc Securities FCM</div>
                        </div>
                        <div className={styles.panel}>
                            <div className={styles.panelTitle}>Abc Securities FCM</div>
                        </div>
                        <div className={styles.panel}>
                            <div className={styles.panelTitle}>Abc Securities FCM</div>
                        </div>
                    </div>

                    <div className={styles.col_R}>
                        <div className={styles.panel}>
                            <div className={styles.panelTitle}>Collateral</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default PledgeContainer