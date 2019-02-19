import ACTION from '../actions/actionType'
import lodash from 'lodash'

const initialState = {
    projects: [],
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.PROJECTS_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            };
        }
        case ACTION.PROJECT_ADD_USER_RESPONSE: {
            const projects = [...state.projects];
            const projectIndex = projects.findIndex(p => p._id === action.projectId);
            projects[projectIndex].users.push(action.addedUser);
            return {
                ...state,
                isFetching: false,
                projects: projects
            };
        }
        case ACTION.PROJECTS_SEARCH_USERS_RESPONSE: {
            const projects = [...state.projects];
            const searchUsersResponse = action.searchUsers;
            let searchUsers;
            const project = projects.find(p => p._id === action.projectId);
            searchUsers = lodash.differenceWith(searchUsersResponse, project.users, (u1, u2) => {
                return u1._id === u2._id
            });
            return {
                ...state,
                searchUsers: searchUsers
            };
        }
        case ACTION.PROJECTS_RESPONSE: {
            return {
                ...state,
                projects: action.projects,
                isFetching: false,
                error: null
            };
        }
        case ACTION.ONE_PROJECT_RESPONSE: {
            const projects = [...state.projects];
            const index = projects.findIndex((p) => p._id === action.project._id);
            if (index === -1) {
                projects.push(action.project);
            } else {
                projects[index] = action.project;
            }
            return {
                ...state,
                projects,
                error: null,
                isFetching: false
            };
        }
        case ACTION.CREATE_PROJECT_RESPONSE: {
            const projects = [...state.projects];
            projects.unshift(action.project);
            return {
                ...state,
                projects,
                error: null,
                isFetching: false
            }
        }
        case ACTION.PROJECTS_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
}