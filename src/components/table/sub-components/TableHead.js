import React from 'react'
import TableItem from './TableItem'
import styles from '../Table.css'

class TableHead extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open: false,
      class: styles.sectionClose,
      dropdown: "./images/dashboard/table/Droplist(down).png"
    }
    this.handleClick = this.handleClick.bind(this);

  }
  handleClick(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: styles.sectionClose,
        dropdown: "./images/dashboard/table/Droplist(down).png"
      })
    }else{
      this.setState({
        open: true,
        class: styles.sectionOpen,
        dropdown: "./images/dashboard/table/Droplist(up).png"
      })
    }
  }

  render() {
    const { onLineItemClick, deriv, redirect } = this.props
    return (
      <div className={styles.tableWrapper}>
        <TableItem clicked={this.handleClick}
                   toggle={this.state.class}
                   arrow={this.state.dropdown}
                   deriv={deriv}
                   redirect={redirect}
                   onLineItemClick={onLineItemClick}/>
      </div>
    )
  }
}

export default TableHead
