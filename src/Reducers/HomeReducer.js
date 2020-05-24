export const keys = {
    HOME_PAGE_LOADED: "HOME_PAGE_LOADED"
}

const INITIAL_STATE = {
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'HOME_PAGE_UNLOADED':
            return {};
        default:
            return state;
    }
}

export default reducer;