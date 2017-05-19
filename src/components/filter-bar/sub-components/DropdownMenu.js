import React from 'react'
import styles from '../FilterBar.css'

export default class DropdownMenu extends React.Component{

  render(){
    const {handleOnOptionChange, options} = this.props
    // merge option 'ALL', with actual options
    const optionList = ['All', ...options]
    console.log(optionList)
    return(
      <ul className={styles.filtersList}>
        {optionList.map(option => (
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
