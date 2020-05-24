import React from 'react';
import { connect } from 'react-redux';
import ArticleList from '../ArticleList';

const YourFeedTab = props => {
    if (props.token) {
        const clickHandler = ev => {
            ev.preventDefault();
            props.onTabClick('feed');
        }

        return (
            <li className="nav-item">
                <a href=""
                    className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
                    onClick={clickHandler}>
                    Your Feed
                </a>
            </li>
        );
    }
    return null;
}

const GlobalFeedTab = props => {
    const clickHandler = ev => {
        ev.preventDefault();
        props.onTabClick('all');
    };
    return (
        <li className="nav-item">
            <a
                href=""
                className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
                onClick={clickHandler}>
                Global Feed
        </a>
        </li>
    );
};

const TagFilterTab = props => {
    if (!props.tag) {
        return null;
    }

    return (
        <li className="nav-item">
            <a href="" className="nav-link active">
                <i className="ion-pound"></i> {props.tag}
            </a>
        </li>
    );
};


const MainView = props => {
    return (
        <div className="col-md-9">
            <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    <YourFeedTab
                        token={props.currentUser ? props.currentUser.token : null}
                        tab={props.tab}
                        onTabClick={props.onTabClick} />

                    <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

                    <TagFilterTab tag={props.tag} />
                </ul>
            </div>

            <ArticleList
                isFeed={props.tab === 'feed' ? true : false}
                author={props.tab === 'feed' ? props.currentUser.username : null}
                tag={props.tag ? props.tag : null}
                currentPage={props.currentPage}
                onSetPage={props.onSetPage} />
        </div>
    );
}

const mapStateToProps = state => ({
    ...state.articleList,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onTabClick: (tab) => dispatch({ type: 'CHANGE_TAB', tab }),
    onSetPage: (page) => dispatch({ type: 'SET_PAGE', page })
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);