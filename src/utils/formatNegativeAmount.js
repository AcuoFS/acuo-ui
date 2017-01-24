import {numberWithCommas} from './numbersWithCommas'


export const checkNegative = (amount) => {
  if(amount < 0)
    return '(' + numberWithCommas(Math.abs(amount)) + ')'
  else
    return  numberWithCommas(Math.abs(amount))
}