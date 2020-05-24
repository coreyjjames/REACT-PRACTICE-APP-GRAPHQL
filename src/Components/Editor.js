import React from 'react';
import { connect } from 'react-redux';
import ListErrors from './ListErrors';
import EditorFrom from './Forms/editorForm';
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";

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
    }`

class Editor extends React.Component {
    componentWillUnmount() {
        this.props.onUnLoad();
    }
    render() {
        return (
            <div className="editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">

                            <ListErrors errors={this.props.errors}></ListErrors>

                            {<Query query={GET_ARTICLE_DATA} variables={{ slug: this.props.slug }} fetchPolicy="no-cache">
                                {({ loading, error, data }) => {
                                    const article = data ? (data.article ? data.article.article : null) : null;
                                    if (!this.props.editorLoaded && !loading)
                                        this.props.onLoad(article, true);
                                    return (
                                        <EditorFrom />
                                    );
                                }}
                            </Query>}

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


const mapStateToProps = state => ({
    ...state.editor
});

const mapDistpatchToProps = dispatch => ({
    onLoad: (article, editorLoaded) => { dispatch({ type: 'EDITOR_PAGE_LOADED', article, editorLoaded }) },
    onUnLoad: () => { dispatch({ type: 'EDITOR_PAGE_UNLOADED' }) }
});

export default connect(mapStateToProps, mapDistpatchToProps)(Editor);