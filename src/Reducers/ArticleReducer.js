
const INITIAL_STATE = {
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ARTICLES':
            return { ...state, articles: action.articles };
        case 'ARTICLE_PAGE_LOADED':
            return { ...state, article: action.article, comments: action.comments }
        case 'ARTICLE_PAGE_UNLOADED':
            return {...state, article: null, comments: null, commentErrors: null}
        case 'ADD_COMMENT':
            return {
                ...state,
                commentErrors: action.error,
                comments: action.error || !action.comment ? null : ([action.comment]).concat(state.comments || [])
            };
        case 'DELETE_COMMENT':
            const commentId = action.commentId
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== commentId)
            };
        default:
            return state;
    }
}

export default reducer;