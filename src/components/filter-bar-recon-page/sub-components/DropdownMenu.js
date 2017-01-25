import React from 'react'
import styles from '../FilterBar.css'

const DropdownMenu = (props) => {
    const {handleOnSelectChange, options} = props

    // merge option 'ALL', with actual options
    const optionList = ['all', ...options].map(text => String(text).toUpperCase())

    // handleLocalOptionChange
    const handleLocalOptionChange = (e, option) => {
      e.stopPropagation()
      handleOnSelectChange(option)
    }

    return (
      <ul className={styles.filtersList}>
        {optionList.map(option => (
          <li key={option}
              onClick={e => handleLocalOptionChange(e, option)}>
            {option}
          </li>
        ))}
      </ul>
    )
  }

export default DropdownMenu
