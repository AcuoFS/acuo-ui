/**
 * Created by Rui on 21/12/16.
 *
 * modified by Hz on 2017-0113
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!
 * PLEASE REVISE THIS Component
 *!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
import React from 'react'
import data from '../../data/data'
import MarginCallRow from './MarginCallRow'

export default (props) => {
  return <div>
    {data.map((item, idx) => <MarginCallRow key={idx} row={item} {...props} />)}
  </div>
}
