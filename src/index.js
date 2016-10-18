import React from 'react'
import ReactDOM from 'react-dom'

import HelloWorld from './components/sample-component/sample-component'

class AppThisLOL extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <HelloWorld />
            </div>
        )
    }
}

ReactDOM.render(<AppThisLOL />, document.getElementById('app'))