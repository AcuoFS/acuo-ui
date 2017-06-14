//import {isEmptyCounterparty} from '../src/components/margin-agreement/sub-components/MarginAgreementAssets'
import {fromJS} from 'immutable'
import {expect} from 'chai';

const test1 = fromJS(
  [{
    "groupName": "Group 1",
    "data": []
  }])

const test2 = fromJS(
  [])

const test3 = fromJS(
  [{
    "groupName": "Group 1"
  }])

// describe('recon data check - counterparty is empty', () => {
//
//   describe('3 different formats', () => {
//     it('data is an empty list', () => {
//       expect(isEmptyCounterparty(test1)).to.equal(true)
//     })
//
//     it('counterparty is an empty list', () => {
//       expect(isEmptyCounterparty(test2)).to.equal(true)
//     })
//
//     it('data property is non existing', () => {
//       expect(isEmptyCounterparty(test3)).to.equal(true)
//     })
//   })
// })
