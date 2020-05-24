export const keys = {
}

const INITIAL_STATE = {
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'EDITOR_PAGE_LOADED':
            return {
                ...state,
                articleSlug: action.article ? action.article.slug : '',
                title: action.article ? action.article.title : '',
                description: action.article ? action.article.description : '',
                body: action.article ? action.article.body : '',
                tagInput: '',
                tagList: action.article ? action.article.tagList : [],
                editorLoaded: action.editorLoaded
            };
        case 'EDITOR_PAGE_UNLOADED':
            return { };
        case 'ARTICLE_SUBMITTED':
            return { ...state, errors: action.errors };
        case 'ADD_TAG':
            return {
                ...state,
                tagList: state.tagList.concat([state.tagInput]),
                tagInput: ''
            };
        case 'REMOVE_TAG':
            return {
                ...state,
                tagList: state.tagList.filter(tag => tag !== action.tag)
            };
        case 'UPDATE_FIELD_EDITOR':
            return { ...state, [action.key]: action.value };
        default:
            return state;
    }
}

export default reducer;