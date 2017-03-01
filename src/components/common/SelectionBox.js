import React, {PropTypes} from 'react'
import styles from './SelectionBox.css'


const SelectionBox = ({propListOfItems, propOnRemoveItem}) => {
  return (
    <ul className={styles.listContainer}>
      {
        propListOfItems.map((item, index) => (
          <li key={index}
              className={styles.listItem}>
            {item}
            <button className={styles.removeBtnStyle}
                    onClick={propOnRemoveItem && (() => propOnRemoveItem(item))}>
              Remove
            </button>
          </li>
        ))
      }
    </ul>
  )
}

SelectionBox.PropTypes = {
  propListOfItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  propOnRemoveItem: PropTypes.func
}

export default SelectionBox