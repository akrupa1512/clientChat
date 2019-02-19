import {put} from "redux-saga/effects";
import ACTION from "../actions/actionType";
import {getAllUsers, getUserById, deleteUserById, sendUserAvatar} from "../api/rest/restController";


export function* fetchAllUsers({page}) {
    yield put({type: ACTION.USERS_REQUEST});
    try {
        const {data} = yield getAllUsers(page);
        yield put({type: ACTION.USERS_RESPONSE, users: data.users, total: data.total, page: page});
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e});
    }
}

export function* fetchUserById({id}) {
    yield put({type: ACTION.USERS_REQUEST});
    try {
        const {data} = yield getUserById(id);
        yield put({type: ACTION.ONE_USER_RESPONSE, user: data});
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e});
    }
}

export function* deleteUser({user, history}) {
    yield put({type: ACTION.DELETE_USER_REQUEST, user});
    try {
        yield deleteUserById(user._id);
        history.push("/users");
    } catch (e) {
        yield put({type: ACTION.DELETE_USER_ERROR, error: e});
    }
}

export function* uploadUserAvatar({file, id}) {
    yield put({type: ACTION.USERS_REQUEST});
    try {
         const {data} = yield sendUserAvatar(file, id);
        yield put({type: ACTION.USERS_AVATAR_RESPONSE, photoPath: data, id: id});
    } catch (e) {
        yield put({type: ACTION.USERS_ERROR, error: e});
    }
}

