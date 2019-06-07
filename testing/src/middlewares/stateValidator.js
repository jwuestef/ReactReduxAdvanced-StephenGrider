// Library that lets us validate schemas... TinyValidator4... jsonschema.net is great tool to generate it
import tv4 from 'tv4'

import stateSchema from 'middlewares/stateSchema'



// This Middleware's Purpose: If the new store's state is invalid - log errors!

export default ({ dispatch, getState }) => (next) => (action) => {
    // Immediately send the action on to the next middleware
    next(action)

    // validate the state's schema, comparing against the format we specify in the stateSchema file
    // Returns true or false...
    // If invalid, show warning
    if (!tv4.validate(getState(), stateSchema)) {
        console.warn('Invalid state schema detected')
    }

}
