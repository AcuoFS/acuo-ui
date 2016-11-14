/**
 * Created by achalkagwad on 9/11/16.
 */
import React from 'react'


export default class ActionLineItemExpand extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        return (
            <div onClick={this.props.doClick}>
                <img src={this.props.image} alt=""/>
            </div>
        )
    }

}

