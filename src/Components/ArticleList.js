import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';


const GET_ARTICLE = gql`query articles($limit: Int, $offset: Int, $tag: [String], $author: String, $favorited: String) 
    {
        articles(limit: $limit, offset: $offset, tag: $tag, author: $author, favorited: $favorited){
            articles {
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
            articlesCount
        },
        feed(limit: $limit, offset: $offset){
            articles {
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
            articlesCount
        }
    }
`;

const ArticleList = props => {
    let limit = props.limit ? props.limit : 10;
    let offset = props.currentPage ? (props.currentPage * limit) : 0;

    const variables = {
        limit: limit,
        offset: offset ? offset : undefined,
        tag: props.tag ? props.tag : undefined,
        author: props.author,
        favorited: props.favorited
    };

    const { loading, error, data } = useQuery(GET_ARTICLE, {
        variables: variables,
        //pollInterval: 5000,
        fetchPolicy: "cache-and-network"
    })

    if (loading) {
        return (
            <div className="article-preview">Loading...</div>
        );
    }
    if (error) {
        return (
            <div className="article-preview">Error</div>
        )
    }

    const articles = (props.isFeed) ? data.feed.articles : data.articles.articles;
    const articlesCount = (props.isFeed) ? data.feed.articlesCount : data.articles.articlesCount;

    if (articlesCount === 0) {
        return (
            <div className="article-preview">
                No articles are here... yet.
            </div>
        );
    }

    return (
        <div>
            {
                articles.map(article => {
                    return (
                        <ArticlePreview article={article} key={article.slug} query={GET_ARTICLE} query_variables={variables} />
                    );
                })
            }

            <ListPagination
                articleCount={articlesCount}
                currentPage={props.currentPage ? props.currentPage : 0}
                onSetPage={props.onSetPage} />
        </div>
    );
}

export default ArticleList;