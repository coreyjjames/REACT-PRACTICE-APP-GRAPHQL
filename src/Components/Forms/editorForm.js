import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import gql from 'graphql-tag';

const CREATE_ARTICLE = gql`mutation createArticle($article: InputArticle!) 
{
    createArticle(article: $article) {
        article{
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
}`;

const UPDATE_ARTICLE = gql`mutation updateArticle($slug: String!, $article: InputArticle!) 
{
    updateArticle(slug: $slug, article: $article) {
        article{
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
}`;


const EditorForm = props => {
    let [createArticle] = useMutation(CREATE_ARTICLE);
    let [updateArticle] = useMutation(UPDATE_ARTICLE);

    const updateFieldEvent = key => ev => {
        props.onUpdateField(key, ev.target.value);
    }

    let changeTitle = updateFieldEvent('title');
    let changeDescription = updateFieldEvent('description');
    let changeBody = updateFieldEvent('body');
    let changeTagInput = updateFieldEvent('tagInput');

    // When entering tags, hitting enter adds a tag to the list
    let watchForEnter = ev => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            props.onAddTag();
        }
    };

    let removeTagHandler = tag => () => {
        props.onRemoveTag(tag);
    };

    let onSubmitFrom = async ev => {
        let payload = {};
        try {
            ev.preventDefault();

            if (props.articleSlug) {
                let { data, error } = await updateArticle({
                    variables: {
                        slug: props.articleSlug,
                        article: {
                            title: props.title,
                            description: props.description,
                            body: props.body,
                            tagList: props.tagList
                        }
                    }
                });
                payload = { article: data.updateArticle.article }
            } else {
                let { data, error } = await createArticle({
                    variables: {
                        article: {
                            title: props.title,
                            description: props.description,
                            body: props.body,
                            tagList: props.tagList
                        }
                    }
                });
                payload = { article: data.createArticle.article }
            }
            props.onSubmit(payload);
        } catch (error) {
            payload.error = error;
            props.onSubmit(payload);
        }
    }

    return (
        <form>
            <fieldset>

                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Article Title"
                        value={props.title}
                        onChange={changeTitle} />
                </fieldset>

                <fieldset className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="What's this article about?"
                        value={props.description}
                        onChange={changeDescription} />
                </fieldset>

                <fieldset className="form-group">
                    <textarea
                        className="form-control"
                        rows="8"
                        placeholder="Write your article (in markdown)"
                        value={props.body}
                        onChange={changeBody}>
                    </textarea>
                </fieldset>

                <fieldset className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Enter tags"
                        value={props.tagInput}
                        onChange={changeTagInput}
                        onKeyUp={watchForEnter} />

                    <div className="tag-list">
                        {
                            (props.tagList || []).map(tag => {
                                return (
                                    <span className="tag-default tag-pill" key={tag}>
                                        <i className="ion-close-round"
                                            onClick={removeTagHandler(tag)}>
                                        </i>
                                        {tag}
                                    </span>
                                );
                            })
                        }
                    </div>
                </fieldset>

                <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    //disabled={props.inProgress}
                    onClick={onSubmitFrom}>
                    Publish Article
                </button>

            </fieldset>
        </form>
    )
};

const mapStateToProps = state => ({
    ...state.editor
});

const mapDistpatchToProps = dispatch => ({
    onAddTag: () => { dispatch({ type: 'ADD_TAG' }) },
    onRemoveTag: (tag) => { dispatch({ type: 'REMOVE_TAG', tag }) },
    onSubmit: (payload) => { dispatch({ type: 'ARTICLE_SUBMITTED', payload }) },
    onUpdateField: (key, value) => { dispatch({ type: 'UPDATE_FIELD_EDITOR', key, value }) }
});
export default connect(mapStateToProps, mapDistpatchToProps)(EditorForm);