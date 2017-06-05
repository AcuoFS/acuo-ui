import {numberWithCommas} from './numbersWithCommas'


export const checkNegative = (amount, whereFnIsUsed) => {
  if(amount < 0)
    return '(' + numberWithCommas(Math.abs(amount)) + ')'
  else{
   switch(whereFnIsUsed){
    case "MarginAgreementAssets":
      return numberWithCommas(amount)
    default:
      return numberWithCommas(Math.abs(amount))
   }
  }
}
