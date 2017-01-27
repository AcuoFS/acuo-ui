import React from 'react'
import styles from '../FilterBar.css'

const DropdownMenu = (props) => {
    const {handleOnSelectChange, options} = props

    // merge option 'ALL', with actual options
    const optionList = ['all', ...options]

    // handleLocalOptionChange
    const handleLocalOptionChange = (e, option) => {
      e.preventDefault()
      handleOnSelectChange(option)
    }

    return (
      <ul className={styles.filtersList}>
        {optionList.map(option => (
          <li key={option}
              onClick={e => handleLocalOptionChange(e, option)}>
            {option.toUpperCase()}
          </li>
        ))}
      </ul>
    )
  }

export default DropdownMenu
