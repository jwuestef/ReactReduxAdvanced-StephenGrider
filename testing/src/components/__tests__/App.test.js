import React from 'react'
import { shallow } from 'enzyme'

import App from 'components/App'
import CommentBox from 'components/CommentBox'
import CommentList from 'components/CommentList'



let wrapped;

// Gets called before every single test that is in this file
beforeEach( () => {
    // The wrapped component - the component that is wrapped with additional functionality
    wrapped = shallow(<App />)
})



it('shows a comment box', () => {
    expect(wrapped.find(CommentBox).length).toEqual(1)
})



it('shows a comment list', () => {
    expect(wrapped.find(CommentList).length).toEqual(1)
})


