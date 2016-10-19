import React from 'react'
import ReactDOM from 'react-dom'

import styles from './global.css'

import HelloWorld from './components/sample-component/sample-component'
import Table from './components/table/table-component'
import Nav from './components/navbar/navbar'


class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className={styles.globalStyles}>
                <Nav />
                <HelloWorld />
                <Table />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))

