import React from 'react'
import TableHead from './sub-components/TableHead'


export default class Table extends React.Component{
    constructor(props){
        super(props)
        this.getDeriv = this.getDeriv.bind(this)
    }
    renderTable(deriv){
        return (<TableHead key={deriv.get('type')} deriv={deriv}/>)
    }
    getDeriv(){
        return this.props.derivatives || []
    }
    render() {
        return (
          <div>
              {this.getDeriv().map(this.renderTable)}
          </div>
        );
    }
}