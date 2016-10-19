import React from 'react'
import ReactDOM from 'react-dom'

import HelloWorld from './components/sample-component/sample-component'
import Table from './components/table/table'

class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <HelloWorld />
                <Table />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))

