import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';


const CREATE_COMMENT = gql`mutation createComment($slug: String!, $comment: InputComment!){
    createComment(slug: $slug, comment: $comment){
        comment {
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

class CommentInput extends React.Component {
    constructor() {
        super();
        this.state = {
            body: ''
        };

        this.setBody = ev => {
            this.setState({ body: ev.target.value });
        };
    }

    render() {
        return (
            <Mutation mutation={CREATE_COMMENT} >
                {(createComment, { loading, error }) => {
                    this.onCreateComment = async (ev) => {
                        try {
                            ev.preventDefault();
                            let { data } = await createComment({ variables: { slug: this.props.slug, comment: { body: this.state.body } } });
                            this.setState({ body: '' });
                            this.props.onSubmit(data.createComment.comment, null)
                        } catch (error) {
                            console.log(error.graphQLErrors)
                            this.props.onSubmit(null, error)
                        }
                    };
                    return (
                        <form className="card comment-form" onSubmit={this.onCreateComment}>
                            <div className="card-block">
                                <textarea className="form-control"
                                    placeholder="Write a Comment..."
                                    value={this.state.body}
                                    onChange={this.setBody}
                                    row="3"></textarea>
                            </div>
                            <div className="card-footer">
                                <img
                                    src={this.props.currentUser.image}
                                    className="comment-author-img" />
                                <button
                                    className="btn btn-sm btn-primary"
                                    type="submit">
                                    Post Comment
                                </button>
                            </div>
                        </form>
                    );
                }}
            </Mutation>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmit: (comment, error) => dispatch({ type: "ADD_COMMENT", comment, error })
});

export default connect(() => ({}), mapDispatchToProps)(CommentInput);