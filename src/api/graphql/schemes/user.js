import gql from 'graphql-tag';

/********************************************
 *    QUERIES, MUTATIONS FOR USER ENTITY    *
 * ******************************************/

//********************************** QUERIES **************************************
export const GET_AUTH_USER = gql`
  query {
    getAuthUser {
      id
      firstName
      lastName
      email
      profilePicture
    }
  }`;

//********************************** MUTATIONS ***********************************
export const CREATE_USER = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $sex: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, sex: $sex) {
      id
      firstName
      lastName
      email
      profilePicture
      tokens {
        accessToken
        refreshToken
      }
      sex
    }
  }`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      profilePicture
      tokens {
        accessToken
        refreshToken
      }
    }
  }`;

export const UPLOAD_FILE = gql`
  mutation uploadProfilePicture($file: Upload!) {
    uploadProfilePicture(file: $file) {
      id
      firstName
      lastName
      email
      profilePicture
    }
  }
`;
