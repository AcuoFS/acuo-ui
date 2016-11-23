import React, { PropTypes } from 'react'
import styles from '../Table.css'


class TableCell extends React.Component {
    render() {
        const {bodyItemClass, cellValue} = this.props
        return (
            <div className={styles[bodyItemClass]}>
                <div className={styles.vertiCenter}>
                    <div className={styles.centerThis}>{cellValue}</div>
                </div>
            </div>
        )
    }
}

TableCell.propTypes = {
    bodyItemClass : PropTypes.string.isRequired,
    cellValue: PropTypes.string.isRequired
}

export default TableCell