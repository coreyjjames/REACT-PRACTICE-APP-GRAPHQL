import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';

const DELETE_ARTICLE = gql`mutation deleteArticle($slug: String!){
    deleteArticle(slug: $slug) {    
        message
    }
}`

const ArticleActions = props => {
    const article = props.article;
    let [deleteArticle] = useMutation(DELETE_ARTICLE);

    const del = async () => {
        // return new article list and delete selected article
        try {
            props.onClickDelete()
            await deleteArticle({ variables: { slug: article.slug } })
        } catch (error) {
        }
    };

    if (props.canModify) {
        return (
            <span>
                <Link
                    to={`/editor/${article.slug}`}
                    className="btn btn-outline-secondary btn-sm">
                    <i className="ion-edit"></i> Edit Article
                </Link>

                <button className="btn btn-outline-danger btn-sm" onClick={del}>
                    <i className="ion-trash-a"></i> Delete Article
                </button>
            </span>
        );
    }

    return (
        <span></span>
    );
}


const mapDistpatchToProps = dispatch => ({
    onClickDelete: () => dispatch({ type: 'DELETE_ARTICLE' })
});

export default connect(() => ({}), mapDistpatchToProps)(ArticleActions);