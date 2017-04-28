# Initial Margin & Variation Margin Response Object

 Response object for both _Initial Margins_ and _Variation Margins_ should be structured as: Arrays of Objects. Each Object represents an _Agreeement_, later to be displayed as a _Group Of Rows_, which may be referred to as a `rowBlock` in this document.

```javascript
const API_Response_Object = [
  {
   "region": "AAA Americas",
   "agreement": "Acuo SG Pte Ltd v Counterparty B4",
   "counterparty": "CCC Counterparty",
   "data": [ rowData_1, rowData_2,  , rowData_N ], // see rowData structure
   "pledge": {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"},
   "excess": {  "adjValue": "12,345,678 USD", "value":"12,345,678 USD"}
  },
  .
  .
  .
  {/*...*/} ]
```
`rowData_N` are objects representing individual rows:
```javascript
//rowData Structure
{
 "asset": "Asset_Name_1",
 "quantity": "12,345",
 "adjValue": "12,345,678 USD",
 "value":"12,345,678 USD",
 "rating": "AAA",
 "haircut": "1%",
 "maturityDate": "01-01-2017", //DD-MM-YYYY format
 "isin": "AB123456789",
}
```
