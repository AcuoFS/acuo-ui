# Data Structure

Draft of how response data should be structured: Arrays of objects.

```javascript
export const template = [ { region: "",
                            agreement: "",
                            counterparty: "",
                            varMargin: [ {  "Asset": 123, "Quantity": 123, "Adj. Value": 123, "Value": 123, "Rating": 123, "Haircut": 123, "Maturity Date": 123, "ISIN": 123 }, {  }, {  }, {  }, {  } ],  
                                           },
                          { }, { }, { }, { }   ]
```
