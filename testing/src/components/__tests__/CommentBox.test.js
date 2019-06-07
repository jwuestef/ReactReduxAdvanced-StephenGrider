import React from 'react'
// Really, in this situation, "shallow" is more appropriate since we aren't using children React components in these tests...
// ... but for this tutorial, we need to get experience with the Full DOM renderer too - which is called from the "mount" function
import { mount } from 'enzyme'

import Root from 'Root'
import CommentBox from 'components/CommentBox'



let wrapped;

beforeEach( () => {
    wrapped = mount(<Root><CommentBox /></Root>)
})

// Since we're using full dom rendering instead of shallow, we need to clean up after each test to make sure that the leftovers don't affect other tests
afterEach( () => {
    wrapped.unmount()
})



it ('has a textarea and two buttons', () => {
    expect(wrapped.find('button').length).toEqual(2)
    expect(wrapped.find('textarea').length).toEqual(1)
})



// Describe groups similar/related tests
describe('the textarea', () => {

    // Only runs for the tests inside this describe block
    beforeEach( () => {
        wrapped = mount(<Root><CommentBox /></Root>)
        wrapped.find('textarea').simulate('change', {
            target: { value: 'new comment' }
        })
        // Force the component to rerender.... setState is async, so in the component, it will take a moment until the state contains our new comment
        wrapped.update()
    })

    it ('has a textarea that users can type in', () => {
        // It's the value prop of the textarea that we really care about
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment')
    })
    
    it ('when form is submitted, textarea gets emptied', () => {
        // The textarea has a value from the beforeEach...
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment')
        // Now we can finally simulate submiting the form
        wrapped.find('form').simulate('submit')
        // Which affects the state... which is set via async...
        wrapped.update()
        expect(wrapped.find('textarea').prop('value')).toEqual('')
    })

})



