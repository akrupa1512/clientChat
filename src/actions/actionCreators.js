import ACTION from "./actionType";

export const getAllUsersAction = (page) => {
    return {
        type: ACTION.FETCH_ALL_USERS,
        page
    };
};

export const getUserByIdAction = (id) => {
    return {
        type: ACTION.FETCH_USER_BY_ID,
        id
    };
};

export const deleteUserAction = (user, history) => {
    return {
        type: ACTION.DELETE_USER,
        user,
        history
    };
};

export const uploadUserAvatarAction = (file, id) => {
    return {
        type: ACTION.UPLOAD_USER_AVATAR,
        file,
        id
    };
};

export const createAccountAction = (createAccountData) => {
    return {
        type: ACTION.CREATE_ACCOUNT,
        createAccountData
    };
};

export const loginAction = (loginData) => {
    return {
        type: ACTION.LOGIN,
        loginData
    };
};

export const logoutAction = () => {
    return {
        type: ACTION.LOGOUT
    };
};

export const getAllProjectsAction = () => {
    return {
        type: ACTION.FETCH_ALL_PROJECTS
    };
};

export const getProjectByIdAction = (id) => {
    return {
        type: ACTION.FETCH_PROJECT_BY_ID,
        id
    };
};

export const closeProjectByIdAction = (id) => {
    return {
        type: ACTION.CLOSE_PROJECT_BY_ID,
        id
    };
};

export const searchUsersByNameAction = (name, projectId) => {
    return {
        type: ACTION.FETCH_USERS_BY_NAME,
        name,
        projectId
    };
};

export const createProjectAction = (createProjectData) => {
    return {
        type: ACTION.CREATE_PROJECT,
        createProjectData
    };
};

export const addUserToProjectAction = (userId, projectId) => {
    return {
        type: ACTION.ADD_USER_TO_PROJECT,
        userId,
        projectId
    };
};