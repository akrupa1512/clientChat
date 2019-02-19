import { apolloClient } from '../apolloConfig';
import { CREATE_USER, GET_AUTH_USER, LOGIN, UPLOAD_FILE } from "../schemes/user";

export const userQueries = {
  createUser( { email, password, firstName, lastName, sex = "man" } ) {
    return apolloClient.mutate({
      mutation: CREATE_USER,
      variables: {
        firstName,
        lastName,
        email,
        password,
        sex
      }
    });
  },
  login( { email, password } ) {
    return apolloClient.mutate({
      mutation: LOGIN,
      variables: {
        email,
        password
      }
    });
  },
  getAuthUser() {
    return apolloClient.query({
      query: GET_AUTH_USER
    });
  },
  uploadProfilePicture( file ) {
    return apolloClient.mutate({
      mutation: UPLOAD_FILE,
      variables: { file }
    });
  }
};
