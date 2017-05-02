import React from 'react'
import styles from './AssetsHomeTableView.css'
import NavBar from "./../Navbar.js"
import Table from './../tableUI/tableUI.js'
// import tableStyle from '../TableUI/TableUI.css'

// const RowGroupStyle = { className: `${tableStyle.RowGroup}`}
// const PrincipalHeadContent = ['Asset', 'Firm', 'Quantity', 'Value', 'Rating', 'Maturity Date', 'Int. Cost', 'Opp. Cost', 'Custodian', 'Region']
// const PrincipalPledgeHeadStyle_Expand = {
//  className: `${tableStyle.Row} ${tableStyle.PrincipalPledgeHead}`,
//  width: null,
//  height: 24,
//  rowSpan: 1
// }

export default class AssetsHomeTableView extends React.Component{
  render(){
   return(
    <div className={styles.tableView}>


    </div>
   )
  }
}
// export default class AssetsHomeTableView extends React.Component{
//   render(){
//    return(
//     <div className={styles.tableView}>
//      <Table.RowGroup style={RowGroupStyle}>
//        <NavBar />
//      </Table.RowGroup>
//
//      <Table.RowGroup style={RowGroupStyle}>
//        <Table.DataRow content={PrincipalHeadContent} style={PrincipalPledgeHeadStyle_Expand} />
//      </Table.RowGroup>
//
//     </div>
//    )
//   }
// }
