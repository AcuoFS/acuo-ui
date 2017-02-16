import React, { PropTypes } from 'react'
import styles from '../Table.css'


class TableCell extends React.Component {
  render() {
    const {cellValue} = this.props
    return (
      <div>
        <div className={styles.vertiCenter}>
          <div className={styles.centerThis}>{cellValue}</div>
        </div>
      </div>
    )
  }
}

TableCell.PropTypes = {
  bodyItemClass: PropTypes.string.isRequired,
  cellValue: PropTypes.string
}

TableCell.DefaultProps = {
  cellValue: ""
}

export default TableCell