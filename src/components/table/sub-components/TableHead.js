import React from 'react'
import TableItem from './TableItem'
import styles from '../Table.css'


class TableHead extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open: true,
      class: styles.sectionOpen,
      dropdown: "./images/dashboard/table/Droplist(up).png"
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
    return (
      <div className={styles.tableWrapper}>
        <TableItem status={this.props.marginType}
                   clicked={this.handleClick}
                   toggle={this.state.class}
                   arrow={this.state.dropdown}
                    deriv={this.props.deriv}
                    redirect={this.props.redirect}/>
      </div>
    )
  }
}

export default TableHead
