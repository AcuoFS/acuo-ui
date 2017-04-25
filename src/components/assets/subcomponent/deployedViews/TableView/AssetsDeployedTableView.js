import React from 'react';
import { connect } from 'react-redux'
import styles from './AssetsDeployedTableView.css'
import NavBar from "../Navbar.js"
import Table from '../tableUI/TableUI.js'
import tableStyle from '../tableUI/TableUI.css'

/*  AssetsDeployedTableView shall hold only the view when user selects 'Region' from the navbar
      - NavBar should not reside within this component and placed in panelWindow instead.
      - All table components should come from tableUi.js  */

const RowGroupStyle = { className: `${tableStyle.RowGroup}`}

const RegCptyHead = ["Region" , "Agreement", "Counterparty"]
const RegCptyHeadStyle = {
 className: `${tableStyle.Row} ${tableStyle.RegCptyHead}`, //${tableStyle.RegCptyHead}
 width: 38,
 height: 24,
 rowSpan: 1
}
const VarMarginHead = ["Asset", "Quantity", "Adj. Value", "Value", "Haircut"]
const VarMarginHeadStyle = {
 className: `${tableStyle.Row} ${tableStyle.VarMarginHead}`, //${tableStyle.RegCptyHead}
 width: 100-38,
 height: 24,
 rowSpan: 1
}

const DataBlock = { className: `${tableStyle.RowGroup} ${tableStyle.DataBlock}`}
const RowContent1 = [ "Americas", "Acuo SG Pte Ltd v Counterparty B4", "Counterparty" ]
const RowStyle1 = {
  className: tableStyle.Row,
  width: 38,
  height: 24,
  rowSpan: 4,
  bgColor: undefined
}

const InnerColGroupStyle = {
 className: `${tableStyle.ColGroup}`,
 width: 100-38
}
const RowContent2 = ["British America", "12,345", "12,345,678 USD", "12,345,678 USD", "1%"]
const RowStyle2 = {
  className: tableStyle.Row + ' ' + tableStyle.DataRow,
  height: 24,
  rowSpan: 1,
  bgColor: undefined
}
const RowContentPledge = ["Pledge", " ", "12,345,678 USD", "12,345,678 USD", " "]
const RowContentExcess = ["Excess", " ", "12,345,678 USD", "12,345,678 USD", " "]
const RowStylePledgeExcess = {
  className: `${tableStyle.Row} ${tableStyle.VarMarginHead}`,
  height: 24,
  rowSpan: 1,
}

const AssetsDeployedTableView = (props)=>{
 return (
  <div className={styles.tableView}>

    <Table.RowGroup style={RowGroupStyle}>
      <NavBar />
    </Table.RowGroup>

    <Table.RowGroup style={RowGroupStyle}>
      <Table.DataRow content={RegCptyHead} style={RegCptyHeadStyle} />
      <Table.DataRow content={VarMarginHead} style={VarMarginHeadStyle} />
    </Table.RowGroup>

    <Table.RowGroup style={DataBlock}>
      <Table.DataRow content={RowContent1} style={RowStyle1} />
      <Table.ColGroup style={InnerColGroupStyle}>
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContentPledge} style={RowStylePledgeExcess} />
        <Table.DataRow content={RowContentExcess} style={RowStylePledgeExcess} />
      </Table.ColGroup>
    </Table.RowGroup>


    <Table.RowGroup style={DataBlock}>
      <Table.DataRow content={RowContent1} style={RowStyle1} />
      <Table.ColGroup style={InnerColGroupStyle}>
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContentPledge} style={RowStylePledgeExcess} />
        <Table.DataRow content={RowContentExcess} style={RowStylePledgeExcess} />
      </Table.ColGroup>
    </Table.RowGroup>


    <Table.RowGroup style={DataBlock}>
      <Table.DataRow content={RowContent1} style={RowStyle1} />
      <Table.ColGroup style={InnerColGroupStyle}>
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContentPledge} style={RowStylePledgeExcess} />
        <Table.DataRow content={RowContentExcess} style={RowStylePledgeExcess} />
      </Table.ColGroup>
    </Table.RowGroup>


    <Table.RowGroup style={DataBlock}>
      <Table.DataRow content={RowContent1} style={RowStyle1} />
      <Table.ColGroup style={InnerColGroupStyle}>
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContentPledge} style={RowStylePledgeExcess} />
        <Table.DataRow content={RowContentExcess} style={RowStylePledgeExcess} />
      </Table.ColGroup>
    </Table.RowGroup>

    <Table.RowGroup style={DataBlock}>
      <Table.DataRow content={RowContent1} style={RowStyle1} />
      <Table.ColGroup style={InnerColGroupStyle}>
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContentPledge} style={RowStylePledgeExcess} />
        <Table.DataRow content={RowContentExcess} style={RowStylePledgeExcess} />
      </Table.ColGroup>
    </Table.RowGroup>

    <Table.RowGroup style={DataBlock}>
      <Table.DataRow content={RowContent1} style={RowStyle1} />
      <Table.ColGroup style={InnerColGroupStyle}>
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContentPledge} style={RowStylePledgeExcess} />
        <Table.DataRow content={RowContentExcess} style={RowStylePledgeExcess} />
      </Table.ColGroup>
    </Table.RowGroup>

    <Table.RowGroup style={DataBlock}>
      <Table.DataRow content={RowContent1} style={RowStyle1} />
      <Table.ColGroup style={InnerColGroupStyle}>
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContentPledge} style={RowStylePledgeExcess} />
        <Table.DataRow content={RowContentExcess} style={RowStylePledgeExcess} />
      </Table.ColGroup>
    </Table.RowGroup>

    <Table.RowGroup style={DataBlock}>
      <Table.DataRow content={RowContent1} style={RowStyle1} />
      <Table.ColGroup style={InnerColGroupStyle}>
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContentPledge} style={RowStylePledgeExcess} />
        <Table.DataRow content={RowContentExcess} style={RowStylePledgeExcess} />
      </Table.ColGroup>
    </Table.RowGroup>

    <Table.RowGroup style={DataBlock}>
      <Table.DataRow content={RowContent1} style={RowStyle1} />
      <Table.ColGroup style={InnerColGroupStyle}>
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContentPledge} style={RowStylePledgeExcess} />
        <Table.DataRow content={RowContentExcess} style={RowStylePledgeExcess} />
      </Table.ColGroup>
    </Table.RowGroup>

    <Table.RowGroup style={DataBlock}>
      <Table.DataRow content={RowContent1} style={RowStyle1} />
      <Table.ColGroup style={InnerColGroupStyle}>
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContent2} style={RowStyle2} />
        <Table.DataRow content={RowContentPledge} style={RowStylePledgeExcess} />
        <Table.DataRow content={RowContentExcess} style={RowStylePledgeExcess} />
      </Table.ColGroup>
    </Table.RowGroup>

  </div>
 )
}

export default AssetsDeployedTableView
