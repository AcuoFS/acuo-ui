/**
 * Created by panyong on 2/11/16.
 */
import React from 'react'

import styles from './upload_portfolio.css'

class UploadPortfolio extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            clicked: false,
            uploadDropdown: styles.close
        }
        this.clickedDropdown = this.clickedDropdown.bind(this)
    }
    clickedDropdown(){
        if(!this.state.clicked){
            this.setState({
                clicked: !this.state.clicked,
                uploadDropdown: styles.open
            })
        }else{
            this.setState({
                clicked: !this.state.clicked,
                uploadDropdown: styles.close
            })
        }
    }
    render(){
        return(
            <div className={styles.titleBar}>
                <div className={styles.uploadPortfolio}>
                    <div className={styles.uploadButtonVertiCenter}>
                        <form className={styles.centerThis} action="" onSubmit="">
                            <div className={styles.dropdown} onClick={this.clickedDropdown}>
                                <div className={styles.text}>upload portfolio</div>
                                <div className={styles.arrow}>
                                    <img src={'./images/dashboard/upload_portfolio/arrow_up.png'} alt=""/>
                                </div>

                                <ul className={styles.dropdownList + ' ' + this.state.uploadDropdown}>
                                    <li>item1</li>
                                    <li>item1</li>
                                    <li>item1</li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default UploadPortfolio