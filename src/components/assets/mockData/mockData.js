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
 "maturityDate": "DD-MM-YYYY",
 "isin": "AB123456789",
}
const block_2 = {
 "asset": "Initial Asset 2",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAA",
 "haircut": "1%",
 "maturityDate": "DD-MM-YYYY",
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
                                  height: 24,
                                 rowSpan: 1},
      "VarMarginHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.VarMarginHead}`, //${TableStyle.RegCptyHead}
                                   width: null,
                                  height: 24,
                                 rowSpan: 1 },
               "RowStyle1" : { className: TableStyle.Row,
                                   width: 33,
                                  height: 24,
                                 rowSpan: 4,
                                 bgColor: undefined },
          "DataBlockStyle" : { className: `${TableStyle.RowGroup} ${TableStyle.DataBlock}`},
      "InnerColGroupStyle" : { className: `${TableStyle.ColGroup}`,
                                   width: 100-33 },
               "RowStyle2" : { className: TableStyle.Row + ' ' + TableStyle.DataRow,
                                  height: 24,
                                 rowSpan: 1,
                                 bgColor: undefined },
    "RowPledgeExcessStyle" : { className: `${TableStyle.Row} ${TableStyle.VarMarginHead}`,
                                  height: 24,
                                 rowSpan: 1 }
}
export const VarMarginTableStyleExpanded = {
           "RowGroupStyle" : { className: `${TableStyle.RowGroup}`},
    "RegCptyColGroupStyle" : { className: `${TableStyle.ColGroup} ${TableStyle.RegCptyColGroupStyle}`,
                                   width: 30 },
  "VarMarginColGroupStyle" : { className: `${TableStyle.ColGroup}`, width: 100-30 },
        "RegCptyHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.RegCptyHead}`,
                                   width: null,
                                  height: 24,
                                 rowSpan: 1},
      "VarMarginHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.VarMarginHead}`, //${TableStyle.RegCptyHead}
                                   width: null,
                                  height: 24,
                                 rowSpan: 1 },
               "RowStyle1" : { className: TableStyle.Row,
                                   width: 30,
                                  height: 24,
                                 rowSpan: 4,
                                 bgColor: undefined },
          "DataBlockStyle" : { className: `${TableStyle.RowGroup} ${TableStyle.DataBlock}`},
      "InnerColGroupStyle" : { className: `${TableStyle.ColGroup}`,
                                   width: 100-30 },
               "RowStyle2" : { className: TableStyle.Row + ' ' + TableStyle.DataRow,
                                  height: 24,
                                 rowSpan: 1,
                                 bgColor: undefined },
    "RowPledgeExcessStyle" : { className: `${TableStyle.Row} ${TableStyle.VarMarginHead}`,
                                  height: 24,
                                 rowSpan: 1 }
}

export const InitMarginTableStyle = {
           "RowGroupStyle" : { className: `${TableStyle.RowGroup}`},
    "RegCptyColGroupStyle" : { className: `${TableStyle.ColGroup} ${TableStyle.RegCptyColGroupStyle}`,
                                   width: 33 },
  "VarMarginColGroupStyle" : { className: `${TableStyle.ColGroup}`, width: 100-33 },
        "RegCptyHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.RegCptyHead}`,
                                   width: null,
                                  height: 24,
                                 rowSpan: 1},
      "VarMarginHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.InitMarginHead}`,
                                   width: null,
                                  height: 24,
                                 rowSpan: 1 },
               "RowStyle1" : { className: TableStyle.Row,
                                   width: 33,
                                  height: 24,
                                 rowSpan: 4,
                                 bgColor: undefined },
          "DataBlockStyle" : { className: `${TableStyle.RowGroup} ${TableStyle.DataBlock}`},
      "InnerColGroupStyle" : { className: `${TableStyle.ColGroup}`,
                                   width: 100-33 },
               "RowStyle2" : { className: TableStyle.Row + ' ' + TableStyle.DataRow,
                                  height: 24,
                                 rowSpan: 1,
                                 bgColor: undefined },
    "RowPledgeExcessStyle" : { className: `${TableStyle.Row} ${TableStyle.InitMarginHead}`,
                                  height: 24,
                                 rowSpan: 1 }
}
export const InitMarginTableStyleExpanded = {
           "RowGroupStyle" : { className: `${TableStyle.RowGroup}`},
    "RegCptyColGroupStyle" : { className: `${TableStyle.ColGroup} ${TableStyle.RegCptyColGroupStyle}`,
                                   width: 30 },
  "VarMarginColGroupStyle" : { className: `${TableStyle.ColGroup}`, width: 100-30 },
        "RegCptyHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.RegCptyHead}`,
                                   width: null,
                                  height: 24,
                                 rowSpan: 1},
      "VarMarginHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.InitMarginHead}`,
                                   width: null,
                                  height: 24,
                                 rowSpan: 1 },
               "RowStyle1" : { className: TableStyle.Row,
                                   width: 30,
                                  height: 24,
                                 rowSpan: 4,
                                 bgColor: undefined },
          "DataBlockStyle" : { className: `${TableStyle.RowGroup} ${TableStyle.DataBlock}`},
      "InnerColGroupStyle" : { className: `${TableStyle.ColGroup}`,
                                   width: 100-30 },
               "RowStyle2" : { className: TableStyle.Row + ' ' + TableStyle.DataRow,
                                  height: 24,
                                 rowSpan: 1,
                                 bgColor: undefined },
    "RowPledgeExcessStyle" : { className: `${TableStyle.Row} ${TableStyle.InitMarginHead}`,
                                  height: 24,
                                 rowSpan: 1 }
}

// AssetsHomePanel
const rowHomeData = [ "British America", "Acuo", "12,345", "12.345.678", "AAA", "DD-MM-YY", "2", "3", "Custodian1A", "SG"]
const rowHomeDataMin = [ "British America", "Acuo", "12,345", "12.345.678", "AAA"]

export const HomeContent = {
 Header: ['Asset', 'Firm', 'Quantity', 'Value', 'Rating', 'Maturity', 'Int. Cost', 'Opp. Cost', 'Custodian', 'Region'],
 RowData: [ rowHomeData, rowHomeData, rowHomeData ]
}
export const HomeContentMin = {
 Header: ['Asset', 'Firm', 'Quantity', 'Value', 'Rating'],
 RowData: [ rowHomeDataMin, rowHomeDataMin, rowHomeDataMin ]
}
export const HomeTableStyle={
  "RowGroupStyle": { className: `${TableStyle.ColGroup}`  },
  "HeaderRow": { className: `${TableStyle.Row} ${TableStyle.InitMarginHead}`,
                 height: 24,
                 rowSpan: 1 },
  "DataRow": { className: TableStyle.Row + ' ' + TableStyle.DataRow,
                 height: 24,
                 rowSpan: 1 },
}
