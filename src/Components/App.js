import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { Router, navigate } from "@reach/router";
import { API_ROOT } from '../ApolloClient';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Settings from './Settings';
import Article from './Article';
import Profile from './Profile';
import ProfileFavorites from './ProfileFavorites';
import Editor from './Editor';

const GET_USER = {
  query: `
    query {
      user {
        username
        email
        token
        bio
        image
      }
    }`
};

class App extends React.Component {
  async componentWillMount() {
    try {
      this.token = window.localStorage.getItem('jwt');
      let { data } = await axios({
        url: API_ROOT,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'authorization': "Token " + this.token
        },
        data: GET_USER
      });

      this.props.onLoad(data.data, this.token);
    } catch (error) {
      console.log(error);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      console.log(nextProps.redirectTo);
      navigate(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }
  render() {
    return (
      <div>
        <Header
          currentUser={this.props.currentUser}
          appName={this.props.appName} />
        {this.props.appLoaded &&
          <Router primary={false}>
            <Home path="/" />
            <Login path="/login" />
            <Register path="/register" />
            <Settings path="/settings" />
            <Article path="/article/:id" />
            <Profile path="/:username" />
            <ProfileFavorites path="/:username/favorites" />
            <Editor path="/editor" />
            <Editor path="/editor/:slug" />
          </Router>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.common
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () => { dispatch({ type: 'REDIRECT' }) },
  onLoad: (payload, token, client) => { dispatch({ type: 'APP_LOAD', payload, token, client }) }
});


export default connect(mapStateToProps, mapDispatchToProps)(App);