/**
 * Created by panyong on 22/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import styles from '../Pledge.css'

class ChooseCalls extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={styles.chsCalls}>
                Choose Calls:
                <img className={styles.tick} src={this.props.tickImg} onClick={this.props.tickClick} />
                <span className={styles.chsCallsText}>{this.props.tickState}</span>
            </div>
        )
    }
}

export default ChooseCalls