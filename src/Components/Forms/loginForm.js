import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';

const LOGIN = gql`mutation login($email: String!, $password: String!)
{
    login(email: $email, password:$password){
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

const LoginForm = props => {
    let email = useSelector(state => state.auth.email);
    let password = useSelector(state => state.auth.password);
    let [loginUser, { loading }] = useMutation(LOGIN);
    const dispatch = useDispatch();


    return (
        <form onSubmit={async ev => {
            ev.preventDefault();
            try {
                const { data } = await loginUser({ variables: { email, password } });
                dispatch({ type: 'LOGIN', payload: data.login, errors: null });
            } catch (err) {
                dispatch({ type: 'LOGIN', payload: null, errors: err });
            }
        }}>
            <fieldset>
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
                    Sign In
                </button>
            </fieldset>
        </form>
    )
}

export default LoginForm;