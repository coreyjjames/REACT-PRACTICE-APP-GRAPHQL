import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useSelector, useDispatch } from 'react-redux';
import gql from 'graphql-tag';

const UPDATE_USER = gql`mutation updateUser($user: InputUser!) 
{
    updateUser(user: $user) {
        user {
            username
            email
            token
            bio
            image
        }
    }
}`;

const SettingsForm = props => {
    const currentUser = useSelector(state => state.common.currentUser);
    const [user, setUser] = useState({});
    if (user.username === undefined && currentUser) {
        setUser({ ...currentUser, password: "" })
    }

    let dispatch = useDispatch();

    let [updateUser, { loading }] = useMutation(UPDATE_USER);

    let onSubmitFrom = async ev => {
        try {
            ev.preventDefault();
            let { data, error } = await updateUser({
                variables: {
                    user: {
                        username: user.username,
                        email: user.email,
                        bio: user.bio,
                        image: user.image,
                        password: user.password
                    }
                }
            });
            
            dispatch({ type: 'SETTINGS_SAVED', payload: data.updateUser, errors: null });
        } catch (error) {
            dispatch({ type: 'SETTINGS_SAVED', payload: null, errors: error });
        }
    }

    return (
        <form onSubmit={onSubmitFrom}>
            <fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="URL of profile picture"
                        value={user.image}
                        onChange={ev => { setUser({ ...user, image: ev.target.value }); }} />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Username"
                        value={user.username}
                        onChange={ev => { setUser({ ...user, username: ev.target.value }); }} />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Short bio about you"
                        value={user.bio}
                        onChange={ev => { setUser({ ...user, bio: ev.target.value }); }} />
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="email"
                        value={user.email}
                        onChange={ev => { setUser({ ...user, email: ev.target.value }); }} />
                </fieldset><fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="New Password"
                        value={user.password}
                        onChange={ev => { setUser({ ...user, password: ev.target.value }); }} />
                </fieldset>
                <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={loading} >
                    Update Settings
                </button>
            </fieldset>
        </form>
    )
};

export default SettingsForm;