import { takeLatest } from "redux-saga/effects";
import ACTION from "../actions/actionType";
import * as userSaga from "./userSaga";
import * as projectSaga from "./projectSaga";
import * as currentUserSaga from "./currentUserSaga";

function* rootSaga() {
    yield takeLatest(ACTION.FETCH_ALL_USERS, userSaga.fetchAllUsers);
    yield takeLatest(ACTION.FETCH_USER_BY_ID, userSaga.fetchUserById);
    yield takeLatest(ACTION.DELETE_USER, userSaga.deleteUser);
    yield takeLatest(ACTION.UPLOAD_USER_AVATAR, userSaga.uploadUserAvatar);

    yield takeLatest(ACTION.CREATE_ACCOUNT, currentUserSaga.createAccount);
    yield takeLatest(ACTION.LOGIN, currentUserSaga.loginAccount);
    yield takeLatest(ACTION.LOGOUT, currentUserSaga.logout);

    yield takeLatest(ACTION.FETCH_ALL_PROJECTS, projectSaga.fetchAllProjects);
    yield takeLatest(ACTION.FETCH_USERS_BY_NAME, projectSaga.fetchUsersByName);
    yield takeLatest(ACTION.FETCH_PROJECT_BY_ID, projectSaga.fetchProjectById);
    yield takeLatest(ACTION.CLOSE_PROJECT_BY_ID, projectSaga.shutProjectById);
    yield takeLatest(ACTION.CREATE_PROJECT, projectSaga.createNewProject);
    yield takeLatest(ACTION.ADD_USER_TO_PROJECT, projectSaga.addUserToProject);
}

export default rootSaga;
