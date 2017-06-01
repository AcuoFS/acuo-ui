export const derivTypeMapping = type => {
  switch(type){
    case 'OTC_legacy':
      return 'OTC Legacy'
    case 'OTC_bilateral':
      return 'OTC Regulatory'
    case 'OTC_clear':
      return 'OTC Cleared'
    default:
      return type
  }
}