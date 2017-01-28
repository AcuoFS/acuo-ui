import React from 'react'
import styles from '../FilterBar.css'

const DropdownMenu = (props) => {
    const {handleOnSelectChange, options} = props

    // handleLocalOptionChange
    const handleLocalOptionChange = (e, label, value = '') => {
      e.preventDefault()
      handleOnSelectChange({
        label,
        value,
      })
    }

    return (
      <ul className={styles.filtersList}>
        <li onClick={e => handleLocalOptionChange(e, 'ALL')}>
          ALL
        </li>

        {options.map(option => (
          <li key={option}
              onClick={e => handleLocalOptionChange(e, option.toUpperCase(), option)}>
            {option.toUpperCase()}
          </li>
        ))}
      </ul>
    )
  }

export default DropdownMenu
