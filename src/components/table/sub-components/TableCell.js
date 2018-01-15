import React from 'react';
import PropTypes from 'prop-types'
import styles from '../Table.css'

class TableCell extends React.Component {
  render() {
    const {cellValue} = this.props
    return (
      <div className={styles.cellHolder}>
        <div className={styles.cell}>
          {cellValue}
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