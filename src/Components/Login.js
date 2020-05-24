import React from 'react';
import ListErrors from './ListErrors';
import { connect } from 'react-redux';
import LoginForm from './Forms/loginForm';
import { Link } from '@reach/router';



class Login extends React.Component {
    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        return (
            <div className="auth-page" >
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign In</h1>
                            <p className="text-xs-center">
                                <Link to="login">
                                    Need an account?
                                </Link>
                            </p>
                            <ListErrors errors={this.props.errors} />
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    ...state.auth,
});

const mapDispatchToProps = dispatch => ({
    onUnload: () => {
        dispatch({ type: 'LOGIN_PAGE_UNLOADED' })
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);