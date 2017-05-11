const countries = [
  {
    "value": "AED",
    "label": "UAE Dirham"
  },
  {
    "value": "AFN",
    "label": "Afghani"
  },
  {
    "value": "ALL",
    "label": "Albanian Lek"
  },
  {
    "value": "AMD",
    "label": "Armenian Dram"
  },
  {
    "value": "ANG",
    "label": "Netherlands Antillian Guilder"
  },
  {
    "value": "AOA",
    "label": "Angolan kwanza"
  },
  {
    "value": "ARS",
    "label": "Argentine peso"
  },
  {
    "value": "AUD",
    "label": "Australian dollar"
  },
  {
    "value": "AWG",
    "label": "Aruban guilder"
  },
  {
    "value": "AZN",
    "label": "Azerbaijani manat"
  },
  {
    "value": "BAM",
    "label": "Bosnia-Herzegovina convertible mark"
  },
  {
    "value": "BBD",
    "label": "Barbadian dollar"
  },
  {
    "value": "BDT",
    "label": "Bangladeshi taka"
  },
  {
    "value": "BGN",
    "label": "Bulgarian lev"
  },
  {
    "value": "BHD",
    "label": "Bahraini dinar"
  },
  {
    "value": "BIF",
    "label": "Burundi franc"
  },
  {
    "value": "BMD",
    "label": "Bermuda dollar"
  },
  {
    "value": "BND",
    "label": "Brunei dollar"
  },
  {
    "value": "BOB",
    "label": "Bolivian boliviano"
  },
  {
    "value": "BOV",
    "label": "Bolivian Mvdol"
  },
  {
    "value": "BRL",
    "label": "Brazilian real"
  },
  {
    "value": "BSD",
    "label": "Bahamian Dollar"
  },
  {
    "value": "BTN",
    "label": "Bhutan ngultrum"
  },
  {
    "value": "BWP",
    "label": "Botswana pula"
  },
  {
    "value": "BYR",
    "label": "Belarussian Ruble"
  },
  {
    "value": "BZD",
    "label": "Belize Dollar"
  },
  {
    "value": "CAD",
    "label": "Canadian dollar"
  },
  {
    "value": "CDF",
    "label": "Congolese franc"
  },
  {
    "value": "CHF",
    "label": "Swiss franc"
  },
  {
    "value": "CLF",
    "label": "Chilean Unidades de fomento"
  },
  {
    "value": "CLP",
    "label": "Chilean peso"
  },
  {
    "value": "CNY",
    "label": "Yuan renminbi"
  },
  {
    "value": "COP",
    "label": "Colombian peso"
  },
  {
    "value": "COU",
    "label": "Colombian unidad de valor real"
  },
  {
    "value": "CRC",
    "label": "Costa Rican colon"
  },
  {
    "value": "CUP",
    "label": "Cuban peso"
  },
  {
    "value": "CVE",
    "label": "Cape Verde escudo"
  },
  {
    "value": "CZK",
    "label": "Czech koruna"
  },
  {
    "value": "DJF",
    "label": "Djibouti franc"
  },
  {
    "value": "DKK",
    "label": "Danish krone"
  },
  {
    "value": "DOP",
    "label": "Dominican peso"
  },
  {
    "value": "DZD",
    "label": "Algerian Dinar"
  },
  {
    "value": "EGP",
    "label": "Egyptian pound"
  },
  {
    "value": "ERN",
    "label": "Eritrea nakfa"
  },
  {
    "value": "ETB",
    "label": "Ethiopian birr"
  },
  {
    "value": "EUR",
    "label": "EU euro"
  },
  {
    "value": "FJD",
    "label": "Fijian dollar"
  },
  {
    "value": "FKP",
    "label": "Falkland Islands pound"
  },
  {
    "value": "GBP",
    "label": "Pound sterling"
  },
  {
    "value": "GEL",
    "label": "Georgian lari"
  },
  {
    "value": "GHS",
    "label": "Ghana cedi"
  },
  {
    "value": "GIP",
    "label": "Gibraltar pound"
  },
  {
    "value": "GMD",
    "label": "Gambian dalasi"
  },
  {
    "value": "GNF",
    "label": "Guinea franc"
  },
  {
    "value": "GTQ",
    "label": "Guatemalan quetzal"
  },
  {
    "value": "GYD",
    "label": "Guyanese dollar"
  },
  {
    "value": "HKD",
    "label": "Hong Kong dollar"
  },
  {
    "value": "HNL",
    "label": "Honduran lempira"
  },
  {
    "value": "HRK",
    "label": "Croatia Kuna"
  },
  {
    "value": "HTG",
    "label": "Haitian gourde"
  },
  {
    "value": "HUF",
    "label": "Hungarian forint"
  },
  {
    "value": "IDR",
    "label": "Indonesian rupiah"
  },
  {
    "value": "ILS",
    "label": "New Israeli shekel"
  },
  {
    "value": "INR",
    "label": "Indian rupee"
  },
  {
    "value": "IQD",
    "label": "Iraqi dinar"
  },
  {
    "value": "IRR",
    "label": "Iranian Rial"
  },
  {
    "value": "ISK",
    "label": "Icelandic krona"
  },
  {
    "value": "JMD",
    "label": "Jamaican dollar"
  },
  {
    "value": "JOD",
    "label": "Jordanian dinar"
  },
  {
    "value": "JPY",
    "label": "Japanese yen"
  },
  {
    "value": "KES",
    "label": "Kenyan shilling"
  },
  {
    "value": "KGS",
    "label": "Kyrgyzstan som"
  },
  {
    "value": "KHR",
    "label": "Cambodian Riel"
  },
  {
    "value": "KMF",
    "label": "Comoro Franc"
  },
  {
    "value": "KPW",
    "label": "North Korean won"
  },
  {
    "value": "KRW",
    "label": "South Korean won"
  },
  {
    "value": "KWD",
    "label": "Kuwaiti dinar"
  },
  {
    "value": "KYD",
    "label": "Cayman Island Dollar"
  },
  {
    "value": "KZT",
    "label": "Kazakhstan tenge"
  },
  {
    "value": "LAK",
    "label": "Lao kip"
  },
  {
    "value": "LBP",
    "label": "Lebanese pound"
  },
  {
    "value": "LKR",
    "label": "Sri Lankan rupee"
  },
  {
    "value": "LRD",
    "label": "Liberian dollar"
  },
  {
    "value": "LSL",
    "label": "Lesotho loti"
  },
  {
    "value": "LYD",
    "label": "Libyan dinar"
  },
  {
    "value": "MAD",
    "label": "Moroccan dirham"
  },
  {
    "value": "MDL",
    "label": "Moldovan leu"
  },
  {
    "value": "MGA",
    "label": "Malagasy ariary"
  },
  {
    "value": "MKD",
    "label": "Macedonian denar"
  },
  {
    "value": "MMK",
    "label": "Myanmar kyat"
  },
  {
    "value": "MNT",
    "label": "Mongolian tugrik"
  },
  {
    "value": "MOP",
    "label": "Macau pataca"
  },
  {
    "value": "MRO",
    "label": "Mauritanian ouguiya"
  },
  {
    "value": "MUR",
    "label": "Mauritius rupee"
  },
  {
    "value": "MVR",
    "label": "Maldives rufiyaa"
  },
  {
    "value": "MWK",
    "label": "Malawi kwacha"
  },
  {
    "value": "MXN",
    "label": "Mexican peso"
  },
  {
    "value": "MXV",
    "label": "Mexican Unidad de Inversion"
  },
  {
    "value": "MYR",
    "label": "Malaysian ringgit"
  },
  {
    "value": "MZN",
    "label": "Mozambique metical"
  },
  {
    "value": "NAD",
    "label": "Namibian dollar"
  },
  {
    "value": "NGN",
    "label": "Nigerian naira"
  },
  {
    "value": "NIO",
    "label": "Nicaraguan cordoba"
  },
  {
    "value": "NOK",
    "label": "Norwegian krone"
  },
  {
    "value": "NPR",
    "label": "Nepalese rupee"
  },
  {
    "value": "NZD",
    "label": "New Zealand dollar"
  },
  {
    "value": "OMR",
    "label": "Omani rial"
  },
  {
    "value": "PAB",
    "label": "Panamanian balboa"
  },
  {
    "value": "PEN",
    "label": "Peruvian nuevo sol"
  },
  {
    "value": "PGK",
    "label": "Papua New Guinea kina"
  },
  {
    "value": "PHP",
    "label": "Philippine peso"
  },
  {
    "value": "PKR",
    "label": "Pakistani rupee"
  },
  {
    "value": "PLN",
    "label": "Polish zloty"
  },
  {
    "value": "PYG",
    "label": "Paraguayan guaran?"
  },
  {
    "value": "QAR",
    "label": "Qatari rial"
  },
  {
    "value": "RON",
    "label": "Romanian New leu"
  },
  {
    "value": "RSD",
    "label": "Serbian dinar"
  },
  {
    "value": "RUB",
    "label": "Russian ruble"
  },
  {
    "value": "RWF",
    "label": "Rwandan franc"
  },
  {
    "value": "SAR",
    "label": "Saudi Arabian riyal"
  },
  {
    "value": "SBD",
    "label": "Solomon Islands dollar"
  },
  {
    "value": "SCR",
    "label": "Seychelles rupee"
  },
  {
    "value": "SDG",
    "label": "Sudanese Pound"
  },
  {
    "value": "SEK",
    "label": "Swedish krona"
  },
  {
    "value": "SGD",
    "label": "Singapore dollar"
  },
  {
    "value": "SHP",
    "label": "Saint Helena pound"
  },
  {
    "value": "SLL",
    "label": "Sierra Leonean leone"
  },
  {
    "value": "SOS",
    "label": "Somali shilling"
  },
  {
    "value": "SRD",
    "label": "Suriname dollar"
  },
  {
    "value": "SSP",
    "label": "South Sudanese pound"
  },
  {
    "value": "STD",
    "label": "Sao Tomean dobra"
  },
  {
    "value": "SVC",
    "label": "El Salvador Colon"
  },
  {
    "value": "SYP",
    "label": "Syrian pound"
  },
  {
    "value": "SZL",
    "label": "Swaziland lilangeni"
  },
  {
    "value": "THB",
    "label": "Thai baht"
  },
  {
    "value": "TJS",
    "label": "Tajikistani somoni"
  },
  {
    "value": "TMT",
    "label": "Turkmenistan New Manat"
  },
  {
    "value": "TND",
    "label": "Tunisian dinar"
  },
  {
    "value": "TOP",
    "label": "Tongan Pa'anga"
  },
  {
    "value": "TRY",
    "label": "New Turkish lira"
  },
  {
    "value": "TTD",
    "label": "Trinidad and Tobago dollar"
  },
  {
    "value": "TWD",
    "label": "New Taiwan dollar"
  },
  {
    "value": "TZS",
    "label": "Tanzanian shilling"
  },
  {
    "value": "UAH",
    "label": "Ukrainian hryvnia"
  },
  {
    "value": "UGX",
    "label": "Ugandan shilling"
  },
  {
    "value": "USD",
    "label": "United States dollar"
  },
  {
    "value": "UYI",
    "label": "Uruguayan Peso debt"
  },
  {
    "value": "UYU",
    "label": "Uruguayan peso"
  },
  {
    "value": "UZS",
    "label": "Uzbekistani som"
  },
  {
    "value": "VEF",
    "label": "Venezuelan bolivar"
  },
  {
    "value": "VND",
    "label": "Vietnamese dong"
  },
  {
    "value": "VUV",
    "label": "Vanuatu vatu"
  },
  {
    "value": "WST",
    "label": "Samoa Tala"
  },
  {
    "value": "XAF",
    "label": "CFA Franc BEAC"
  },
  {
    "value": "XCD",
    "label": "East Caribbean dollar"
  },
  {
    "value": "XOF",
    "label": "CFA franc BCEAO"
  },
  {
    "value": "XPF",
    "label": "CFP franc"
  },
  {
    "value": "YER",
    "label": "Yemeni rial"
  },
  {
    "value": "ZAR",
    "label": "South African rand"
  },
  {
    "value": "ZMW",
    "label": "Zambian kwacha"
  },
  {
    "value": "ZWL",
    "label": "Zimbabwe Dollar"
  }
]

exports.get = () => countries