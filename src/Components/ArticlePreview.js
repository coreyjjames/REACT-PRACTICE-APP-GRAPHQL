import React from 'react';
import { Link } from '@reach/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const FAVORITE_ARTICLE = gql`mutation favoriteArticle($slug: String!)
{
    favoriteArticle(slug: $slug) {
        article {
            title
            slug
            description
            body
            tagList
            createdAt
            updatedAt
            favorited
            favoritesCount
            author {
                username
                bio
                image
                following
            }
        }
    }
}
`;

const UN_FAVORITE_ARTICLE = gql`mutation unFavoriteArticle($slug: String!)
{
    unFavoriteArticle(slug: $slug) { 
        article {
            title
            slug
            description
            body
            tagList
            createdAt
            updatedAt
            favorited
            favoritesCount
            author {
                username
                bio
                image
                following
            }
        }
    }
}
`;


const ArticlePreview = props => {
    let article = props.article;

    let [favoriteArticle] = useMutation(FAVORITE_ARTICLE);
    let [unFavoriteArticle] = useMutation(UN_FAVORITE_ARTICLE);

    let onClickFavorite = async ev => {
        try {
            ev.preventDefault();

            if (article.favorited) {
                let { data, error } = await unFavoriteArticle({
                    variables: {
                        slug: article.slug
                    },
                    refetchQueries: [{
                        query: props.query,
                        variables: props.query_variables
                    }],
                });
            } else {
                let { data, error } = await favoriteArticle({
                    variables: {
                        slug: article.slug
                    },
                    refetchQueries: [{
                        query: props.query,
                        variables: props.query_variables
                    }],
                });
                article = data.unFavoriteArticle.article;
            }
        } catch (error) {
        }
    }

    return (
        <div className="article-preview">
            <div className="article-meta">
                <Link to={`/@${article.author.username}`}>
                    <img src={article.author.image} />
                </Link>

                <div className="info">
                    <Link to={`/@${article.author.username}`} className="author" >
                        {article.author.username}
                    </Link>
                    <span className="date">
                        {new Date(article.createdAt).toDateString()}
                    </span>
                </div>

                <div className="pull-xs-right">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={onClickFavorite}>
                        <i className="ion-heart"></i>
                        &nbsp;
                        {article.favoritesCount}
                    </button>
                </div>
            </div>
            <Link to={`/article/${article.slug}`} className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
                <ul className="tag-list">
                    {article.tagList.map(tag => {
                        return (
                            <li className="tag-default tag-pill tag-outline" key={tag}>
                                {tag}
                            </li>
                        );
                    })}
                </ul>
            </Link>
        </div>
    );
}

export default ArticlePreview;