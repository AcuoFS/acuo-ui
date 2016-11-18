import React, { PropTypes } from 'react'
import styles from '../Table.css'


class TableCell extends React.Component {
    render() {
        return (
            <div className={styles[this.props.bodyItemClass]}>
                <div className={styles.vertiCenter}>
                    <div className={styles.centerThis}>{this.props.cellValue}</div>
                </div>
            </div>
        )
    }
}

TableCell.propTypes = {
    bodyItemClass : React.PropTypes.string.isRequired,
    cellValue: React.PropTypes.string.isRequired
}

export default TableCell