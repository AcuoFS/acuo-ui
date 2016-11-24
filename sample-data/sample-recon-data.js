let recon = [
  {
    "time": "2016-10-23T10:25:43.511Z",
    "legalEntity": "Acuo SG",
    "cptyEntity": "A1",
    "cptyOrg": "COUNTERPARTY A",
    "ccy": "SGD",
    "direction": "IN",
    "GUID":1232412423121,
    "initialMargin": 10000,
    "variableMargin": 500000,
    "ClientAssets":[
      {
        "group1": [
          {
            "firstLevel": "Net Total IM",
            "secondLevel": [
              {
                "assetName": "IM Requirement [Exchange]",
                "amount": 150384
              },
              {
                "assetName": "IM Requirement [Exchange]",
                "amount": 150384
              }
            ]
          },
          {
            "firstLevel": "Net VM Call (SGD)",
            "secondLevel": [
              {
                "assetName": "Variation Margin (USD)",
                "amount": 150386
              },
              {
                "assetName": "Current MTM Exposure (USD)",
                "amount": 150387
              },
              {
                "assetName": "Variation Margin Balance (USD)",
                "amount": 150388
              }
            ]
          }
        ],
        "group2": [
          {
            "firstLevel": "Product Cash Flows",
            "secondLevel": [
              {
                "assetName": "Total Coupon Payment Amount",
                "amount": 15909
              },
              {
                "assetName": "Total Upfront fee",
                "amount": 150384
              }
            ]
          },
          {
            "firstLevel": "Fees & Commissions",
            "secondLevel": [
              {
                "assetName": "Clearing Broker Fee (USD)",
                "amount": 150386
              },
              {
                "assetName": "Clearing Broker Fee (EUR)",
                "amount": 150387
              },
              {
                "assetName": "Clearing Broker Fee (JPY)",
                "amount": 150388
              }
            ]
          }
        ]
      }
    ],
    "counterpartyAssets":[
      {
        "group1": [
          {
            "firstLevel": "Net Total IM",
            "secondLevel": [
              {
                "assetName": "IM Requirement [Exchange]",
                "amount": 150384
              },
              {
                "assetName": "Additional IM Requirement [FCM]",
                "amount": 150385
              },
              {
                "assetName": "IM Balance Non-cash",
                "amount": 150386
              }
            ]
          },
          {
            "firstLevel": "Net VM Call (SGD)",
            "secondLevel": [
              {
                "assetName": "Variation Margin (USD)",
                "amount": 150386
              },
              {
                "assetName": "Current MTM Exposure (USD)",
                "amount": 150387
              },
              {
                "assetName": "Variation Margin Balance (USD)",
                "amount": 150388
              }
            ]
          }
        ],
        "group2": [
          {
            "firstLevel": "Product Cash Flows",
            "secondLevel": [
              {
                "assetName": "Total Coupon Payment Amount",
                "amount": 15909
              },
              {
                "assetName": "Total Upfront fee",
                "amount": 150384
              }
            ]
          },
          {
            "firstLevel": "Fees & Commissions",
            "secondLevel": [
              {
                "assetName": "Clearing Broker Fee (USD)",
                "amount": 150386
              },
              {
                "assetName": "Clearing Broker Fee (EUR)",
                "amount": 150387
              },
              {
                "assetName": "Clearing Broker Fee (JPY)",
                "amount": 150388
              }
            ]
          }
        ]
      }
    ],
    "currencyInfo": [
      {
        "ccy": "USD",
        "exchangeRate": 1
      },
      {
        "ccy": "RMB",
        "exchangeRate": 0.4123
      }
    ]
  }
]