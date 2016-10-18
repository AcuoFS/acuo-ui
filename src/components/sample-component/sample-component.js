import React from 'react'
import styles from './sample-style.css'

import SubComponent from './sample-subcomponent/sub-component'

class HelloWorld extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className={styles.helloWorld}>
                Hello World!
                <SubComponent/>
            </div>
        )
    }
}

export default HelloWorld