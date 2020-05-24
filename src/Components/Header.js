import React from 'react';
import { Link } from '@reach/router';

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="login" className="nav-link">
                        Sign In
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="register" className="nav-link">
                        Sign Up
                    </Link>
                </li>
            </ul>
        )
    }
    return null;
}

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="editor" className="nav-link">
                        <i className="ion-gear-a"></i>&nbsp;New Post
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="settings" className="nav-link">
                        <i className="ion-gear-a"></i>&nbsp;Settings
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`@${props.currentUser.username}`} className="nav-link">
                        <img src={props.currentUser.image}
                            className="user-pic" />
                        {props.currentUser.username}
                    </Link>
                </li>
            </ul>
        )
    }
    return null;
}

const Header = props => {
    return (
        <nav className="navbar navbar-light" >
            <div className="container">
                <Link to="/" className="navbar-brand">
                    {props.appName}
                </Link>

                <LoggedOutView currentUser={props.currentUser} />
                <LoggedInView currentUser={props.currentUser} />
            </div>
        </nav>
    );
}

export default Header;