import React from 'react'
import styles from '../FilterBar.css'
import { derivTypeMapping } from './../../../utils'

export default class DropdownMenu extends React.Component{

  render(){
    const {handleOnOptionChange, options} = this.props
    // merge option 'ALL', with actual options
    const optionList = ['All', ...options]
    return(
      <ul className={styles.filtersList}>
        {optionList.map(option => (
          <li key={option}
              data-ref={option}
              onClick={ e => handleOnOptionChange(e, option)}>
            {derivTypeMapping(String(option)).toUpperCase()}
          </li>
        ))}
      </ul>
    )
  }
}
