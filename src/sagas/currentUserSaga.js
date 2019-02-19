import {put} from "redux-saga/effects";
import ACTION from "../actions/actionType";
import {registration, login} from "../api/rest/restController";


export function* createAccount({createAccountData}) {
    yield put({type: ACTION.CURRENT_USER_REQUEST});
    try {
        const {data} = yield registration(createAccountData);
        yield put({type: ACTION.CURRENT_USER_SIGNUP_RESPONSE, success: data});
    } catch (e) {
        yield put({type: ACTION.CURRENT_USER_ERROR, error: e});
    }
}

export function* loginAccount({loginData}) {
    yield put({type: ACTION.CURRENT_USER_REQUEST});
    try {
        const {data} = yield login(loginData);
        yield put({type: ACTION.CURRENT_USER_SIGNIN_RESPONSE, currentUser: data});
    } catch (e) {
        yield put({type: ACTION.CURRENT_USER_ERROR, error: e});
    }
}

export function* logout() {
    yield put({type: ACTION.CURRENT_USER_LOGOUT})
}