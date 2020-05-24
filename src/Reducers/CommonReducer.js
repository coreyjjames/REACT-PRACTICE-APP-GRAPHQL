const INITIAL_STATE = {
    appName: 'Conduit'
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'APP_LOAD':
            return {
                ...state,
                token: action.token,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null,
                client: action.client
            };
        case 'REDIRECT':
            return { ...state, redirectTo: null };
        case 'LOGIN':
            return {
                ...state,
                redirectTo: (action.error || !action.payload) ? null : '/',
                token: (action.error || !action.payload) ? null : action.payload.user.token,
                currentUser: (action.error || !action.payload) ? null : action.payload.user,
            }
        case 'REGISTER':
            return {
                ...state,
                redirectTo: (action.error || !action.payload) ? null : '/',
                token: (action.error || !action.payload) ? null : action.payload.user.token,
                currentUser: (action.error || !action.payload) ? null : action.payload.user,
            }
        case 'LOGOUT':
            return {
                ...state,
                redirectTo: '/',
                token: null,
                currentUser: null,
            }
        case 'SETTINGS_SAVED':
            return {
                ...state,
                redirectTo: (action.error || !action.payload) ? null : '/',
                currentUser: (action.error || !action.payload) ? state.currentUser : action.payload.user,
            }
        case 'ARTICLE_SUBMITTED':
            const redirectUrl = (action.payload.error) ? null : `/article/${action.payload.article.slug}`;
            return {
                ...state,
                redirectTo: redirectUrl
            };
        case 'DELETE_ARTICLE':
            return { ...state, redirectTo: '/' };
        default:
            return state;
    }
}

export default reducer;