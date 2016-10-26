import React from 'react'

import styles from '../table.css'
// import TableBody from './tablebody-component.js'
import TableItem from './tableitem-component.js'

class TableHead extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open: false,
      nonopen:styles.sectionOpen,
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
      });
    }
  }
  render() {
    return (
      <div>
        <TableItem status={this.props.marginType}
                   clicked={this.handleClick}
                   toggle={this.state.class}
                   arrow={this.state.dropdown}
                    deriv={this.props.deriv}/>
      </div>
    )
  }
};

export default TableHead
