import TableStyle from '../subcomponent/deployedViews/tableUI/tableUI.css'

// AssetsDeployedPanel
export const categoryHeader = ["Region" , "Agreement", "Counterparty"]
export const dataHeader_minView = ["Asset", "Quantity", "Adj. Value", "Value", "Haircut"]
export const dataHeader_expandedView = ["Asset", "Quantity", "Adj. Value", "Value", "Rating", "Haircut", "Maturity Date", "ISIN"]

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
   region: "AAA Americas",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "CCC Counterparty",
   data: [ block_1, block_2 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "CCC Americas",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "ABA Counterparty",
   data: [ block_1, block_2 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "ABA Americas",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "AAA Counterparty",
   data: [ block_1, block_2 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "ADa Americas",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "HUA Counterparty",
   data: [ block_1, block_2 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "BAD Americas",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "BBA Counterparty",
   data: [ block_1, block_2 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  } ]

const block_3 = {
 "asset": "Varied Asset 1",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAA",
 "haircut": "1%",
 "maturityDate": "DD-MM-YYYY",
 "isin": "AB123456789",
}
const block_4 = {
 "asset": "Varied Asset 2",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAA",
 "haircut": "1%",
 "maturityDate": "DD-MM-YYYY",
 "isin": "AB123456789"
}
export const ApiVarMargResponse = [
  {
   region: "AAA Americas",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "CCC Counterparty",
   data: [ block_3, block_4 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "CCC Americas",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "ABA Counterparty",
   data: [ block_3, block_4 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "ABA Americas",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "AAA Counterparty",
   data: [ block_3, block_4 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "ADa Americas",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "HUA Counterparty",
   data: [ block_3, block_4 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  {
   region: "BAD Americas",
   agreement: "Acuo SG Pte Ltd v Counterparty B4",
   counterparty: "BBA Counterparty",
   data: [ block_3, block_4 ],
   pledge: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   excess: {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  } ]

export const VarMarginTableStyle = {
           "RowGroupStyle" : { className: `${TableStyle.RowGroup}`},
    "RegCptyColGroupStyle" : { className: `${TableStyle.ColGroup} ${TableStyle.RegCptyColGroupStyle}`,
                                   width: 38 },
  "VarMarginColGroupStyle" : { className: `${TableStyle.ColGroup}`, width: 100-38 },
        "RegCptyHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.RegCptyHead}`,
                                   width: null,
                                  height: 24,
                                 rowSpan: 1},
      "VarMarginHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.VarMarginHead}`, //${TableStyle.RegCptyHead}
                                   width: null,
                                  height: 24,
                                 rowSpan: 1 },
               "RowStyle1" : { className: TableStyle.Row,
                                   width: 38,
                                  height: 24,
                                 rowSpan: 4,
                                 bgColor: undefined },
          "DataBlockStyle" : { className: `${TableStyle.RowGroup} ${TableStyle.DataBlock}`},
      "InnerColGroupStyle" : { className: `${TableStyle.ColGroup}`,
                                   width: 100-38 },
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
                                   width: 38 },
  "VarMarginColGroupStyle" : { className: `${TableStyle.ColGroup}`, width: 100-38 },
        "RegCptyHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.RegCptyHead}`,
                                   width: null,
                                  height: 24,
                                 rowSpan: 1},
      "VarMarginHeadStyle" : { className: `${TableStyle.Row} ${TableStyle.InitMarginHead}`,
                                   width: null,
                                  height: 24,
                                 rowSpan: 1 },
               "RowStyle1" : { className: TableStyle.Row,
                                   width: 38,
                                  height: 24,
                                 rowSpan: 4,
                                 bgColor: undefined },
          "DataBlockStyle" : { className: `${TableStyle.RowGroup} ${TableStyle.DataBlock}`},
      "InnerColGroupStyle" : { className: `${TableStyle.ColGroup}`,
                                   width: 100-38 },
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
export const HomeContent = {
 Header: ['Asset', 'Firm', 'Quantity', 'Value', 'Rating', 'Maturity Date', 'Int. Cost', 'Opp. Cost', 'Custodian', 'Region'],
 RowData: [ rowHomeData, rowHomeData, rowHomeData ]
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