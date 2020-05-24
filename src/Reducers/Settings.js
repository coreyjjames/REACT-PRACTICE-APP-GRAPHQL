const INITIAL_STATE = {
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SETTINGS_SAVED':
            return { ...state, errors: action.errors }
        default:
            return state;
    }
}

export default reducer;