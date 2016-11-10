/**
 * Created by achalkagwad on 9/11/16.
 */
import React from 'react'

export default class ActionLineItemExpand extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            expand: "./images/reconcile/plus.png"
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        if(this.state.open){
            this.setState({
                open: false,
                expand: "./images/reconcile/plus.png"
            })
        }else {
            this.setState({
                open: true,
                expand: "./images/reconcile/minus.png"
            });
        }
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <img src={this.state.expand} alt=""/>
                {/* have second level table rendering structure here */}
            </div>
        )
    }

}

