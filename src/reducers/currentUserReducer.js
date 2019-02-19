import ACTION from "../actions/actionType";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.CURRENT_USER_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
                success: null
            };
        }
        case ACTION.CURRENT_USER_SIGNIN_RESPONSE: {
            localStorage.setItem('currentUser', JSON.stringify(action.currentUser));
            return {
                ...state,
                currentUser: action.currentUser,
                error: null,
                isFetching: false
            };
        }
        case ACTION.CURRENT_USER_SIGNUP_RESPONSE: {
            return {
                ...state,
                currentUser: action.currentUser,
                error: null,
                isFetching: false,
                success: action.success
            };
        }
        case ACTION.CURRENT_USER_ERROR: {
            return {
                ...state,
                error: action.error,
                isFetching: false
            };
        }
        case ACTION.USERS_AVATAR_RESPONSE: {
            const currentUser = {...state.currentUser};
            currentUser.photoPath = action.photoPath;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            return {
                ...state,
                currentUser
            };
        }
        case ACTION.CURRENT_USER_LOGOUT: {
            localStorage.removeItem('currentUser');
            return {
                ...state,
                currentUser: null
            };
        }
        default: {
            return state;
        }
    }
}
