import React from 'react'
import TableHead from './sub-components/TableHead'
import styles from './Table.css'
import _ from 'lodash'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
  }

  renderTable(redirect, onLineItemClick, derivatives) {
    return _.map(derivatives, (derivative, index) =>
      <TableHead key={index} deriv={derivative} redirect={redirect} onLineItemClick={onLineItemClick}/>
    )
  }

  render() {
    const { redirect, onLineItemClick, derivatives } = this.props
    return (
      <div className={styles.tableComponent}>
        {this.renderTable(redirect, onLineItemClick, derivatives)}
      </div>
    )
  }

}
