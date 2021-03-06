export default {
    //ACTION TYPES
    FETCH_ALL_USERS: "FETCH_ALL_USERS",
    FETCH_USER_BY_ID: "FETCH_USER_BY_ID",
    DELETE_USER: "DELETE_USER",
    UPLOAD_USER_AVATAR: "UPLOAD_USER_AVATAR",
    FETCH_USERS_BY_NAME: "FETCH_USERS_BY_NAME",

    FETCH_ALL_PROJECTS: "FETCH_ALL_PROJECTS",
    FETCH_PROJECT_BY_ID: "FETCH_PROJECT_BY_ID",
    CLOSE_PROJECT_BY_ID: "CLOSE_PROJECT_BY_ID",
    CREATE_PROJECT: "CREATE_PROJECT",
    ADD_USER_TO_PROJECT: "ADD_USER_TO_PROJECT",

    CREATE_ACCOUNT: "CREATE_ACCOUNT",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",

    //REDUCERS TYPES
    USERS_REQUEST: "USERS_REQUEST",
    USERS_RESPONSE: "USERS_RESPONSE",
    USERS_AVATAR_RESPONSE: "USERS_AVATAR_RESPONSE",
    ONE_USER_RESPONSE: "ONE_USER_RESPONSE",
    DELETE_USER_REQUEST: "DELETE_USER_REQUEST",
    DELETE_USER_ERROR: "DELETE_USER_ERROR",
    USERS_ERROR: "USERS_ERROR",

    PROJECTS_REQUEST: "PROJECTS_REQUEST",
    PROJECTS_RESPONSE: "PROJECTS_RESPONSE",
    ONE_PROJECT_RESPONSE: "ONE_PROJECT_RESPONSE",
    CREATE_PROJECT_RESPONSE: "CREATE_PROJECT_RESPONSE",
    PROJECTS_SEARCH_USERS_RESPONSE: "PROJECTS_SEARCH_USERS_RESPONSE",
    PROJECT_ADD_USER_RESPONSE: "PROJECT_ADD_USER_RESPONSE",
    PROJECTS_ERROR: "PROJECTS_ERROR",

    CURRENT_USER_REQUEST: "CURRENT_USER_REQUEST",
    CURRENT_USER_SIGNIN_RESPONSE: "CURRENT_USER_SIGNIN_RESPONSE",
    CURRENT_USER_SIGNUP_RESPONSE: "CURRENT_USER_SIGNUP_RESPONSE",
    CURRENT_USER_ERROR: "CURRENT_USER_ERROR",
    CURRENT_USER_LOGOUT: "CURRENT_USER_LOGOUT"
};
