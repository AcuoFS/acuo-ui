import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './NavigationBar.css'


class NavigationBarItem extends React.Component{
    render(){
        return (
            <div className={styles.pageTitle}>
                <div className={styles.vertiCenter}>
                    <div className={styles.centerThis}>
                        <Link to={this.props.toUrl}>
                            <div className={styles.menuItem}>
                                <div className={styles.vertiCenter}>
                                    <p className={styles.centerThis
                                            + (this.props.selected ? ' ' + styles.boldThis : '')}>
                                        {this.props.label}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

NavigationBarItem.propTypes = {
    toUrl : React.PropTypes.string.isRequired,
    label : React.PropTypes.string.isRequired,
    selected : React.PropTypes.bool
}

NavigationBarItem.defaultProps = {
    selected : false
}

export default NavigationBarItem