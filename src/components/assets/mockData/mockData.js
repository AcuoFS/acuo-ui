import _ from 'lodash'
import TableStyle from '../subcomponent/deployedViews/TableUI/TableUI.css'

export const categoryHeader = ["Region" , "Agreement", "Counterparty"]
export const dataHeader_minView = ["Asset", "Quantity", "Adj. Value", "Value", "Haircut"]
export const dataHeader_expandedView = ["Asset", "Quantity", "Adj. Value", "Value", "Rating", "Haircut", "Maturity Date", "ISIN"]

const block_1 = {
 "asset": "Asset 1",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAA",
 "haircut": "1%",
 "maturityDate": "DD-MM-YYYY",
 "isin": "AB123456789",
}
const block_2 = {
 "asset": "Asset 2",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAA",
 "haircut": "1%",
 "maturityDate": "DD-MM-YYYY",
 "isin": "AB123456789"
}
export const ApiVarMarginResponse = [
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
  }
]

export const sortedByRegion = _.sortBy(ApiVarMarginResponse, ["region"])
export const tableContent = sortedByRegion.map((row)=>{
        return{
         CategoryContent: [ row.region, row.agreement, row.counterparty ],
         RowContent:  row.data.map((block)=>{
           return [ block.asset, block.quantity, block.adjValue, block.value, block.haircut ]
         }),
         PledgeContent: ["Pledge", " ", row.pledge.adjValue, row.pledge.value, " "],
         ExcessContent: ["Excess", " ", row.excess.adjValue, row.excess.value, " "]
        }
       })
export const tableContentExpandSide = sortedByRegion.map((row)=>{
        return{
         CategoryContent: [ row.region, row.agreement, row.counterparty ],
         RowContent:  row.data.map((block)=>{
           return [ block.asset, block.quantity, block.adjValue, block.value, block.rating, block.haircut, block.maturityDate, block.isin ]
         }),
         PledgeContent: ["Pledge", " ", row.pledge.adjValue, row.pledge.value, " ", " ", " ", " "],
         ExcessContent: ["Excess", " ", row.excess.adjValue, row.excess.value, " ", " ", " ", " "]
        }
       })

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


// export const VarMarginApiResponse = {
//        "RowContent1" : ["Americas", "Acuo SG Pte Ltd v Counterparty B4", "Counterparty" ],
//        "RowContent2" : ["British America", "12,345", "12,345,678 USD", "12,345,678 USD", "1%"],
//   "RowContentPledge" : ["Pledge", " ", "12,345,678 USD", "12,345,678 USD", " "],
//   "RowContentExcess" : ["Excess", " ", "12,345,678 USD", "12,345,678 USD", " "]
// }
// export const VarMarginApiResponse_Expanded = {
//        "RowContent1" : ["Americas", "Acuo SG Pte Ltd v Counterparty B4", "Counterparty" ],
//        "RowContent2" : ["British America", "12,345", "12,345,678 USD", "12,345,678 USD", "AAA", "1%", "DD-MM-YYYY", "AB123456789"],
//   "RowContentPledge" : ["Pledge", " ", "12,345,678 USD", "12,345,678 USD", " ", " ", " ", " "],
//   "RowContentExcess" : ["Excess", " ", "12,345,678 USD", "12,345,678 USD", " ", " ", " ", " "]
// }
// export const InitMarginApiResponse = {
//        "RowContent1" : ["EURO", "Acuo SG Pte Ltd v Counterparty B4", "Counterparty" ],
//        "RowContent2" : ["Germany-Berlin", "12,345", "12,345,678 USD", "12,345,678 USD", "1%"],
//   "RowContentPledge" : ["Pledge", " ", "12,345,678 USD", "12,345,678 USD", " "],
//   "RowContentExcess" : ["Excess", " ", "12,345,678 USD", "12,345,678 USD", " "]
// }
// export const InitMarginApiResponse_Expanded = {
//        "RowContent1" : ["EURO", "Acuo SG Pte Ltd v Counterparty B4", "Counterparty" ],
//        "RowContent2" : ["Germany-Berlin", "12,345", "12,345,678 USD", "12,345,678 USD", "AAA", "1%", "DD-MM-YYYY", "AB123456789"],
//   "RowContentPledge" : ["Pledge", " ", "12,345,678 USD", "12,345,678 USD", " ", " ", " ", " "],
//   "RowContentExcess" : ["Excess", " ", "12,345,678 USD", "12,345,678 USD", " ", " ", " ", " "]
// }
