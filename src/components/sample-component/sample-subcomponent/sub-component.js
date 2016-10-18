import React from 'react'

import styles from '../sample-style.css'

class SubComponent extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className={styles.subComponentStyle}>
                This is my sub component
            </div>
        )
    }
}

export default SubComponent