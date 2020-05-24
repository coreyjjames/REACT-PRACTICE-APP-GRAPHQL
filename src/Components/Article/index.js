import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import marked from 'marked';
import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';

const GET_ARTICLE_DATA = gql`
      query article($slug: String!){
        article(slug: $slug) {
            article {
                slug
                title
                description
                body
                favorited
                favoritesCount
                tagList
                author {
                    username
                    email
                    token
                    bio
                    image
                }
                createdAt
                updatedAt
            }
        }
        comments(slug: $slug){
            comments {
                id
                body
                createdAt
                updatedAt
                author {
                    username
                    email
                    token
                    bio
                    image
                }
            }
        }
      }`;

class Article extends React.Component {
    constructor() {
        super();
        this.loaded = false;
    }
    componentWillMount() {
    }

    componentWillUnmount() {
        this.loaded = false;
        this.props.onUnLoad();
    }

    render() {
        return (
            <Query fetchPolicy="no-cache" query={GET_ARTICLE_DATA} variables={{ slug: this.props.id }}>
                {({ loading, error, data }) => {
                    if (!data) {
                        return null;
                    }
                    if (!this.loaded) {
                        this.props.onLoad(data.article.article, data.comments.comments);
                        this.loaded = true;
                    }
                    let article = this.props.article;
                    let comments = this.props.comments;

                    if (article && comments) {
                        const markup = { __html: marked(article.body) };
                        const canModify = (this.props.currentUser && (this.props.currentUser.username === article.author.username));
                        return (
                            <div className="article-page">
                                <div className="banner">
                                    <div className="container">
                                        <h1>{article.title}</h1>
                                        <ArticleMeta
                                            article={article}
                                            canModify={canModify} />
                                    </div>
                                </div>

                                <div className="container page">
                                    <div className="row article-content">
                                        <div className="col-xs-12">
                                            <div dangerouslySetInnerHTML={markup}></div>
                                            <ul className="tag-list">
                                                {
                                                    article.tagList.map(tag => {
                                                        return (
                                                            <li
                                                                className="tag-default tag-pill tag-outline"
                                                                key={tag}>
                                                                {tag}
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="article-actions">

                                    </div>

                                    <div className="row">
                                        <CommentContainer
                                            comments={comments || {}}
                                            errors={error}
                                            slug={this.props.id}
                                            currentUser={this.props.currentUser} />
                                    </div>
                                </div>

                            </div>
                        );
                    }
                    return null;
                }
                }</Query>
        )
    }
}

const mapStateToProps = state => ({
    ...state.article,
    currentUser: state.common.currentUser
});

const mapDistpatchToProps = dispatch => ({
    onLoad: (article, comments) => dispatch({ type: 'ARTICLE_PAGE_LOADED', article, comments }),
    onUnLoad: () => dispatch({ type: 'ARTICLE_PAGE_UNLOADED' })
});

export default connect(mapStateToProps, mapDistpatchToProps)(Article);