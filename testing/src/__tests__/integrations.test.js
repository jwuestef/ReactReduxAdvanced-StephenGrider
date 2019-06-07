import React from 'react'
import { mount } from 'enzyme'
import moxios from 'moxios'

import Root from 'Root'
import App from 'components/App'



beforeEach(() => {
    moxios.install()
    moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [
            { name: 'Fetch #1' },
            { name: 'Fetch #2' },
            { name: 'Fetch #3' }
        ]
    })
})

afterEach(() => {
    moxios.uninstall()
})



// By accepting the 'done' argument, Jest will wait until we call it before considering this test as finished
it('can fetch a list of comments and display them', (done) => {
    // Attempt to render the entire app
    const wrapped = mount(
        <Root>
            <App />
        </Root>
    )
    // Find the 'fetch comments' button and click it
    wrapped.find('.fetch-comments').simulate('click')
    // Expect to find a list of comments
    // setTimeout will always be executed successfully, so this isn't enough for Jest
    moxios.wait(() => {
        wrapped.update()
        expect(wrapped.find('li').length).toEqual(3)
        done()
        wrapped.unmount()
    })

})




