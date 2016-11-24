/**
 * Created by panyong on 22/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import styles from '../Pledge.css'

class OptItem extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.optItem}>
                <div className={styles.optItemName}>{this.props.sldName}</div>
                <div className={styles.optItemSlider}>
                    <div className={styles.sliderUnit}>

                    </div>
                    <div className={styles.sliderLine}>
                        <div className={styles.sliderLineFill}></div>
                    </div>
                    <div className={styles.sliderHandle}></div>
                </div>
            </div>
        )
    }
}

export default OptItem