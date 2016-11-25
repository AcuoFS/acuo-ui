/**
 * Created by achalkagwad on 9/11/16.
 */
import React from 'react'
import styles from './actions.css'
export default class ActionLineItemExpand extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div onClick={this.props.doClick}>
                <img className={styles.expandPackage} src={this.props.image} alt=""/>
            </div>
        )
    }
}
