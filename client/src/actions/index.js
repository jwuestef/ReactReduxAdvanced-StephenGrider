import axios from 'axios'

import { AUTH_USER, AUTH_ERROR } from './types'



// Setup of an action creator for redux-thunk... which allows us to return either an action object... OR a FUNCTION!
// export const signup = ({ email, password }) => {
//     return function(dispatch) {

//     }
// }

// ...reafactor to arrow functions...
export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/signup', formProps)
        dispatch({
            type: AUTH_USER,
            payload: response.data.token
        })
        localStorage.setItem('token', response.data.token)
        callback()
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Email in use'
        })        
    }
}



export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/signin', formProps)
        dispatch({
            type: AUTH_USER,
            payload: response.data.token
        })
        localStorage.setItem('token', response.data.token)
        callback()
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Invalid login credentials'
        })        
    }
}



export const signout = () => {
    localStorage.removeItem('token')
    return {
        type: AUTH_USER,
        payload: ''
    }
}


