/**
 * Created by panyong on 22/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import styles from '../Pledge.css'

class ChooseCalls extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkbox: "./images/pledge/checkbox.png",
            cbTicked: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        if(this.state.cbTicked){
            this.setState({
                cbTicked: false,
                checkbox: "./images/pledge/checkbox.png"
            })
        }else {
            this.setState({
                cbTicked: true,
                checkbox: "./images/pledge/checkboxwithtick.png"
            });
        }
    }

    render() {
        return(
            <div className={styles.chsCalls}>
                Choose Calls:
                <img className={styles.tick} src={this.state.checkbox} onClick={this.handleClick}></img>
                None
            </div>
        )
    }
}

export default ChooseCalls