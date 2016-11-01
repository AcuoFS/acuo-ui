import React from 'react'
import styles from './sample-style.css' //use like an object

import SubComponent from './sample-subcomponent/sub-component'

class HelloWorld extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className={styles.helloWorld}>
                <p>Hello World!</p>
                <SubComponent/>
            </div>
        )
    }
}

export default HelloWorld