import React, {PropTypes} from 'react'
import styles from './SelectionBox.css'


const SelectionBox = ({propListOfItems, propOnRemoveItem}) => {
  return (
    <ul className={styles.listContainer}>
      {
        propListOfItems.map((item, index) => (
          <li key={index}
              onClick={propOnRemoveItem && (() => propOnRemoveItem(item))}
              className={styles.listItem}>
            {item}
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