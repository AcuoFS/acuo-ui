//sample test for Hicham to test jenkins

import React from 'react'
import ReactDOM from 'react-dom'
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils'

import HelloWorld from '../../src/components/dashboard/sample-component/sample-component'
import {expect} from 'chai'

describe('Sample', () => {
    it('this should be true for sure', () => {
        const flag = true

        expect(flag).to.equal(true)
    })

    it('tests if sample component renders on react', () => {
        const component = renderIntoDocument(
            <HelloWorld />
        )

        const p = scryRenderedDOMComponentsWithTag(component, 'p')

        expect(p[0].textContent).to.contains('Hello World!')
    })
})