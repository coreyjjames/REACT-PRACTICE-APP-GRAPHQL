const INITIAL_STATE = {
    email: "",
    password: "",
    username: ""
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD_AUTH':
            return { ...state, [action.key]: action.value }
        case 'LOGIN':
            return { ...state, errors: action.errors }
        case 'LOGIN_PAGE_UNLOADED':
            return {}
        case 'REGISTER':
            return { ...state, errors: action.errors }
        default:
            return state;
    }
}

export default reducer;