import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import ArticleList from './ArticleList';
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';


const GET_PROFILE = gql`query profile($username: String!)
{
    profile(username: $username) {
        user {
            username
            bio
            image
            following
        }
    }
}
`;

const FOLLOW_USER = gql`mutation followUser($username: String!)
{
    followUser(username: $username){
        user {
            username
            bio
            image
            following
        }
    }
}
`;

const UNFOLLOW_USER = gql`mutation unFollowUser($username: String!)
{
    unFollowUser(username: $username){
        user {
            username
            bio
            image
            following
        }
    }
}
`;

class Profile extends React.Component {
    componentWillMount() {
        this.props.onLoad();
    }
    componentWillUnmount() {
    }

    renderTabs() {
        this.myArticle = true;
        this.favorited = false;
        return (
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <Link
                        className="nav-link active"
                        to={`/@${this.username}`}>
                        My Articles
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={`/@${this.username}/favorites`}>
                        Favorited Articles
                        </Link>
                </li>
            </ul>
        );
    }

    render() {
        this.username = this.props.username.slice(1);
        return (
            <Query query={GET_PROFILE} variables={{ username: this.username }}>
                {({ loading, error, data }) => {
                    const profile = data ? (data.profile ? data.profile.user : null) : null;
                    if (!profile) {
                        return null;
                    }
                    const isUser = (this.props.currentUser &&
                        (profile.username === this.props.currentUser.username));

                    return (
                        <div className="profile-page">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-12 col-md-10 offset-md-1">

                                        <img src={profile.image} className="user-img" />
                                        <h4>{profile.username}</h4>
                                        <p>{profile.bio}</p>

                                        <EditProfileSettings isUser={isUser} />
                                        <FollowUserButton
                                            isUser={isUser}
                                            user={profile} />
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-12 col-md-10 offset-md-1">
                                        <div className="article-toggle">
                                            {this.renderTabs()}
                                        </div>

                                        <ArticleList
                                            currentPage={this.props.currentPage}
                                            onSetPage={this.props.onSetPage}
                                            author={this.myArticle ? this.username : null}
                                            favorited={this.favorited ? this.username : null} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query>
        );
    }
}

const mapStateToProps = state => ({
    ...state.articleList,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onFollow: username => dispatch({
        type: 'FOLLOW_USER',
        // Follow User Here
    }),
    onUnFollow: username => dispatch({
        type: 'UNFOLLOW_USER',
        // UnFollow User
    }),
    onSetPage: (page) => dispatch({ type: 'SET_PAGE', page }),
    onLoad: () => dispatch({ type: 'PROFILE_PAGE_LOADED' }),
    onUnLoad: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' })
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile as Profile, mapStateToProps as mapStateToProps };



const EditProfileSettings = props => {
    if (props.isUser) {
        return (
            <Link
                to="/settings"
                className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-gear-a"></i> Edit Profile Settings
            </Link>
        );
    }
    return null;
}


const FollowUserButton = props => {

    let [followUser] = useMutation(FOLLOW_USER);
    let [unFollowUser] = useMutation(UNFOLLOW_USER);

    if (props.isUser) {
        return null;
    }

    let classes = "btn btn-sm action-btn";
    if (props.user.following) {
        classes += " btn-secondary";
    } else {
        classes += " btn-outline-secondary";
    }

    const handleClick = async ev => {
        try {
            ev.preventDefault();
            if (props.user.following) {
                await unFollowUser(
                    {
                        variables: { username: props.user.username },
                        update: (cache, { data: { unFollowUser } }) => {
                            try {
                                let existingProfile = cache.readQuery({ query: GET_PROFILE, variables: { username: props.user.username } });
                                existingProfile.profile.user.following = unFollowUser.user.following;
                                cache.writeQuery({
                                    query: GET_PROFILE,
                                    data: existingProfile,
                                });
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    });
            } else {
                await followUser(
                    {
                        variables: { username: props.user.username },
                        update: (cache, { data: { followUser } }) => {
                            try {
                                let existingProfile = cache.readQuery({ query: GET_PROFILE, variables: { username: props.user.username } });
                                existingProfile.profile.user.following = followUser.user.following;
                                cache.writeQuery({
                                    query: GET_PROFILE,
                                    data: existingProfile,
                                });
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    });
            }
        } catch (err) {

        }
    }

    return (
        <button
            className={classes}
            onClick={handleClick}>
            <i className="ion-plus-round"></i>
            &nbsp;
            {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
        </button>
    )
}