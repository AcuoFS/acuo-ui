/**
 * Created by panyong on 22/11/16.
 */
import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../../action_creators'

import stylesG from '../../global.css'
import { NavContainer } from '../../components/shared/navbar/navbar'
import PledgeContainer from '../../components/pledge/pledgeContainer/pledgeContainer'


class Pledge extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <div className={stylesG.globalStyles}>
                <NavContainer curPage={this.props.location.pathname}/>
                <PledgeContainer />
            </div>
        )
    }
}

export default Pledge