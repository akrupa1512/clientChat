import ACTION from "../actions/actionType";

const initialState = {
    users: [],
    page: 1,
    total: 0,
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.USERS_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            };
        }
        case ACTION.USERS_RESPONSE: {
            return {
                ...state,
                users: action.users,
                page: action.page,
                total: action.total,
                error: null,
                isFetching: false
            };
        }
        case ACTION.USERS_AVATAR_RESPONSE: {
            const users = [...state.users];
            const index = users.findIndex((u) => u._id === action.id);
            if (index !== -1) {
                users[index].photoPath = action.photoPath;
            }
            return {
                ...state,
                users,
                error: null,
                isFetching: false
            };
        }
        case ACTION.USERS_ERROR: {
            return {
                ...state,
                error: action.error,
                isFetching: false
            };
        }
        case ACTION.ONE_USER_RESPONSE: {
            const users = [...state.users];
            const index = users.findIndex((u) => u._id === action.user._id);
            if (index === -1) {
                users.push(action.user);
            } else {
                users[index] = action.user;
            }
            return {
                ...state,
                users,
                error: null,
                isFetching: false
            };
        }
        case ACTION.DELETE_USER_REQUEST: {
            const users = [...state.users];
            const index = users.findIndex((u) => u._id === action.user._id);
            if (index !== -1) {
                users.splice(index, 1);
            }
            return {
                ...state,
                users
            };
        }
        case ACTION.DELETE_USER_ERROR: {
            const users = [...state.users];
            users.push(action.user);
            return {
                ...state,
                users
            };
        }
        default: {
            return state;
        }
    }
}
