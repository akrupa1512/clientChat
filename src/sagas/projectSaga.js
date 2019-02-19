import {put} from "redux-saga/effects";
import ACTION from "../actions/actionType";
import {getAllProjects, getProjectById, closeProjectById,
    createProject, searchUsersByName, addToProjectUser} from "../api/rest/restController";

export function* fetchAllProjects() {
    yield put({type: ACTION.PROJECTS_REQUEST});
    try {
        const {data} = yield getAllProjects();
        yield put({type: ACTION.PROJECTS_RESPONSE, projects: data});
    } catch (e) {
        yield put({type: ACTION.PROJECTS_ERROR, error: e});
    }
}

export function* fetchProjectById({id}) {
    yield put({type: ACTION.PROJECTS_REQUEST});
    try {
        const {data} = yield getProjectById(id);
        yield put({type: ACTION.ONE_PROJECT_RESPONSE, project: data});
    } catch (e) {
        yield put({type: ACTION.PROJECTS_ERROR, error: e});
    }
}

export function* shutProjectById({id}) {
    yield put({type: ACTION.PROJECTS_REQUEST});
    try {
        const {data} = yield closeProjectById(id);
        yield put({type: ACTION.ONE_PROJECT_RESPONSE, project: data});
    } catch (e) {
        yield put({type: ACTION.PROJECTS_ERROR, error: e});
    }
}

export function* createNewProject({createProjectData}) {
    yield put({type: ACTION.PROJECTS_REQUEST});
    try {
        const {data} = yield createProject(createProjectData);
        yield put({type: ACTION.CREATE_PROJECT_RESPONSE, project: data});
    } catch (e) {
        yield put({type: ACTION.PROJECTS_ERROR, error: e});
    }
}

export function* fetchUsersByName({name, projectId}) {
    try {
        const {data} = yield searchUsersByName(name);
        yield put({type: ACTION.PROJECTS_SEARCH_USERS_RESPONSE, searchUsers: data, projectId: projectId});
    } catch (e) {
        yield put({type: ACTION.PROJECTS_ERROR, error: e});
    }
}

export function* addUserToProject({userId, projectId}) {
    try {
        yield put({type: ACTION.PROJECTS_REQUEST});
        const {data} = yield addToProjectUser(userId, projectId);
        yield put({type: ACTION.PROJECT_ADD_USER_RESPONSE, addedUser: data, projectId: projectId});
    } catch (e) {
        yield put({type: ACTION.PROJECTS_ERROR, error: e});
    }
}