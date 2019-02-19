import {baseUrl} from "./baseUrl";
import axios from "axios";

export const getAllUsers = (page) => axios.get(baseUrl + "users/" + page);
export const getUserById = (id) => axios.get(baseUrl + "user/" + id);
export const deleteUserById = (id) => axios.delete(baseUrl + "user/" + id);
export const sendUserAvatar = (file, id) => axios.post(baseUrl + "user/avatar/" + id, file);

export const registration = (createAccountData) =>
    axios.post(baseUrl + "user", createAccountData);
export const login = (loginData) => axios.post(baseUrl + 'login', loginData);

export const getAllProjects = () => axios.get(baseUrl + "projects");
export const getProjectById = (id) => axios.get(baseUrl + "project/" + id);
export const closeProjectById = (id) => axios.delete(baseUrl + "project/" + id);
export const createProject = (createProjectData) => axios.post(baseUrl + "project", createProjectData);
export const searchUsersByName = (name) => axios.get(baseUrl + "users", {params: {firstName: name}});
export const addToProjectUser = (userId, projectId) => axios.get(baseUrl + `project/${projectId}/${userId}`);