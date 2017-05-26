import TableStyle from '../subcomponent/deployedViews/tableUI/tableUI.css'

// AssetsDeployedPanel
export const categoryHeader = ["Region" , "Agreement", "Counterparty"]
export const dataHeader_minView = ["Asset", "Quantity", "Adj. Value", "Value", "Haircut"]
export const dataHeader_expandedView = ["Asset", "Quantity", "Adj. Value", "Value", "Rating", "Haircut", "Maturity", "ISIN"]

const block_1 = {
 "asset": "Initial Asset 1",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAA",
 "haircut": "1%",
 "maturityDate": "DD-MM-YY",
 "isin": "AB123456789",
}
const block_2 = {
 "asset": "Initial Asset 2",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAB",
 "haircut": "1%",
 "maturityDate": "DD-MM-YY",
 "isin": "AB123456789"
}
const block_33 = {
 "asset": "Initial Asset 3",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAc",
 "haircut": "1%",
 "maturityDate": "DD-MM-YY",
 "isin": "AB123456789"
}
const block_11 = {
 "asset": "Initial Asset 4",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAD",
 "haircut": "1%",
 "maturityDate": "DD-MM-YY",
 "isin": "AB123456789"
}
const block_22 = {
 "asset": "Initial Asset 5",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAE",
 "haircut": "1%",
 "maturityDate": "DD-MM-YY",
 "isin": "AB123456789"
}
const block_111 = {
 "asset": "Initial Asset 6",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAF",
 "haircut": "1%",
 "maturityDate": "DD-MM-YY",
 "isin": "AB123456789"
}
const block_222 = {
 "asset": "Initial Asset 7",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAG",
 "haircut": "1%",
 "maturityDate": "DD-MM-YY",
 "isin": "AB123456789"
}
export const ApiInitMargResponse = [
  {
   region: "Americas",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "CCC Counterparty",
   data: [ block_1, block_2 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "Europe",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "ABA Counterparty",
   data: [ block_11, block_22 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "Asia",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "AAA Counterparty",
   data: [ block_111, block_222 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "Australia",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "HUA Counterparty",
   data: [ block_111, block_2 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "Africa",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "BBA Counterparty",
   data: [ block_22, block_33 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  }
 ]

const block_3 = {
 "asset": "Varied Asset 1",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAA",
 "haircut": "1%",
 "maturityDate": "DD-MM-YY",
 "isin": "AB123456789",
}
const block_4 = {
 "asset": "Varied Asset 2",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAA",
 "haircut": "1%",
 "maturityDate": "DD-MM-YY",
 "isin": "AB123456789"
}
export const ApiVarMargResponse = [
 {
  region: "Americas",
  agreement: "Acuo SG Pte Ltd v Counterparty B4",
  counterparty: "CCC Counterparty",
  data: [ block_1, block_2 ],
  pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
  excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
 },
 {
  region: "Europe",
  agreement: "Acuo SG Pte Ltd v Counterparty B4",
  counterparty: "ABA Counterparty",
  data: [ block_1, block_2 ],
  pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
  excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
 },
 {
  region: "Asia",
  agreement: "Acuo SG Pte Ltd v Counterparty B4",
  counterparty: "AAA Counterparty",
  data: [ block_1, block_2 ],
  pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
  excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
 },
 {
  region: "Australia",
  agreement: "Acuo SG Pte Ltd v Counterparty B4",
  counterparty: "HUA Counterparty",
  data: [ block_1, block_2 ],
  pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
  excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
 },
 {
  region: "Africa",
  agreement: "Acuo SG Pte Ltd v Counterparty B4",
  counterparty: "BBA Counterparty",
  data: [ block_1, block_2 ],
  pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
  excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
 }
 ]

export const VarMarginTableStyle = {
           "RowGroupStyle" : { className: `${TableStyle.RowGroup}`},
    "RegCptyColGroupStyle" : { className: `${TableStyle.ColGroup} ${TableStyle.RegCptyColGroupStyle}`,
                                   width: 33 },
  "VarMarginColGroupStyle" : { className: `${TableStyle.ColGroup}`, width: 100-33 },
        "RegCptyHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.RegCptyHead}`,
                                   width: null,
                                  height: 30,
                                 rowSpan: 1},
      "VarMarginHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.VarMarginHead}`, //${TableStyle.RegCptyHead}
                                   width: null,
                                  height: 30,
                                 rowSpan: 1 },
               "RowStyle1" : { className: TableStyle.Row,
                                   width: 33,
                                  height: 30,
                                 rowSpan: 4,
                                 bgColor: undefined },
          "DataBlockStyle" : { className: `${TableStyle.RowGroup} ${TableStyle.DataBlock}`},
      "InnerColGroupStyle" : { className: `${TableStyle.ColGroup}`,
                                   width: 100-33 },
               "RowStyle2" : { className: TableStyle.Row + ' ' + TableStyle.DataRow,
                                  height: 30,
                                 rowSpan: 1,
                                 bgColor: undefined },
          "RowPledgeStyle" : { className: `${TableStyle.Row} ${TableStyle.VarMarginPledgeRow}`,
                                  height: 30,
                                 rowSpan: 1 },
          "RowExcessStyle" : { className: `${TableStyle.Row} ${TableStyle.VarMarginExcessRow}`,
                                  height: 30,
                                 rowSpan: 1 }
}
export const VarMarginTableStyleExpanded = {
           "RowGroupStyle" : { className: `${TableStyle.RowGroup}`},
    "RegCptyColGroupStyle" : { className: `${TableStyle.ColGroup} ${TableStyle.RegCptyColGroupStyle}`,
                                   width: 30 },
  "VarMarginColGroupStyle" : { className: `${TableStyle.ColGroup}`, width: 100-30 },
        "RegCptyHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.RegCptyHead}`,
                                   width: null,
                                  height: 30,
                                 rowSpan: 1},
      "VarMarginHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.VarMarginHead}`, //${TableStyle.RegCptyHead}
                                   width: null,
                                  height: 30,
                                 rowSpan: 1 },
               "RowStyle1" : { className: TableStyle.Row,
                                   width: 30,
                                  height: 30,
                                 rowSpan: 4,
                                 bgColor: undefined },
          "DataBlockStyle" : { className: `${TableStyle.RowGroup} ${TableStyle.DataBlock}`},
      "InnerColGroupStyle" : { className: `${TableStyle.ColGroup}`,
                                   width: 100-30 },
               "RowStyle2" : { className: TableStyle.Row + ' ' + TableStyle.DataRow,
                                  height: 30,
                                 rowSpan: 1,
                                 bgColor: undefined },
          "RowPledgeStyle" : { className: `${TableStyle.Row} ${TableStyle.VarMarginPledgeRow}`,
                                  height: 30,
                                 rowSpan: 1 },
          "RowExcessStyle" : { className: `${TableStyle.Row} ${TableStyle.VarMarginExcessRow}`,
                                  height: 30,
                                 rowSpan: 1 }
}

export const InitMarginTableStyle = {
           "RowGroupStyle" : { className: `${TableStyle.RowGroup}`},
    "RegCptyColGroupStyle" : { className: `${TableStyle.ColGroup} ${TableStyle.RegCptyColGroupStyle}`,
                                   width: 33 },
  "VarMarginColGroupStyle" : { className: `${TableStyle.ColGroup}`, width: 100-33 },
        "RegCptyHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.RegCptyHead}`,
                                   width: null,
                                  height: 30,
                                 rowSpan: 1},
      "VarMarginHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.InitMarginHead}`,
                                   width: null,
                                  height: 30,
                                 rowSpan: 1 },
               "RowStyle1" : { className: TableStyle.Row,
                                   width: 33,
                                  height: 30,
                                 rowSpan: 4,
                                 bgColor: undefined },
          "DataBlockStyle" : { className: `${TableStyle.RowGroup} ${TableStyle.DataBlock}`},
      "InnerColGroupStyle" : { className: `${TableStyle.ColGroup}`,
                                   width: 100-33 },
               "RowStyle2" : { className: TableStyle.Row + ' ' + TableStyle.DataRow,
                                  height: 30,
                                 rowSpan: 1,
                                 bgColor: undefined },
          "RowPledgeStyle" : { className: `${TableStyle.Row} ${TableStyle.InitMarginPledgeRow}`,
                                  height: 30,
                                 rowSpan: 1 },
          "RowExcessStyle" : { className: `${TableStyle.Row} ${TableStyle.InitMarginExcessRow}`,
                                  height: 30,
                                 rowSpan: 1 }
}
export const InitMarginTableStyleExpanded = {
           "RowGroupStyle" : { className: `${TableStyle.RowGroup}`},
    "RegCptyColGroupStyle" : { className: `${TableStyle.ColGroup} ${TableStyle.RegCptyColGroupStyle}`,
                                   width: 30 },
  "VarMarginColGroupStyle" : { className: `${TableStyle.ColGroup}`, width: 100-30 },
        "RegCptyHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.RegCptyHead}`,
                                   width: null,
                                  height: 30,
                                 rowSpan: 1},
      "VarMarginHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.InitMarginHead}`,
                                   width: null,
                                  height: 30,
                                 rowSpan: 1 },
               "RowStyle1" : { className: TableStyle.Row,
                                   width: 30,
                                  height: 30,
                                 rowSpan: 4,
                                 bgColor: undefined },
          "DataBlockStyle" : { className: `${TableStyle.RowGroup} ${TableStyle.DataBlock}`},
      "InnerColGroupStyle" : { className: `${TableStyle.ColGroup}`,
                                   width: 100-30 },
               "RowStyle2" : { className: TableStyle.Row + ' ' + TableStyle.DataRow,
                                  height: 30,
                                 rowSpan: 1,
                                 bgColor: undefined },
          "RowPledgeStyle" : { className: `${TableStyle.Row} ${TableStyle.InitMarginPledgeRow}`,
                                  height: 30,
                                 rowSpan: 1 },
          "RowExcessStyle" : { className: `${TableStyle.Row} ${TableStyle.InitMarginExcessRow}`,
                                  height: 30,
                                 rowSpan: 1 }
}

