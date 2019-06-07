
// ALL MIDDLEWARE STARTS WITH THIS FORMAT
// export default function({ dispatch }) {   // the ability to dispatch an action
//     return function(next) {   // the next middleware
//         return function(action) {   // the action being passed in
            
//         }
//     }
// }



export default ({ dispatch }) => (next) => (action) => {
    // Check to see if the action has a promise on it's payload property
    // If it doesn't, then sent the action on to the next middleware
    // If it does, then wait for it to resolve

    if (!action.payload || !action.payload.then) {
        return next(action)
    }

    // Wait for the promise to resolve, and then create a new action with that data and dispatch it
    action.payload.then( (response) => {
        const newAction = { ...action, payload: response }
        dispatch(newAction)
    })
    
}


