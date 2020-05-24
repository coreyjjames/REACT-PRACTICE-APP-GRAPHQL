import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';

const DELETE_COMMENT = gql`mutation deleteComment($slug: String!, $id: String!){
    deleteComment(slug: $slug, id: $id){
        message
    }
}`;

const DeleteButton = props => {

    if (props.show) {
        return (
            <Mutation mutation={DELETE_COMMENT}>
                {(deleteComment, { loading, error }) => {
                    const del = async () => {
                        try {
                            await deleteComment({ variables: { slug: props.slug, id: props.commentId } })
                            props.onClick(props.commentId);
                        } catch (error) {

                        }
                    }
                    return (
                        <span className="mod-options">
                            <i className="ion-trash-a" onClick={del}></i>
                        </span>
                    );
                }}
            </Mutation>
        );
    }
    return null;
}



const mapDistpatchToProps = dispatch => ({
    onClick: (commentId) => dispatch({ type: "DELETE_COMMENT", commentId })
});


export default connect(() => ({}), mapDistpatchToProps)(DeleteButton);