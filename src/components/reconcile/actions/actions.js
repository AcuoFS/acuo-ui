/**
 * Created by panyong on 4/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import styles from './actions.css'


class Actions extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div className={styles.actionContainer}>
                <div className={styles.actionWrap}>
                    <div className={styles.actPanel+' '+styles.act_L}>
                        <div className={styles.panel}>
                            {/*Left panel content goes here*/}
                        </div>
                    </div>

                    <div className={styles.actPanel+' '+styles.act_C}>
                        {/*Action button goes here*/}
                        <div className={styles.btnWrap}>
                            <div className={styles.actFig}>95%</div>
                            <div className={styles.actBtn+' '+styles.actBtnOrange}>OK</div>
                        </div>
                    </div>

                    <div className={styles.actPanel+' '+styles.act_R}>
                        <div className={styles.panel}>
                            {/*Right panel content goes here*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Actions