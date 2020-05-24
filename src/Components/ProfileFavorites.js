import React from 'react';
import { Profile, mapStateToProps } from './Profile';
import { Link } from '@reach/router';
import { connect } from 'react-redux';



const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch({ type: 'PROFILE_FAVORITES_PAGE_LOADED' }),
});

class ProfileFavorites extends Profile {

    componentWillMount() {
        this.props.onLoad();
    }
    componentWillUnmount() {

    }
    renderTabs() {
        this.myArticle = false;
        this.favorited = true;
        return (
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={`/@${this.username}`}>
                        My Articles
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link active"
                        to={`/@${this.username}/favorites`}>
                        Favorited Articles
                    </Link>
                </li>
            </ul>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);