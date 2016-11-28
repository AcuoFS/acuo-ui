import React from 'react'
import styles from './FilterBar.css'

export default class DropdownMenu extends React.Component{

  render(){
    const {handleOnOptionChange, option} = this.props
    // merge option 'ALL', with actual options
    const options = [[], 'All', ...option]

    return(
      <ul className={styles.filtersList}>
        {options.map(option => (
          <li key={option}
              data-ref={option}
              onClick={ e => handleOnOptionChange(e, option)}>
            {String(option).toUpperCase()}
          </li>
        ))}
      </ul>
    )
  }
}
