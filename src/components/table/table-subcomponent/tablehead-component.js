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
        nonopen:styles.sectionOpen,
        class: styles.sectionClose,
        dropdown: "./images/dashboard/table/Droplist(down).png"
      })
    }else{
      this.setState({
        open: true,
        nonopen:styles.sectionClose,
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
                   arrow={this.state.dropdown}/>
      </div>
        // <table>
        //   <thead>
        //     <tr className={styles.head}>
        //       <th>{this.props.marginType}</th>
        //       <th>CPTY Margin</th>
        //       <th>Region</th>
        //       <th>CCY</th>
        //       <th>EXP.Margin</th>
        //       <th>
        //         <div className={styles.actionHeader}>
        //           <div className={styles.action}>
        //             <div className={styles.items}>5 ACTION ITEMS</div>
        //           </div>
        //           <div className={styles.arrowRight}></div>
        //         </div>
        //       </th>
        //       <th>
        //         <button onClick={this.handleClick}>Toggle</button>
        //       </th>
        //     </tr>
        //   </thead>
        //   <TableBody status={this.state.class}/>
        // </table>
    )
  }
};

export default TableHead
