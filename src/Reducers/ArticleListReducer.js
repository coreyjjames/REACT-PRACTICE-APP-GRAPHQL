
const INITIAL_STATE = {
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'HOME_PAGE_LOADED':
            return { ...state, tab: 'feed', currentPage: 0 };
        case 'HOME_PAGE_UNLOADED':
            return {};
        case 'PROFILE_PAGE_LOADED':
            return { ...state, articles: action.articles, articleCount: action.articleCount };
        case 'PROFILE_PAGE_UNLOADED':
            return {};
        case 'PROFILE_FAVORITES_PAGE_LOADED':
            return { ...state, currentPage: 0 };
        case 'PROFILE_FAVORITES_PAGE_UNLOADED':
            return {};
        case 'CHANGE_TAB':
            return { ...state, tab: action.tab, tag: null, currentPage: 0 };
        case 'APPLY_TAG_FILTER':
            return { ...state, tab: null, tag: action.tag, currentPage: 0 }
        case 'SET_PAGE':
            return { ...state, currentPage: action.page };
        default:
            return state;
    }
};

export default reducer;