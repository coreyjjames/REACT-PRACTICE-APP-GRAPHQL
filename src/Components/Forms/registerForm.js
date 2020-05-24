import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';

const REGISTER = gql`mutation register($email: String!, $password: String!, $username: String!)
{
    register(email: $email, password: $password, username: $username){
        user {
            username
            email
            token
            bio
            image
        }
    }
}
`;

const RegisterForm = props => {
    let username = useSelector(state => state.auth.username);
    let email = useSelector(state => state.auth.email);
    let password = useSelector(state => state.auth.password);
    let [registerUser, { loading }] = useMutation(REGISTER);
    const dispatch = useDispatch();


    return (
        <form onSubmit={async ev => {
            ev.preventDefault();
            try {
                const { data } = await registerUser({ variables: { email, password, username } });
                dispatch({ type: 'REGISTER', payload: data.register, errors: null });
            } catch (err) {
                dispatch({ type: 'REGISTER', payload: null, errors: err });
            }
        }}>
            <fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={ev => { dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'username', value: ev.target.value }) }}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={ev => { dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'email', value: ev.target.value }) }}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={ev => { dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'password', value: ev.target.value }) }}
                    />
                </fieldset>
                <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={loading}>
                    Sign Up
                </button>
            </fieldset>
        </form>
    )
}

export default RegisterForm;