// AssetsHomePanel
const rowHomePledgeData = [ "British America", "Counterparty_Name", "12,345", "12,345.678 USD", "AAA", "DD-MM-YY", "99%", "99%", "Custodian1A", "Americas"]
const rowHomePledgeDataMin = [ "British America", "Counterparty_Name", "12,345", "12,345.678 USD", "AAA"]
const rowHomePrincipalData = [ "British America", "Acuo", "12,345", "12,345.678 USD", "AAA", "DD-MM-YY", "99%", "99%", "Custodian1A", "Americas"]
const rowHomePrincipalDataMin = [ "British America", "Acuo", "12,345", "12,345.678 USD", "AAA"]

export const HomePledgeContent = {
 Header: ['Asset', 'Counterparty', 'Quantity', 'Value', 'Rating', 'Maturity', 'Int. Cost', 'Opp. Cost', 'Custodian', 'Region'],
 RowData: [ rowHomePledgeData, rowHomePledgeData, rowHomePledgeData ]
}
export const HomePledgeContentMin = {
 Header: ['Asset', 'Counterparty', 'Quantity', 'Value', 'Rating'],
 RowData: [ rowHomePledgeDataMin, rowHomePledgeDataMin, rowHomePledgeDataMin ]
}
export const HomePrincipalContent = {
 Header: ['Asset', 'Legal Entity', 'Quantity', 'Value', 'Rating', 'Maturity', 'Int. Cost', 'Opp. Cost', 'Custodian', 'Region'],
 RowData: [ rowHomePrincipalData, rowHomePrincipalData, rowHomePrincipalData ]
}
export const HomePrincipalContentMin = {
 Header: ['Asset', 'Legal Entity', 'Quantity', 'Value', 'Rating'],
 RowData: [ rowHomePrincipalDataMin, rowHomePrincipalDataMin, rowHomePrincipalDataMin ]
}
export const HomeTableStyle={
  "RowGroupStyle": { className: `${TableStyle.ColGroup}`  },
  "HeaderRow": { className: `${TableStyle.Row} ${TableStyle.InitMarginHead}`,
                 height: 30,
                 rowSpan: 1 },
  "DataRow": { className: TableStyle.Row + ' ' + TableStyle.DataRow,
                 height: 30,
                 rowSpan: 1 },
}
