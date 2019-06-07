import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import * as actions from '../../actions'



class Signup extends Component {

    onSubmit = (formProps) => {
        this.props.signup(formProps, () => {
            this.props.history.push('/feature')
        })
    }

    render() {
        const { handleSubmit } = this.props   // Provided by redux forms
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Email</label>
                    <Field name="email" type="text" component="input" autoComplete="none" />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field name="password" type="password" component="input" autoComplete="none" />
                </fieldset>
                <div>{this.props.errorMessage}</div>
                <button>Sign up!</button>
            </form>
        )
    }
}



function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage }
}



// Allow us to apply multiple higher order components as I want - applied in series
export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(Signup)
